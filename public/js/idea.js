
(async function likedFavoritedPubs() {


    for (let i = 0; i < document.getElementsByClassName('post-card').length; i++) {
        let pubId = document.getElementsByClassName('post-card')[i].id;
        pubId = parseInt(pubId);

        try {
            let likedPub = await axios.get(`http://54.233.190.172:8000/checkLikeFavorite/${pubId}/${userId}`);
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


    try {
        console.log(`tentando`)
        var status = await axios.put('http://54.233.190.172:8000/likePub', { pubId, userId })
        if (status.data.msg == 'liked') {
            document.getElementById(pubId).classList.add('liked');
        } else {
            document.getElementById(pubId).classList.remove('liked');

        }

    } catch (error) {
        console.log(error)
    }
}

async function favoritePub(pubId) {
    pubId = parseInt(pubId)


    try {
        console.log(`tentando`)
        let status = await axios.put('http://54.233.190.172:8000/favoritePub', { userId, pubId })
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