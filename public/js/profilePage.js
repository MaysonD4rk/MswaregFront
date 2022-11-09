var currentState = 0;
let usernameInput = document.getElementById('username').value
const currentUsername = usernameInput
const userId = document.getElementById('userId').value
const currentUser = document.getElementById('currentUser').value
async function editAboutMe(id){

    var editAboutMe = await axios.put('http://54.233.190.172:8000/updateUserInfo', {
        id: parseInt(id),
        aboutMe: document.getElementById('aboutMeTextArea').value
    })


    if (editAboutMe.status == 200) {
        statusModal('success', editAboutMe.data.msg)
        document.getElementsByClassName('aboutMeMsg')[0].innerHTML = '"' + document.getElementById('aboutMeTextArea').value+'"';
    }else{
        statusModal('failed', editAboutMe.data.msg)
    }
    openEditModal()

}



function openEditModal(){
    
    if (!!currentState) {
        document.getElementById('editModal').style.display = 'none';
        document.getElementsByClassName("main-image")[0].children[0].classList.remove('edit')
        document.getElementsByClassName("main-image")[0].children[0].onclick = () => {}
        document.getElementsByClassName('aboutMeMsg')[0].style.display = 'block'
        currentState = 0;  
    }else{
        document.getElementById('editModal').style.display = 'block'
        document.getElementsByClassName("main-image")[0].children[0].classList.add('edit')
        document.getElementsByClassName('aboutMeMsg')[0].style.display = 'none'
        document.getElementsByClassName("main-image")[0].children[0].onclick = ()=>{
            window.location = '/changePhoto?usname=' + currentUsername;
        }
        currentState = 1;
    }
    
}




function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('investors-table').style.display = 'none';
    donateTable = false;
}
function statusModal(status, msg) {
    if (status == 'success') {
        document.getElementById('statusModal').style.display = 'flex';
        document.getElementsByClassName('statusModal-container')[0].innerHTML = `<h1>${msg}<h1>`
        document.getElementsByClassName('statusModal-container')[0].className = 'statusModal-container success';
        setTimeout(() => {
            closeModal('statusModal');
            closeModal('sure');
        }, 2000);
    } else {
        document.getElementById('statusModal').style.display = 'flex';
        document.getElementsByClassName('statusModal-container')[0].innerHTML = `<h1>${msg}<h1>`
        document.getElementsByClassName('statusModal-container')[0].className = 'statusModal-container failed';
        setTimeout(() => {
            closeModal('statusModal');
            closeModal('sure');
        }, 2000);
    }
}