document.getElementById('registerBtn').addEventListener('click', (event) => {
    if (document.getElementById('password').value.length < 10) {
        event.preventDefault()
        alert('senha precisa de no mínimo 10 carácteres.')
    } else if (document.getElementById('email').value.length < 3) {
        event.preventDefault()
        alert('isso não é um email válido.')
    } else if (document.getElementById('username').value.length < 1) {
        event.preventDefault()
        alert('esse nome de usuário não é válido');
    }
})