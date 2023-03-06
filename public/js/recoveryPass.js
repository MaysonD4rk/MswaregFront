function confirmPassChange(token, email) {

    var pass = document.getElementById('newPassword').value;
    var confirmPass = document.getElementById('confirmPassword').value;

    if (pass == confirmPass) {

        axios.post('https://server.mswareg.com/changePass', {
            token: token,
            email: email,
            password: pass
        }).then(res => {
            window.location.href = 'https://mswareg.com/login'
        }).catch(err => {
            console.log(err)
        })

    } else {
        alert('as senhas não são compatíveis')
    }

    
}

function sendEmail() {
    var email = document.getElementsByName('email')[0].value;

    axios.post('https://server.mswareg.com/passrecovery', {
        email
    }).then(res => {
        return
    })
}