const express = require('express');
const app = express();
const session = require('express-session');
const axios = require('axios');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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
    sess = req.session
    var offset = req.query['offset'] == undefined || req.query['offset']<0 ? req.query['offset'] = 0 : req.query['offset'];
    var filter = !!req.query['filter'] ? req.query['filter'] : false;

    console.log(offset)


    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    axios({
            method: "get",
            url: "http://54.233.190.172:8000/user/"+sess.userId
        }).then(async (data)=>{
            
            
            var posts = await axios({
                method: "get",
                url: `http://54.233.190.172:8000/home/${sess.userId}/${offset*8}/${filter}`
            })

            console.log(posts.data)

            res.render('index',{
                id: sess.userId,
                email: sess.email,
                userData: data.data[0],
                posts: posts.data.row,
                offset: 0
            });

        }).catch(err=>{
            console.log(err);
        })

})
app.get('/login', (req, res) => {
    


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
        url: "http://54.233.190.172:8000/login",
        data: {
            email,
            password,
        }
    }).then(result => {
        if (result.status == 200) {
            sess.email = email;
            sess.userId = result.data.id
            res.redirect('/home');
        }
    }).catch(err=>{
        res.redirect('/login?error=true');
    })
})

app.get('/register', (req, res)=>{
    res.render('register');
})
app.post('/register', (req, res)=>{

    var sess = req.session;

    var {username, email, password} = req.body;

    axios({
        method: "post",
        url: "http://54.233.190.172:8000/user",
        data: {
            username,
            email,
            password
        }
    }).then(result => {
        console.log(result)
        if (result.status == 200) {
            sess.email = email;
            sess.userId = result.data.result.id
            res.redirect('/home');
        }
    }).catch(err => {
        console.log(err);
    })
})

app.get('/writeIdea', (req,res)=>{
    sess = req.session
    if (sess.userId == undefined) {
        res.redirect('/login')
    }
    res.render('textEditor',{
        userId: sess.userId
    })

})

app.get('/sendMsg', async (req, res) => {
    sess = req.session

    var offset = req.query['offset'] == undefined || req.query['offset'] < 0 ? req.query['offset'] = 0 : req.query['offset'];

    if (sess.userId == undefined) {
        res.redirect('/login')
    }
    var msgs = await axios.get(`http://54.233.190.172:8000/listMsgs/${offset*15}`);

    console.log(msgs.data.row)
    axios({
        method: "get",
        url: "http://54.233.190.172:8000/user/" + sess.userId
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

    if (sess.userId == undefined) {
        res.redirect('/login')
    }

    try {
        let userProfileData = await axios.get('http://54.233.190.172:8000/getByUsername/'+userProfile);
        console.log(userProfileData)
        
        if (userProfileData.data.result.status) {
            
            axios({
                method: "get",
                url: "http://54.233.190.172:8000/user/" + sess.userId
            }).then(async (data) => {
                axios({
                    method: 'get',
                    url: "http://54.233.190.172:8000/getFollows/" + userProfileData.data.result.usernameRow.usersTable[0].id
                }).then(async(followData)=>{
                    console.log(followData.data.followers)
                    res.render('profilePage.ejs', {
                        id: sess.userId,
                        userData: data.data[0],
                        followData: followData.data,
                        userProfile: { users: userProfileData.data.result.usernameRow.usersTable[0], userInfo: userProfileData.data.result.usernameRow.userInfo[0][0] }
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
        url: "http://54.233.190.172:8000/user/" + sess.userId
    }).then(async (data) => {
        console.log(data.data[0]);

        res.render('account_settings', {
            userData: data.data[0], 
            email: data.data[0].email
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
        url: "http://54.233.190.172:8000/user/" + sess.userId
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
        url: "http://54.233.190.172:8000/user/" + sess.userId
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
        url: "http://54.233.190.172:8000/user/" + sess.userId
    }).then(async (data) => {
        console.log(data);

        const feedbackList = await axios.get('http://54.233.190.172:8000/listFeedbacks/'+sess.userId+'/0')
        
        console.log(data.data[0].role)

        if (data.data[0].role != 1) {
            res.render('feedbacksReports', {
                userData: data.data[0],
                mod: false,
                feedbackList: feedbackList.data.result
            })
        }else{
            const reportsList = await axios.get('http://54.233.190.172:8000/listReports/0');
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
        let idea = await axios.get(`http://54.233.190.172:8000/findPub/${ideaId}`);
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


    axios({
        method: "get",
        url: "http://54.233.190.172:8000/user/" + sess.userId
    }).then(async (data) => {
        
        if(Object.keys(req.query).length < 1){
            res.render('generalSearch', {
                id: sess.userId,
                userData: data.data[0]
            })
        }else{
    
            if(Object.keys(req.query)[0] == 'userQuery'){
                console.log(req.query.userQuery)
                let response = await axios.get('http://54.233.190.172:8000/getSearchListUser/'+req.query.userQuery)
                console.log(response.data.results)

                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    usersList: response.data.results
                })

            }else if (Object.keys(req.query)[0] == 'msgQuery'){
                let response = await axios.get('http://54.233.190.172:8000/searchForMsg/0/' + req.query.msgQuery)
                console.log(response.data.result)
                //
                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    msgList: response.data.result
                })
    
            } else if (Object.keys(req.query)[0] == 'ideaQuery') {
                console.log(req.query.ideaQuery)
                
                let response = await axios.get('http://54.233.190.172:8000/searchPost/0/'+req.query.ideaQuery)
                console.log(response.data.result)

                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0],
                    postList: response.data.result
                })
            }else{
                res.render('generalSearch', {
                    id: sess.userId,
                    userData: data.data[0]
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
        url: "http://54.233.190.172:8000/user/" + sess.userId
    }).then(async (data) => {

    res.render('wallet',{
        userData: data.data[0]
    })
    })
})


app.listen(8080,(err)=>{
    err ? console.log(err) : console.log('sv rodando');
} )