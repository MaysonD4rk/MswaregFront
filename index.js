const express = require('express');
const app = express();
const session = require('express-session');
const axios = require('axios');
const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: 'shhhhh',
    resave: true,
    saveUninitialized: true
}));

var sess;


app.get('/',(req,res)=>{
    res.redirect('/home');
})


app.get('/home', async (req, res)=>{
    console.log('entrou em home')
    console.log(req.cookies)
    sess = req.session
    var offset = req.query['offset'] == undefined || req.query['offset']<0 ? req.query['offset'] = 0 : req.query['offset'];
    var filter = !!req.query['filter'] ? req.query['filter'] : false;

    console.log(offset)


    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    axios({
            method: "get",
            url: "http://localhost:8000/user/"+sess.userId
        }).then(async (data)=>{
            
            
            var posts = await axios({
                method: "get",
                url: `http://localhost:8000/home/${sess.userId}/${offset*8}/${filter}`
            })

            console.log(posts.data)
            if (req.query.maxIdeasWriten != undefined) {
                res.render('index', {
                    id: sess.userId,
                    email: sess.email,
                    userData: data.data[0],
                    posts: posts.data.row,
                    offset: 0,
                    maxIdeasWriten: true
                });
            }else{
                res.render('index',{
                    id: sess.userId,
                    email: sess.email,
                    userData: data.data[0],
                    posts: posts.data.row,
                    offset: 0
                });
            }

        }).catch(err=>{
            console.log(err);
        })

})
app.get('/login', (req, res) => {
    
    res.clearCookie('authToken');
    req.session.destroy();
    

    if (req.query['error'] === 'true') {
        res.render('login',{
            loginError: true,
            loginErrorMsg: "Erro nas informações passadas no login"
        });
    }else{
        res.render('login')
    }

})
app.post('/login', (req, res)=>{

    var {email, password} = req.body;
    sess = req.session;

    axios({
        method: "post",
        url: "http://localhost:8000/login",
        data: {
            email,
            password,
        }
    }).then(result => {
        
        if (result.status == 200) {
            sess.email = email;
            res.cookie('authToken', result.data.token);
            sess.userId = result.data.id
            res.redirect('/home');
        }
    }).catch(err=>{
        console.log(err)
        res.redirect('/login?error=true');
    })
})

app.get('/register', (req, res)=>{

    if (req.query.error) {
        res.render('register',{
            error: true
        });
    } else if (req.query.dbError){
        res.render('register', {
            dbError: true
        });
    }
    else{
        res.render('register');
    }

})
app.post('/register', async (req, res)=>{

    var sess = req.session;

    var {username, email, password} = req.body;

    try {
        const result = await axios.post("http://localhost:8000/user",{
            username,
            email,
            password
        })
        
        if (result.status == 200) {
            sess.email = email;
            sess.userId = result.data.result.id
            res.cookie('authToken', result.data.token)
            res.redirect('/home');
        }else{
            res.redirect('/register?error=true');
        }
        
    } catch (error) {
        console.log(error)
        res.redirect('/register?error=true');
    }
})

app.get('/writeIdea', async (req,res)=>{
    sess = req.session
    if (sess.userId == undefined) {
        res.redirect('/login')
    }
    
    try {
        let count = await axios.get('http://localhost:8000/countPosts/'+sess.userId);
        if(count.data.result >= 4){
            res.redirect('/home?maxIdeasWriten')
        }else{
            res.render('textEditor',{
                userId: sess.userId
            })
        }
    } catch (error) {
        console.log(count)
    }

})

app.get('/sendMsg', async (req, res) => {
    sess = req.session

    let offset = req.query['offset'] == undefined || req.query['offset'] < 0 ? req.query['offset'] = 0 : req.query['offset'];

    if (sess.userId == undefined) {
        res.redirect('/login')
    }
    let msgs = await axios.get(`http://localhost:8000/listMsgs/${offset*15}`);

    console.log(msgs.data.row)
    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {

        console.log(data.data[0])
        
    res.render('sendMsg', {
        id: sess.userId,
        msgs: msgs.data.row,
        userData: data.data[0]
    })})
    
})


