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
    
    sess = req.session
    var offset = req.query['offset'] == undefined || req.query['offset']<0 ? req.query['offset'] = 0 : req.query['offset'];
    var filter = !!req.query['filter'] ? req.query['filter'] : false;

    let isLogged;

    if (sess.userId == undefined || sess.userId == 0) {
        isLogged = false;
        sess.userId = 0
    }else{
        isLogged = true;
    }

    axios({
            method: "get",
            url: "https://server.mswareg.com/user/"+sess.userId
        }).then(async (data)=>{
            
            
            
            var posts = await axios({
                method: "get",
                url: `https://server.mswareg.com/home/${sess.userId}/${offset*8}/${filter}`
            })

            
            if (req.query.maxIdeasWriten != undefined) {
                res.render('index', {
                    id: sess.userId,
                    email: sess.email,
                    userData: data.data[0],
                    posts: posts.data.row,
                    offset: 0,
                    maxIdeasWriten: true,
                    isLogged
                });
            }else{
                res.render('index',{
                    id: sess.userId,
                    email: sess.email,
                    userData: data.data[0],
                    posts: posts.data.row,
                    offset: 0,
                    isLogged
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
        url: "https://server.mswareg.com/login",
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
        const result = await axios.post("https://server.mswareg.com/user",{
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

app.get('/trend', async (req,res)=>{
    const pubList = await axios.get('https://server.mswareg.com/listTrendPub');
    
    const sess = req.session;
    let isLogged;

    if (sess.userId == undefined || sess.userId == 0) {
        isLogged = false;
        sess.userId = 0
    }else{
        isLogged = true;
    }
    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {

        res.render('trend', {
            id: sess.userId,
            userData: data.data[0],
            pubList: pubList.data.result,
            isLogged
        })
    })
})

app.get('/writeIdea', async (req, res) => {
    sess = req.session
    

    if (sess.userId == undefined) {
        res.redirect('/login')
        return
    }

    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {

        if (!!req.query.editIdeaId) {
            try {
                const post = await axios.get('https://server.mswareg.com/findPub/' + req.query.editIdeaId);
                
                if (post.data.pubData.userId == sess.userId) {
                    try {
                        res.render('textEditor', {
                            userId: sess.userId,
                            post: post.data.pubData,
                            userData: data.data[0]
                        })
                    } catch (error) {
                        console.log(error)
                    }

                } else {
                    res.redirect('/home')
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                let count = await axios.get('https://server.mswareg.com/countPosts/' + sess.userId);
                if (count.data.result >= 4 && data.data[0].role == 0) {
                    res.redirect('/home?maxIdeasWriten')
                } else {
                    res.render('textEditor', {
                        userId: sess.userId,
                        userData: data.data[0]
                    })
                }
            } catch (error) {
                console.log(count)
            }
        }

    })


})

app.get('/sendMsg', async (req, res) => {
    sess = req.session

    let offset = req.query['offset'] == undefined || req.query['offset'] < 0 ? req.query['offset'] = 0 : req.query['offset'];

    let isLogged;

    if (sess.userId == undefined || sess.userId == 0 ) {
        isLogged = false;
        sess.userId = 0
    } else {
        isLogged = true;
    }
    let msgs = await axios.get(`https://server.mswareg.com/listMsgs/${offset*15}`);

    
    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {

        
        
    res.render('sendMsg', {
        id: sess.userId,
        msgs: msgs.data.row,
        userData: data.data[0],
        isLogged
    })})
    
})


app.get('/profile/:username', async (req,res)=>{
    sess = req.session
    var userProfile = req.params.username

    if (req.params.username == 'notLogged') {
        res.redirect('/login');
        return
    }

    let offset;
    if (req.query.offset == undefined || req.query.offset == NaN || req.query.offset == "NaN" || req.query.offset < 0) {
        offset = 0;
    }else{
        offset = req.query.offset
    }
    let isLogged;

    if (sess.userId == undefined || sess.userId == 0) {
        isLogged = false;
        sess.userId = 0
    } else {
        isLogged = true;
    }
    let followingData;
    let followerData;

    
    
    
    try {
        let userProfileData = await axios.get('https://server.mswareg.com/getByUsername/'+userProfile);
        
        if (userProfileData.data.result.status) {
            try {
                followingData = await axios.get('https://server.mswareg.com/getUsersRelations/0/' + userProfileData.data.result.usernameRow.usersTable[0].id + '/following');
                followerData = await axios.get('https://server.mswareg.com/getUsersRelations/0/' + userProfileData.data.result.usernameRow.usersTable[0].id + '/follower');
            } catch (error) {
                console.log(error)
            }
            
            axios({
                method: "get",
                url: "https://server.mswareg.com/user/" + sess.userId
            }).then(async (data) => {
                axios({
                    method: 'get',
                    url: "https://server.mswareg.com/getFollows/" + userProfileData.data.result.usernameRow.usersTable[0].id
                }).then(async(followData)=>{
                    
                    
                    const contentList = await axios.get(`https://server.mswareg.com/profilePageContentList/${userProfileData.data.result.usernameRow.usersTable[0].id}/`+offset)
                    
                    res.render('profilePage.ejs', {
                        id: sess.userId,
                        userData: data.data[0],
                        followData: followData.data,
                        userProfile: { users: userProfileData.data.result.usernameRow.usersTable[0], userInfo: userProfileData.data.result.usernameRow.userinfo[0][0] },
                        contentList: contentList.data.result,
                        following: followerData.data,
                        followers: followingData.data,
                        isLogged
                    })

                })
                
            }).catch(err => {
                console.log(err)
            })
            
        }else{
            res.redirect('/home')
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
        return
    }

    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {
        

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
        return
    }

    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {
        

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
        return
    }

    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {
        

        res.render('cropImg', {
            userId: sess.userId,
            currentPage: 'idea',
            pubIdeaId
        })
    })

})

app.get('/seusFeedbacks',(req, res)=>{
    sess = req.session

    

    let isLogged;

    if (sess.userId == undefined || sess.userId == 0) {
        isLogged = false;
        sess.userId = 0
        res.redirect('/home')
    } else {
        isLogged = true;
    }

    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {

        

        const feedbackList = await axios.get('https://server.mswareg.com/listFeedbacks/'+sess.userId+'/0')
        
        

        if (data.data[0].role != 1) {
            res.render('feedbacksReports', {
                userData: data.data[0],
                mod: false,
                feedbackList: feedbackList.data.result,
                isLogged
            })
        }else{
            const reportsList = await axios.get('https://server.mswareg.com/listReports/0', {
                headers: {
                    'authorization': `Bearer ${req.cookies.authToken}`
                }
            });
            const withdrawalList = await axios.get('https://server.mswareg.com/listWithdrawalRequests/0',{
                headers: {
                    'authorization': `Bearer ${req.cookies.authToken}`
                }
            })
            
            res.render('feedbacksReports', {
                userData: data.data[0],
                feedbackList: feedbackList.data.result,
                mod: true,
                reportsList: reportsList.data.result,
                withdrawalList: withdrawalList.data,
                isLogged
            })
        }
    })

    
})

app.get('/getIdeaById/:ideaId', async (req,res)=>{
    const ideaId = req.params.ideaId
    try {
        let idea = await axios.get(`https://server.mswareg.com/findPub/${ideaId}`);
        
    
        res.render('idea', {
            post: idea.data.pubData
        })
    } catch (error) {
        console.log(error)
    }

})


app.get('/search', async (req, res) => {
    sess = req.session
    let isLogged;

    if (sess.userId == undefined || sess.userId == 0) {
        isLogged = false;
        sess.userId = 0
    } else {
        isLogged = true;
    }
    

    let offset = req.query.offset;
    if (offset == undefined || offset == NaN || offset == "NaN" || offset == null || offset < 0) {
        offset = 0;
    }else{
        offset = req.query.offset;
    }
    
    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {
        
        if(Object.keys(req.query).length < 1){
            res.render('generalSearch', {
                id: sess.userId,
                userData: data.data[0],
                offsetBtn: false,
                isLogged
            })
        }else{
    
            if(Object.keys(req.query)[0] == 'userQuery'){
                
                let response = await axios.get('https://server.mswareg.com/getSearchListUser/0/'+req.query.userQuery)
                


                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    usersList: response.data.results,
                    queryType: Object.keys(req.query)[0],
                    query: req.query.userQuery,
                    offsetBtn: false,
                    isLogged
                })

            }else if (Object.keys(req.query)[0] == 'msgQuery'){
                let response = await axios.get('https://server.mswareg.com/searchForMsg/0/' + req.query.msgQuery)

                //
                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    msgList: response.data.result,
                    queryType: Object.keys(req.query)[0],
                    query: req.query.msgQuery,
                    offsetBtn: false,
                    isLogged
                })
    
            } else if (Object.keys(req.query)[0] == 'msgByUsernameQuery'){
                try {
                    let response = await axios.get('https://server.mswareg.com/searchMsgList/' + (offset*15) + '/' + req.query.msgByUsernameQuery)

                    if (response.data.result.row != undefined) {
                        if (req.query.maxData != undefined) {
                            res.render('generalSearch', {
                                    id: sess.userId,
                                    userData: data.data[0],
                                    msgList: response.data.result.row,
                                    queryType: Object.keys(req.query)[0],
                                    query: req.query.msgByUsernameQuery,
                                    offsetBtn: true,
                                    maxData: true,
                                    isLogged
                                })
                        }else{
                            res.render('generalSearch', {
                                id: sess.userId,
                                userData: data.data[0],
                                msgList: response.data.result.row,
                                queryType: Object.keys(req.query)[0],
                                query: req.query.msgByUsernameQuery,
                                offsetBtn: true,
                                isLogged
                            })
                        }
                        }else{
                        res.redirect(`/search?msgByUsernameQuery=${req.query.msgByUsernameQuery}&offset=${offset-1}&maxData=true`)
                        }
                } catch (error) {
                    console.log(error)
                }
                    
                
            } else if (Object.keys(req.query)[0] == 'ideaQuery') {
                
                
                try {
                    
                    let response = await axios.get('https://server.mswareg.com/searchPost/'+(offset*8)+'/'+req.query.ideaQuery)
                    
                    if (!!response.data.result) {
                        if (req.query.maxData != undefined) {
                            
                            res.render('generalSearch', {
                                id: sess.userId,
                                userData: data.data[0],
                                postList: response.data.result,
                                queryType: Object.keys(req.query)[0],
                                query: req.query.ideaQuery,
                                offsetBtn: true,
                                maxData: true,
                                isLogged
                            })
                        }else{
                            res.render('generalSearch', {
                                id: sess.userId,
                                userData: data.data[0],
                                postList: response.data.result,
                                queryType: Object.keys(req.query)[0],
                                query: req.query.ideaQuery,
                                offsetBtn: true,
                                isLogged
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
                    offsetBtn: false,
                    isLogged
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
        return
    }
    axios({
        method: "get",
        url: "https://server.mswareg.com/user/" + sess.userId
    }).then(async (data) => {

    res.render('wallet',{
        userData: data.data[0]
    })
    })
})

app.get('/aboutUs', async (req,res)=>{
    const donate = await axios.get('https://pix.mswareg.com/donate');
    res.render('aboutUs', {
        qrCode: donate.data.imagem,
        qrCodeTxt: donate.data.qrCodeTxt
    })
})


app.listen(8080,(err)=>{
    err ? console.log(err) : 'ok';
} )