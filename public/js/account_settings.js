(async function verifyNotifications(){
    try {
        const notifications = await axios.get("https://server.mswareg.com/verifyActiveNotifications/"+document.getElementById('userId').value);
        
        console.log(notifications.data.notificationsList[0])
        if (!!notifications.data.notificationsList[0].IN1_notification) {
            document.getElementById('notification1').checked = true

        } else {
            document.getElementById('notification1').checked = false
        }
        if (!!notifications.data.notificationsList[0].IN2_notification) {
            document.getElementById('notification2').checked = true

        } else {
            document.getElementById('notification2').checked = false
        }
        if (!!notifications.data.notificationsList[0].IN3_notification) {
            document.getElementById('notification3').checked = true

        } else {
            document.getElementById('notification3').checked = false
        }
        if (!!notifications.data.notificationsList[0].FN1_notification) {
            document.getElementById('notification4').checked = true
        }else{
            document.getElementById('notification4').checked = false
        }
        if (!!notifications.data.notificationsList[0].FN2_notification) {
            document.getElementById('notification5').checked = true
        }else{
            document.getElementById('notification5').checked = false
        }
        if (!!notifications.data.notificationsList[0].FN3_notification) {
            document.getElementById('notification6').checked = true

        } else {
            document.getElementById('notification6').checked = false
        }
        
    } catch (error) {
        console.log(error)
    }
})()

const email = document.getElementById('realEmailInput').value


async function changePass(email, token) {
    var oldPass = document.getElementsByName('oldPass')[0].value
    var newPass = document.getElementsByName('newPass')[0].value
    var confirmNewPass = document.getElementsByName('confirmNewPass')[0].value

    if (newPass == confirmNewPass) {

        document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
                    try {
                        var verifyOldPass = await axios.post('https://server.mswareg.com/login', {
                            email: email,
                            password: oldPass
                        })
            
                        if (verifyOldPass.status == 200) {
                            console.log(verifyOldPass)
                            try {
                                var updatePass = await axios.put('https://server.mswareg.com/updatePass', {
                                    email: email,
                                    password: newPass
                                }, {
                                    headers: {
                                        'authorization': `Bearer ${authToken[1]}`
                                    }
                                })
            
                                if (updatePass.status == 200) {
                                    alert(updatePass.data.msg)
                                    location.href = '/login'
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            console.log('senha incorreta Amigão filha da puta')
                        }
            
                    } catch (error) {
                        console.log('senha incorreta Amigão filha da puta')
                    }

                }
            })


    } else {
        console.log('as senhas não são iguais')
    }





}


async function getTokenUpdateInfo(){
    let LastName = document.getElementById('lastNameInput').value
    const userId = document.getElementById('userId').value
    const pixKey = document.getElementById('pixKey').value
    console.log(userId)
    document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
    try {
        let updateInfoCode = await axios.post('https://server.mswareg.com/updateInfoToken', {
            email,
            userId
        }, {
            headers: {
                'authorization': `Bearer ${authToken[1]}`
            }
        })
        console.log(updateInfo)
    } catch (error) {
        console.log(error)
    }
        }})
    document.getElementById('codeModal').style.display = 'flex';
}

async function updateInfo() {
    let FirstName = document.getElementById('nameInput').value
    let LastName = document.getElementById('lastNameInput').value
    const userId = document.getElementById('userId').value
    const pixKey = document.getElementById('pixKey').value
    const token = document.getElementById('tokenCode').value
    console.log(userId)
    document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
    try {
        let updateInfo = await axios.put('https://server.mswareg.com/updateInfo', {
            FirstName,
            LastName,
            pixKey,
            userId,
            token
        }, {
            headers: {
                'authorization': `Bearer ${authToken[1]}`
            }
        })
        console.log(updateInfo)
        if (updateInfo.status == 200) {
            alert(updateInfo.data.msg)
            document.getElementById('codeModal').style.display = 'none';

        }
    } catch (error) {
        console.log(error)
    }
        }})

}


async function updateNotification() {
    const userId = document.getElementById('userId').value
    let notification1 = document.getElementById('notification1').checked;
    let notification2 = document.getElementById('notification2').checked;
    let notification3 = document.getElementById('notification3').checked;
    let notification4 = document.getElementById('notification4').checked;
    let notification5 = document.getElementById('notification5').checked;
    let notification6 = document.getElementById('notification6').checked;

    document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                console.log(authToken)
                if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
            try {
                const updateNotification = await axios.put('https://server.mswareg.com/updateNotifications', {
                    notification1,
                    notification2,
                    notification3,
                    notification4,
                    notification5,
                    notification6,
                    userId
                }, {
                    headers: {
                        'authorization': `Bearer ${authToken[1]}`
                    }
                })

                console.log(updateNotification)
            } catch (error) {
                console.log(error)
            }
        }})


}


document.getElementById('changeUsername').onclick = async ()=>{
    const username = document.getElementById('usernameInput').value
    document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
    try {
        const changeUsername = await axios.put('https://server.mswareg.com/changeUsername',{
            userId:userId.value,
            username
        }, {
            headers: {
                'authorization': `Bearer ${authToken[1]}`
            }
        });

        if(changeUsername.status == 200){
            alert('Username alterado com sucesso :)')
        }
    } catch (error) {
        console.log(error)
    }
    }})
}


document.getElementById('pixKey').addEventListener('keypress', (event)=>{
    console.log(event)
    if(event.code == 'Space'){
        event.preventDefault()
        return
    }
})


async function updateCurrentCode(){
    document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
            try {
                const updateCode = await axios.put('https://server.mswareg.com/updatePersonalCode', {
                    userId: document.getElementById('userId').value,
                    code: document.getElementById('currentCode').value
                }, {
                    headers: {
                        "authorization": `Bearer ${authToken[1]}`
                    }
                })
                console.log(updateCode);
            } catch (error) {
                console.log(error);
            }
        }
    })
    
}