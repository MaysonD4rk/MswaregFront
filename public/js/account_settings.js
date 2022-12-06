
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


async function changePass(email, token) {
    var oldPass = document.getElementsByName('oldPass')[0].value
    var newPass = document.getElementsByName('newPass')[0].value
    var confirmNewPass = document.getElementsByName('confirmNewPass')[0].value

    if (newPass == confirmNewPass) {

        const cookies = document.cookie.split('=');
        const authToken = cookies[1];
        console.log(authToken)

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
                            'authorization': `Bearer ${authToken}`
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

    } else {
        console.log('as senhas não são iguais')
    }





}


async function updateInfo() {
    let FirstName = document.getElementById('nameInput').value
    let LastName = document.getElementById('lastNameInput').value
    const userId = document.getElementById('userId').value
    console.log(userId)
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    try {
        let updateInfo = await axios.put('https://server.mswareg.com/updateInfo', {
            FirstName,
            LastName,
            userId
        }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })
        console.log(updateInfo)
    } catch (error) {
        console.log(error)
    }

}


async function updateNotification() {
    const userId = document.getElementById('userId').value
    let notification1 = document.getElementById('notification1').checked;
    let notification2 = document.getElementById('notification2').checked;
    let notification3 = document.getElementById('notification3').checked;
    let notification4 = document.getElementById('notification4').checked;
    let notification5 = document.getElementById('notification5').checked;
    let notification6 = document.getElementById('notification6').checked;
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
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
                'authorization': `Bearer ${authToken}`
            }
        })

        console.log(updateNotification)
    } catch (error) {
        console.log(error)
    }


}


document.getElementById('changeUsername').onclick = async ()=>{
    const username = document.getElementById('usernameInput').value
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    try {
        const changeUsername = await axios.put('https://server.mswareg.com/changeUsername',{
            userId:userId.value,
            username
        }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        });

        if(changeUsername.status == 200){
            alert('Username alterado com sucesso :)')
        }
    } catch (error) {
        console.log(error)
    }
}