app.get('/profile/:username', async (req,res)=>{
    sess = req.session
    var userProfile = req.params.username
    let offset;
    if (req.query.offset == undefined || req.query.offset == NaN || req.query.offset == "NaN" || req.query.offset < 0) {
        offset = 0;
    }else{
        offset = req.query.offset
    }
    console.log("offset: "+offset)
    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    try {
        let userProfileData = await axios.get('http://localhost:8000/getByUsername/'+userProfile);
        console.log(userProfileData.data.result.usernameRow)
        
        if (userProfileData.data.result.status) {
            
            axios({
                method: "get",
                url: "http://localhost:8000/user/" + sess.userId
            }).then(async (data) => {
                axios({
                    method: 'get',
                    url: "http://localhost:8000/getFollows/" + userProfileData.data.result.usernameRow.usersTable[0].id
                }).then(async(followData)=>{
                    
                    const contentList = await axios.get(`http://localhost:8000/profilePageContentList/${sess.userId}/`+offset)
                    console.log(contentList.data.result)
                    res.render('profilePage.ejs', {
                        id: sess.userId,
                        userData: data.data[0],
                        followData: followData.data,
                        userProfile: { users: userProfileData.data.result.usernameRow.usersTable[0], userInfo: userProfileData.data.result.usernameRow.userinfo[0][0] },
                        contentList: contentList.data.result
                    })

                })
                
            }).catch(err => {
                console.log(err)
            })
            
        }else{
            console.log('n tem nada amigão')
        }
        
    } catch (error) {
        console.log(error)
        res.redirect('/home')
    }



    
})

app.get('/accountSettings', (req, res) => {
    sess = req.session
    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {
        console.log(data.data[0]);

        res.render('account_settings', {
            userData: data.data[0], 
            email: data.data[0].email,
            AuthToken: sess.token
        })
    })


})

app.get('/forgotPass', (req, res)=>{
    res.render('forgotPass.ejs')
})

app.get('/recovery', (req, res)=>{
    var token = req.query['token']
    var email = req.query['email'];
    res.render('recoveryPass.ejs', {token, email});
})


app.get('/changePhoto', (req, res)=>{
    sess = req.session
    const username = !!req.query['usname'] ? req.query['usname'] : undefined

    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {
        console.log(data);

        res.render('cropImg',{
            userId: sess.userId,
            currentPage: 'profile',
            username
        })
    })

})


app.get('/addPubImg/:pubIdea', (req, res) => {
    sess = req.session
    const pubIdeaId = req.params.pubIdea
    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {
        console.log(data);

        res.render('cropImg', {
            userId: sess.userId,
            currentPage: 'idea',
            pubIdeaId
        })
    })

})

app.get('/seusFeedbacks',(req, res)=>{
    sess = req.session
    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {
        console.log(data);

        const feedbackList = await axios.get('http://localhost:8000/listFeedbacks/'+sess.userId+'/0')
        
        console.log(data.data[0].role)

        if (data.data[0].role != 1) {
            res.render('feedbacksReports', {
                userData: data.data[0],
                mod: false,
                feedbackList: feedbackList.data.result
            })
        }else{
            const reportsList = await axios.get('http://localhost:8000/listReports/0');
            console.log(reportsList.data.result)
            res.render('feedbacksReports', {
                userData: data.data[0],
                feedbackList: feedbackList.data.result,
                mod: true,
                reportsList: reportsList.data.result
            })
        }
    })

    
})

app.get('/getIdeaById/:ideaId', async (req,res)=>{
    const ideaId = req.params.ideaId
    try {
        let idea = await axios.get(`http://localhost:8000/findPub/${ideaId}`);
        console.log(idea.data.pubData)
    
        res.render('idea', {
            post: idea.data.pubData
        })
    } catch (error) {
        console.log(error)
    }

})


