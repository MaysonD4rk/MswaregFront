async function changePass(email) {
    var oldPass = document.getElementsByName('oldPass')[0].value
    var newPass = document.getElementsByName('newPass')[0].value
    var confirmNewPass = document.getElementsByName('confirmNewPass')[0].value

    if (newPass == confirmNewPass) {

        try {
            var verifyOldPass = await axios.post('http://54.233.190.172:8000/login', {
                email: email,
                password: oldPass
            })

            if (verifyOldPass.status == 200) {
                console.log(verifyOldPass)
                try {
                    var updatePass = await axios.put('http://54.233.190.172:8000/updatePass', {
                        email: email,
                        password: newPass
                    })

                    if (updatePass.status == 200) {
                        alert(updatePass.data.msg)
                        location.reload()
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
    try {
        let updateInfo = await axios.put('http://54.233.190.172:8000/updateInfo', {
            FirstName,
            LastName,
            userId
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

    try {
        const updateNotification = await axios.put('http://54.233.190.172:8000/updateNotifications', {
            notification1,
            notification2,
            notification3,
            notification4,
            notification5,
            notification6,
            userId
        })

        console.log(updateNotification)
    } catch (error) {
        console.log(error)
    }


}