addEventListener('DOMContentLoaded', (event) => {
    if (currentPage == 'generalSearch') {
        verifyFollow();
    }else{
        verifyFollow(document.getElementsByClassName('main-div'));
    }
});

async function verifyFollow(users=document.getElementsByClassName('userResults')){
    
    
    for (let i = 0; i < users.length; i++) {
        const elementId = users[i].id;
        const id = parseInt(elementId.split('user')[1])
        try {
            let follow = await axios.get('http://localhost:8000/verifyFollow/' + userId + '/' + id);
            console.log(follow.data.follow)
            if (follow.data.follow) {
                document.getElementById('follow'+id).classList = 'followed-button';
                document.getElementById('follow'+id).innerHTML = 'Followed <i class="fa-solid fa-check"></i> '
            } else {
                document.getElementById('follow'+id).classList = 'follow-button';
                document.getElementById('follow'+id).innerHTML = 'Follow '
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
}

async function follow(followingId){

    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    
    followingId = parseInt(followingId)
    console.log(followingId)
    try {
        let follow = await axios.post('http://localhost:8000/followUser',{
            userId,
            followingId: followingId
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        if (follow.data.follow) {
            document.getElementById('follow' + followingId).classList = 'followed-button';
            document.getElementById('follow' + followingId).innerHTML = 'Followed <i class="fa-solid fa-check"></i> '
        } else {
            document.getElementById('follow' + followingId).classList = 'follow-button';
            document.getElementById('follow' + followingId).innerHTML = 'Follow '
        }
        
    } catch (error) {
        console.log(error)
    }
}