let divIdeaCreated = false;
let divMsgsCreated = false;
let divUsersCreated = false;
let currentSearchValue = ''
const currentPage = 'generalSearch'


if (!!document.getElementById('search')) {
    
    document.getElementById('search').addEventListener('keydown', async (e) => {
    
        currentSearchValue = document.getElementById('search').value;
    
        if (document.getElementById('search').value.length > 0) {
    
            try {
                const results = await axios.get('http://54.233.190.172:8000/generalSeach/' + currentSearchValue);
                renderCards(results)
    
            } catch (error) {
                console.log(error)
                console.log('ta cheganod nesse erro aqui')
            }
        } else {
            document.getElementsByClassName('responseCards')[0].innerHTML = ''
            divIdeaCreated = false
            divMsgsCreated = false
            divUsersCreated = false
        }
    })
}


function renderCards(results) {

    let ideasResult = results.data.results.ideaResult[0].results
    let msgsResult = results.data.results.msgsResult[0].results
    let usersResult = results.data.results.usersResult[0].results

    if (ideasResult > 0) {

        if (divIdeaCreated) {
            if (!!document.getElementById('ideasText')) {
                document.getElementById('ideasText').innerHTML = `${results.data.results.ideaResult[0].results} results`
            } else {
                divIdeaCreated = false
            }
        } else {
            divIdeaCreated = true;
            let card = document.createElement('div');
            card.classList = 'card';
            card.onclick = () => {
                location.href = 'http://mswareg.mswareg.com:8080/search?ideaQuery=' + currentSearchValue;
            }
            card.id = "ideaCard"
            let cardItens = document.createElement('div');
            cardItens.classList = 'card-itens'
            cardItens.innerHTML = `
                             <h3>Ideas</h3>
                             <p id="ideasText">${results.data.results.ideaResult[0].results} resultados</p>
                         `
            let cardItensIcon = document.createElement('div');
            cardItensIcon.classList = 'card-itens';
            cardItensIcon.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`

            card.appendChild(cardItens)
            card.appendChild(cardItensIcon)
            document.getElementsByClassName('responseCards')[0].appendChild(card);
        }
    } else {
        if (!!document.getElementById('ideaCard')) {
            document.getElementById('ideaCard').remove()
        }
    }


    if (msgsResult > 0) {

        if (divMsgsCreated) {
            if (!!document.getElementById('msgsText')) {
                document.getElementById('msgsText').innerHTML = `${results.data.results.msgsResult[0].results} results`
            } else {
                divMsgsCreated = false
            }
        } else {
            divMsgsCreated = true;
            let card = document.createElement('div');
            card.classList = 'card';
            card.onclick = () => {
                location.href = 'http://mswareg.mswareg.com:8080/search?msgQuery=' + currentSearchValue;
            }
            card.id = "msgsCard"
            let cardItens = document.createElement('div');
            cardItens.classList = 'card-itens'
            cardItens.innerHTML = `
                             <h3>Mensagens</h3>
                             <p id="msgsText">${results.data.results.msgsResult[0].results} resultados</p>
                         `
            let cardItensIcon = document.createElement('div');
            cardItensIcon.classList = 'card-itens';
            cardItensIcon.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`

            card.appendChild(cardItens)
            card.appendChild(cardItensIcon)
            document.getElementsByClassName('responseCards')[0].appendChild(card);
        }
    } else {
        if (!!document.getElementById('msgsCard')) {
            document.getElementById('msgsCard').remove()
        }
    }

    if (usersResult > 0) {

        if (divUsersCreated) {
            if (!!document.getElementById('usersText')) {
                document.getElementById('usersText').innerHTML = `${results.data.results.usersResult[0].results} results`
            } else {
                divUsersCreated = false
            }
        } else {
            divUsersCreated = true;
            let card = document.createElement('div');
            card.classList = 'card';
            card.onclick = () => {
                location.href = 'http://mswareg.mswareg.com:8080/search?userQuery=' + currentSearchValue;
            }
            card.id = "usersCard"
            let cardItens = document.createElement('div');
            cardItens.classList = 'card-itens'
            cardItens.innerHTML = `
                             <h3>Users</h3>
                             <p id="usersText">${results.data.results.usersResult[0].results} resultados</p>
                         `
            let cardItensIcon = document.createElement('div');
            cardItensIcon.classList = 'card-itens';
            cardItensIcon.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`

            card.appendChild(cardItens)
            card.appendChild(cardItensIcon)
            document.getElementsByClassName('responseCards')[0].appendChild(card);
        }
    } else {
        if (!!document.getElementById('usersCard')) {
            document.getElementById('usersCard').remove()
        }
    }

}

console.log(!!document.getElementById('nextButton'))
console.log(!!document.getElementById('previewButton'))

if (!!document.getElementById('nextButton') && !!document.getElementById('previewButton') ) {
    document.getElementById('nextButton').onclick = ()=>{
        nextPreview('next', false)
    }
    document.getElementById('previewButton').onclick = () => {
        nextPreview('preview', false)
    }
}

let offsetMsgsSearch = 0;
let offsetUsersSearch = 0;
let allLoaded = false;
queryInput = document.getElementById('queryInput') ? document.getElementById('queryInput').value : ''
queryType = document.getElementById('queryType') ? document.getElementById('queryType').value : ''

async function loadMoreItens() {
    if (!allLoaded) {
        
        if (queryInput != '') {
            if (queryType != '' && queryType == 'userQuery') {
                if ((document.getElementsByTagName('body')[0].scrollHeight - window.scrollY) <= 761) {
                    ++offsetUsersSearch
                    try {
                        let users = await axios.get(`http://54.233.190.172:8000/getSearchListUser/${offsetUsersSearch * 20}/${queryInput}`);
                        console.log(users.data.results)
                        if (!users.data.results || users.data.results.length<1) {
                            allLoaded = true
                            if (!!document.getElementById('loadIcon')) {
                                document.getElementById('loadIcon').remove()
                            }
                        } else {
                            
                            users.data.results.forEach(user=>{
                                
                                let userResults = document.createElement('div');
                                    userResults.classList = 'userResults'
                                let userResultCard = document.createElement('div');
                                    userResultCard.classList = 'user-result-card'
                                let imgDiv = document.createElement('div');
                                    imgDiv.classList = 'imgDiv'
                                    console.log('chegou aqui no imgDiv')
                                    if (user.profilePhoto != null) {
                                        imgDiv.innerHTML = `
                                            <img src="${user.profilePhoto}" alt="">
                                        `
                                    }else{
                                        imgDiv.innerHTML = `
                                            <img src="data:image/png;base64,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" alt="">
                                        `
                                    }
                                    console.log('atravessou imgDiv')
                                let userResultCardInfo = document.createElement('div');
                                    userResultCardInfo.classList = 'user-result-card-info'
                                    userResultCardInfo.innerHTML = `
                                        <a href="http://mswareg.mswareg.com:8080/profile/${user.username}">@${user.username}</a>
                                            <button>Follow</button>
                                    `

                                

                                document.getElementsByClassName('container')[0].appendChild(userResults)
                                userResults.appendChild(userResultCard)
                                userResultCard.appendChild(imgDiv)
                                userResultCard.appendChild(userResultCardInfo)
                                
                                
                            })
                           
                            let loadIcon = document.createElement('i');
                            loadIcon.classList = 'fa-solid fa-spinner'
                            loadIcon.id = 'loadIcon'
                            document.getElementsByClassName('container')[0].appendChild(loadIcon)
                        }

                    } catch (error) {
                        console.log(error)
                    }

                }
            } else if (queryType != '' && queryType == 'msgQuery'){
                if ((document.getElementsByTagName('body')[0].scrollHeight - window.scrollY) <= 761) {
                    ++offsetMsgsSearch
                    try {
                        let msgs = await axios.get(`http://54.233.190.172:8000/searchForMsg/${offsetMsgsSearch * 15}/${queryInput}`);
                        console.log(msgs)
                        if (msgs.data.result == undefined) {
                            allLoaded = true;
                            if (!!document.getElementById('loadIcon')) {
                                document.getElementById('loadIcon').remove()
                            }
                        }else{
                            msgs.data.result.forEach((msgItem)=>{
                                let askItem = document.createElement('div');
                                    askItem.classList = 'ask-item';
                                let askItemImg = document.createElement('div');
                                    askItemImg.classList = 'ask-item-img';
                                    askItemImg.style.backgroundImage = `url('${msgItem.profilePhoto}')`;
                                let askItemInfo = document.createElement('div');
                                    askItemInfo.classList = 'ask-item-info'

                                askItemInfo.innerHTML = `
                                <div>
                                        <h3>from: @${msgItem.username}
                                        </h3>
                                    </div>
                                    <div>
                                        <h3>to: @${msgItem.recipientName}
                                        </h3>
                                    </div>
                                    <h3>msg: </h3>
                                    <div class="ask-text">
                            
                                        ${msgItem.msg}
                            
                            
                                    </div>
                                `;
                                askItem.appendChild(askItemImg);
                                askItem.appendChild(askItemInfo);
                                document.getElementsByClassName('asks')[0].appendChild(askItem)

                            })
                            let loadIcon = document.createElement('i');
                            loadIcon.classList = 'fa-solid fa-spinner'
                            loadIcon.id = 'loadIcon'
                            document.getElementsByClassName('container')[0].appendChild(loadIcon)
                        }
                        
                    } catch (error) {
                        console.log(error)
                    }
                    
                }

            }
        }else{
            allLoaded = true
            console.log('ja deu')
        }
    }else{
        console.log('carregou tudo')
        if (!!document.getElementById('loadIcon')) {
            document.getElementById('loadIcon').remove()
        }
    }

}


setInterval(() => {
    loadMoreItens()
    if (!!document.getElementById('loadIcon')) {
        document.getElementById('loadIcon').remove()
    }
}, 1000);


