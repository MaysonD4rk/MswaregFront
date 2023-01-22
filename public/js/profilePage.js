var currentState = 0;
let usernameInput = document.getElementById('username').value
const currentUsername = usernameInput

const currentUser = document.getElementById('currentUser').value
const currentPage = 'profilePage'
async function editAboutMe(id){
    document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {

            var editAboutMe = await axios.put('https://server.mswareg.com/updateUserInfo', {
                userId: parseInt(id),
                aboutMe: document.getElementById('aboutMeTextArea').value
            }, {
                    headers: {
                        'authorization': `Bearer ${authToken[1]}`
                    }
                })
        
        
            if (editAboutMe.status == 200) {
                statusModal('success', editAboutMe.data.msg)
                document.getElementsByClassName('aboutMeMsg')[0].innerHTML = '"' + document.getElementById('aboutMeTextArea').value+'"';
            }else{
                statusModal('failed', editAboutMe.data.msg)
            }
            openEditModal()

        }
    })


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

if (!!document.getElementById(`follow${currentUser}`)) {
    document.getElementById(`follow${currentUser}`).onclick = ()=>{
        follow(currentUser)
    }
}
let loadFollowingIconShowed = false;
let loadFollowersIconShowed = false;
let followingOffset = 1;
let followerOffset = 1;

async function limitList(tab) {
    if (tab == 'following') {
        
        loadFollowingIconShowed = false
        let offset = (followingOffset*20)
        document.getElementsByClassName('loadIcon')[0].remove()

        let loadList = await axios.get('https://server.mswareg.com/getUsersRelations/'+offset+'/'+userId+'/follower')
        console.log(loadList.data)
        if (loadList.data.length < 1) {
            loadFollowingIconShowed = true
            console.log('tem mais porra nenhuma mlk')
            return
        }

        loadList.data.forEach(item => {
            let div = document.createElement('div');
            div.innerHTML = `
               <div class="user-item" id="user${item.following_id}">
                        <div>
                            <div class="user-img"></div>
                        </div>
                            <div class="user-username">
                            @${item.followingUsername}
                        </div>
                        
                        <button onclick="follow(${item.following_id}, true)" id="follow${item.following_id}" class="followed-button-modal"></button>
                    </div>
                `;
            verifyFollow(document.getElementsByClassName('user-item'), true)
            document.getElementsByClassName('user-list')[0].appendChild(div);
            ++followingOffset

        })


        console.log(document.getElementsByClassName('user-list')[0].scrollTop)
        console.log(document.getElementsByClassName('user-list')[0].scrollHeight)


    } else {

        loadFollowingIconShowed = false
        let offset = (followerOffset * 20)
        document.getElementsByClassName('loadIcon')[0].remove()

        let loadList = await axios.get('https://server.mswareg.com/getUsersRelations/' + offset + '/' + userId + '/following')
        console.log(loadList.data)
        if (loadList.data.length < 1) {
            loadFollowingIconShowed = true
            document.getElementsByClassName('loadIcon')[0].remove()
            return
        }

        loadList.data.forEach(item => {
            let div = document.createElement('div');
            div.innerHTML = `
               <div class="user-item" id="user${item.following_id}">
                        <div>
                            <div class="user-img"></div>
                        </div>
                            <div class="user-username">
                            @${item.followerUsername}
                        </div>
                        
                        <button onclick="follow(${item.following_id})" id="follow${item.following_id}" class="followed-button-modal">Following</button>
                    </div>
                `;
            verifyFollow(document.getElementsByClassName('user-item'), true)

            document.getElementsByClassName('user-list')[1].appendChild(div);
            ++followerOffset

        })


        console.log(document.getElementsByClassName('user-list')[1].scrollTop)
        console.log(document.getElementsByClassName('user-list')[1].scrollHeight)


    }
}


setInterval(() => {
    
    if ((document.getElementsByClassName('user-list')[0].scrollHeight - document.getElementsByClassName('user-list')[0].scrollTop) == 343) {
        if (!loadFollowingIconShowed) {

            let loadIcon = document.createElement('i');
            loadIcon.classList = 'fa-solid fa-rotate-right loadIcon'
            console.log(loadIcon)
            loadIcon.onclick = () => { limitList('following') }
            document.getElementsByClassName('follow-modal-container')[0].appendChild(loadIcon)
            loadFollowingIconShowed = true
        }
    }

    if ((document.getElementsByClassName('user-list')[1].scrollHeight - document.getElementsByClassName('user-list')[1].scrollTop) == 343) {
        if (!loadFollowersIconShowed) {

            let loadIcon = document.createElement('i');
            loadIcon.classList = 'fa-solid fa-rotate-right loadIcon'
            console.log(loadIcon)
            loadIcon.onclick = () => { limitList('followers') }
            document.getElementsByClassName('follow-modal-container')[1].appendChild(loadIcon)
            loadFollowersIconShowed = true
        }
    }


    //console.log('entrou aqui')
}, 1000);


