(async function verifyFollow(){
    console.log(userId.value, currentUser.value)
    try {
        let follow = await axios.get('http://15.228.160.53:8000/verifyFollow/' + userId.value + '/' + currentUser.value);
        console.log(follow.data.follow)
        if (follow.data.follow){
            document.getElementById('follow').classList = 'followed-button';
            document.getElementById('follow').innerHTML = 'Followed <i class="fa-solid fa-check"></i> '
        }else{
            document.getElementById('follow').classList = 'follow-button';
            document.getElementById('follow').innerHTML = 'Follow '
        }
    } catch (error) {
        console.log(error)
    }
})()


async function follow(){
    try {
        let follow = await axios.post('http://15.228.160.53:8000/followUser',{
            userId,
            followingId: currentUser
        })
        if (follow.data.follow) {
            document.getElementById('follow').classList = 'followed-button';
            document.getElementById('follow').innerHTML = 'Followed <i class="fa-solid fa-check"></i> '
        } else {
            document.getElementById('follow').classList = 'follow-button';
            document.getElementById('follow').innerHTML = 'Follow '
        }
        
    } catch (error) {
        console.log(error)
    }
}