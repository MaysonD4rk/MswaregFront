function confirmPassChange(token, email) {

    var pass = document.getElementById('newPassword').value;
    var confirmPass = document.getElementById('confirmPassword').value;

    if (pass == confirmPass) {

        axios.post('https://server.mswareg.com/changePass', {
            token: token,
            email: email,
            password: pass
        }).then(res => {
            window.location.href = 'https://mswareg.mswareg.com/login'
        }).catch(err => {
            console.log(err)
        })

    } else {
        alert('as senhas não são compatíveis')
    }

    console.log(token)
}

function sendEmail() {
    var email = document.getElementsByName('email')[0].value;

    console.log(email)
    axios.post('https://server.mswareg.com/passrecovery', {
        email
    }).then(res => {
        console.log(res);
    })
}