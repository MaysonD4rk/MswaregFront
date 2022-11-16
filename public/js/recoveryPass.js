function confirmPassChange(token, email) {

    var pass = document.getElementById('newPassword').value;
    var confirmPass = document.getElementById('confirmPassword').value;

    if (pass == confirmPass) {

        axios.post('http://localhost:3000/changePass', {
            token: token,
            email: email,
            password: pass
        }).then(res => {
            window.location.href = 'http://localhost:8080/login'
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
    axios.post('http://localhost:3000/passrecovery', {
        email
    }).then(res => {
        console.log(res);
    })
}