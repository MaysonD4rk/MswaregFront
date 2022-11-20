
(async function likedFavoritedPubs() {


    for (let i = 0; i < document.getElementsByClassName('post-card').length; i++) {
        let pubId = document.getElementsByClassName('post-card')[i].id;
        pubId = parseInt(pubId);

        try {
            let likedPub = await axios.get(`http://localhost:8000/checkLikeFavorite/${pubId}/${userId}`);
            console.log(likedPub)
            if (!!likedPub.data.result.row[0].liked) {
                document.getElementById(pubId).classList.add('liked');
            }

            if (!!likedPub.data.result.row[0].favoritedIdea) {
                document.getElementById(pubId).classList.add('favorited');
            }
        } catch (error) {
            console.log(error)
        }


    }


})()



async function likePub(pubId) {
    pubId = parseInt(pubId)

    const cookies = document.cookie.split('=');
    const authToken = cookies[1];

    try {
        console.log(`tentando`)
        var status = await axios.put('http://localhost:8000/likePub', { pubId, userId }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        console.log(status)
        if (status.data.msg == 'liked') {
            document.getElementById(pubId).classList.add('liked');
        } else if (status.data.msg == 'unliked') {
            document.getElementById(pubId).classList.remove('liked');
        }else{
            if (!!status.data.tryLike.status) {
                document.getElementById(pubId).classList.add('liked');
            } else {
                document.getElementById(pubId).classList.remove('liked');
            }
        }

    } catch (error) {
        console.log(error)
    }
}

async function favoritePub(pubId) {
    pubId = parseInt(pubId)
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];

    try {
        console.log(`tentando`)
        let status = await axios.put('http://localhost:8000/favoritePub', { userId, pubId }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        console.log(status)
        if (status.data.msg == 'favorited') {
            document.getElementById(pubId).classList.add('favorited');
        } else {
            document.getElementById(pubId).classList.remove('favorited');
        }

    } catch (error) {
        console.log(error)
    }
}


