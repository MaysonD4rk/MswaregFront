addEventListener('DOMContentLoaded', (event) => {
    if (currentPage == 'generalSearch') {
        verifyFollow();
    }else{
        verifyFollow(document.getElementsByClassName('main-div'));
    }
});

async function verifyFollow(users = document.getElementsByClassName('userResults'), fromList = false){
    
    
    for (let i = 0; i < users.length; i++) {
        const elementId = users[i].id;
        const id = parseInt(elementId.split('user')[1])
        
        try {
            let follow = await axios.get('https://server.mswareg.com/verifyFollow/' + userId + '/' + id);
            
            if (follow.data.follow) {
                if (!fromList) {
                    document.getElementById('follow'+id).classList = 'followed-button';
                }
                
                document.getElementById('follow'+id).innerHTML = 'Followed <i class="fa-solid fa-check"></i> '
            } else {
                if (!fromList) {
                    document.getElementById('follow'+id).classList = 'follow-button';
                }
                
                document.getElementById('follow'+id).innerHTML = 'Follow '
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
}

async function follow(followingId, fromList=false){
    followingId = parseInt(followingId)
    

    document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {

                    try {
                        let follow = await axios.post('https://server.mswareg.com/followUser', {
                            userId,
                            followingId: followingId
                        }, {
                            headers: {
                                'authorization': `Bearer ${authToken[1]}`
                            }
                        })
                        if (follow.data.follow) {
                            if (!fromList) {
                                document.getElementById('follow' + followingId).classList = 'followed-button';
                            }
                            document.getElementById('follow' + followingId).innerHTML = 'Followed <i class="fa-solid fa-check"></i> '
                        } else {
                             if (!fromList) {
                            document.getElementById('follow' + followingId).classList = 'follow-button';
                            }
                            document.getElementById('follow' + followingId).innerHTML = 'Follow '
                        }

                    } catch (error) {
                        console.log(error)
                    }

                }
            })
    
}