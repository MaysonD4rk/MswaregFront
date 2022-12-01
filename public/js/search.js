const postsArrayInitialState = document.getElementsByClassName('posts')[0].innerHTML;


document.getElementById('search').addEventListener('keydown', () => { searchIdea() })

if (document.getElementById('search').value != ' ' || !document.getElementById('search').value.length <= 1 || document.getElementById('search').value != '' ) {
    if (!!document.getElementById('nextButton') && !!document.getElementById('previewButton')) {
        document.getElementById('nextButton').onclick = () => {
            nextPreview('next', true)
        }
        document.getElementById('previewButton').onclick = () => {
            nextPreview('preview', true)
        }
    }
}

function searchIdea() {



    if (document.getElementById('search').value.length < 1) {
        document.getElementsByClassName('posts')[0].innerHTML = postsArrayInitialState
    }

    axios.get('https://server.mswareg.com/searchPost/0/' + document.getElementById('search').value)
        .then(posts => {

            const arrayPosts = posts.data.result;

            //criação de um post

            document.getElementsByClassName('posts')[0].innerHTML = ''

            console.log(arrayPosts)

            if (!arrayPosts) {
                document.getElementsByClassName('posts')[0].innerHTML = 'HMMMM... sem ideias por enquanto.'
            }

            arrayPosts.forEach(element => {
                console.log(element)
                let postCard = document.createElement('div');
                postCard.classList.add('post-card')
                postCard.id = element.id
                postCard.style.backgroundImage = "url(" + element.imageUrl + ")";



                let cardHeader = document.createElement('div');
                cardHeader.classList.add('card-header');
                cardHeader.onclick = () => {
                    openIdeaModal(element.id)
                }
                let h2CardHeader = document.createElement('h2');
                h2CardHeader.innerHTML = element.title
                let pCardHeader = document.createElement('p');
                pCardHeader.innerHTML = element.ideaSummary
                let cardImg = document.createElement('div');
                cardImg.classList.add('card-img');
                let cardInfo = document.createElement('div');
                cardInfo.classList.add('card-info');
                let interaction1 = document.createElement('i');
                interaction1.className = 'fa-solid fa-heart like'
                interaction1.onclick = () => {
                    likePub(element.id)
                }

                let div1 = document.createElement('div');
                let pAmount = document.createElement('p');
                pAmount.innerHTML = element.initialAmountRequired
                let progressBar = document.createElement('progress');
                progressBar.max = element.initialAmountRequired
                progressBar.value = "500"


                let interaction2 = document.createElement('i');
                interaction2.className = 'fa-solid fa-star like';
                interaction2.onclick = () => {
                    favoritePub(element.id)
                }


                postCard.appendChild(cardHeader)
                cardHeader.appendChild(h2CardHeader)
                cardHeader.appendChild(pCardHeader)
                postCard.appendChild(cardImg)
                postCard.appendChild(cardInfo)
                cardInfo.appendChild(interaction1)
                cardInfo.appendChild(div1)
                div1.appendChild(pAmount)
                div1.appendChild(progressBar)
                cardInfo.appendChild(interaction2)
                document.getElementsByClassName('posts')[0].appendChild(postCard)


            })






        })
        .catch(error => {
            console.log('nada encontrado')
        })

}