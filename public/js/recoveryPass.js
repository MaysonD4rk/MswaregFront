function confirmPassChange(token, email) {

    var pass = document.getElementById('newPassword').value;
    var confirmPass = document.getElementById('confirmPassword').value;

    if (pass == confirmPass) {

        axios.post('http://localhost:8000/changePass', {
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

    
}

function sendEmail() {
    var email = document.getElementsByName('email')[0].value;

    axios.post('http://localhost:8000/passrecovery', {
        email
    }).then(res => {
        return
    })
}