app.get('/search', async (req, res) => {
    sess = req.session
    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    let offset = req.query.offset;
    if (offset == undefined || offset == NaN || offset == "NaN" || offset == null || offset < 0) {
        offset = 0;
    }else{
        offset = req.query.offset;
    }
    console.log(offset)
    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {
        
        if(Object.keys(req.query).length < 1){
            res.render('generalSearch', {
                id: sess.userId,
                userData: data.data[0],
                offsetBtn: false
            })
        }else{
    
            if(Object.keys(req.query)[0] == 'userQuery'){
                console.log(req.query.userQuery)
                let response = await axios.get('http://localhost:8000/getSearchListUser/0/'+req.query.userQuery)
                console.log(Object.keys(req.query)[0])

                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    usersList: response.data.results,
                    queryType: Object.keys(req.query)[0],
                    query: req.query.userQuery,
                    offsetBtn: false
                })

            }else if (Object.keys(req.query)[0] == 'msgQuery'){
                let response = await axios.get('http://localhost:8000/searchForMsg/0/' + req.query.msgQuery)
                console.log(response.data.result)
                //
                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    msgList: response.data.result,
                    queryType: Object.keys(req.query)[0],
                    query: req.query.msgQuery,
                    offsetBtn: false
                })
    
            } else if (Object.keys(req.query)[0] == 'msgByUsernameQuery'){
                try {
                    let response = await axios.get('http://localhost:8000/searchMsgList/' + (offset*15) + '/' + req.query.msgByUsernameQuery)
                    if (response.data.result.row != undefined) {
                        if (req.query.maxData != undefined) {
                            res.render('generalSearch', {
                                    id: sess.userId,
                                    userData: data.data[0],
                                    msgList: response.data.result.row,
                                    queryType: Object.keys(req.query)[0],
                                    query: req.query.msgByUsernameQuery,
                                    offsetBtn: true,
                                    maxData: true
                                })
                        }else{
                            res.render('generalSearch', {
                                id: sess.userId,
                                userData: data.data[0],
                                msgList: response.data.result.row,
                                queryType: Object.keys(req.query)[0],
                                query: req.query.msgByUsernameQuery,
                                offsetBtn: true
                            })
                        }
                        }else{
                        res.redirect(`/search?msgByUsernameQuery=${req.query.msgByUsernameQuery}&offset=${offset-1}&maxData=true`)
                        }
                } catch (error) {
                    console.log(error)
                }
                    
                
            } else if (Object.keys(req.query)[0] == 'ideaQuery') {
                console.log(req.query.ideaQuery)
                
                try {
                    
                    let response = await axios.get('http://localhost:8000/searchPost/'+(offset*8)+'/'+req.query.ideaQuery)
                    
                    if (!!response.data.result) {
                        if (req.query.maxData != undefined) {
                            
                            res.render('generalSearch', {
                                id: sess.userId,
                                userData: data.data[0],
                                postList: response.data.result,
                                queryType: Object.keys(req.query)[0],
                                query: req.query.ideaQuery,
                                offsetBtn: true,
                                maxData: true
                            })
                        }else{
                            res.render('generalSearch', {
                                id: sess.userId,
                                userData: data.data[0],
                                postList: response.data.result,
                                queryType: Object.keys(req.query)[0],
                                query: req.query.ideaQuery,
                                offsetBtn: true
                            })

                        }
                    }else{
                        res.redirect(`/search?ideaQuery=${req.query.ideaQuery}&offset=${offset - 1}&maxData`)
                    }
                        
                    
                } catch (error) {
                    console.log(error)
                }
            }else{
                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    offsetBtn: false
                })
            }
        }

    }).catch(err => {
        res.send(err)
    })
})

app.get('/wallet', (req,res)=>{
    sess = req.session;
    if (sess.userId == undefined) {
        res.redirect('/login')
    }
    axios({
        method: "get",
        url: "http://localhost:8000/user/" + sess.userId
    }).then(async (data) => {

    res.render('wallet',{
        userData: data.data[0]
    })
    })
})


app.listen(8080,(err)=>{
    err ? console.log(err) : console.log('sv rodando');
} )