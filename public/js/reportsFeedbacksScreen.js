const userId = document.getElementById('userId').value
let limitFeedback = 1;
let limitReport = 1;
let loadFeedbackIconShowed = false;
let loadReportIconShowed = false;

function listFeedbackReports(tab) {
    if (tab == "feedbacks") {
        console.log('entrou feedbacks')

        document.getElementById('reports-tab-container').style.display = "none"
        document.getElementById('withdraw-tab-container').style.display = "none"
        document.getElementById('withdrawList').style.display = 'none'

        document.getElementById('reportsList').style.display = 'none';
        document.getElementById('feedbacksList').style.display = 'initial';
    } else if (tab == "reports"){
        document.getElementById('feedbacks-tab-container').style.display = "none"
        document.getElementById('withdraw-tab-container').style.display = "none"
        
        document.getElementById('feedbacksList').style.display = 'none'
        document.getElementById('withdrawList').style.display = 'none'
        document.getElementById('reportsList').style.display = 'initial'
    } else if (tab == "withdraw") {
        document.getElementById('feedbacks-tab-container').style.display = "none"
        document.getElementById('reports-tab-container').style.display = "none"
        
        document.getElementById('feedbacksList').style.display = 'none'
        document.getElementById('reportsList').style.display = 'none'
        document.getElementById('withdrawList').style.display = 'initial'
    }
}

//from where?
async function openSelection(fromW, itemId, reports = 0, categorie = "") {

    itemId = parseInt(itemId)
    console.log(itemId)

    if (screen.availWidth <= 400) {
        if (fromW == 'feedback') {
            try {
                document.getElementsByClassName('loadIcon')[0].remove()
            } catch (error) {
                console.log(error)
            }

            document.getElementById('feedbacks-tab-container').style.display = "flex"

            renderFeedback(itemId)

            document.getElementById('reports-tab-container').style.display = "none"
            document.getElementById('withdraw-tab-container').style.display = "none"
            document.getElementById('myTab').style.display = 'none'
        } else if(fromW == 'report') {
            try {
                document.getElementsByClassName('loadIcon')[0].remove()
            } catch (error) {

            }

            document.getElementById('reports-tab-container').style.display = "flex"
            renderReports(itemId, reports, categorie)
            document.getElementById('feedbacks-tab-container').style.display = "none"
            document.getElementById('withdraw-tab-container').style.display = "none"
            document.getElementById('myTab').style.display = 'none'
        }else if(fromW == 'withdraw'){
            try {
                document.getElementsByClassName('loadIcon')[0].remove()
            } catch (error) {

            }

            document.getElementById('withdraw-tab-container').style.display = "flex"
            renderWithdraw(itemId)
            document.getElementById('feedbacks-tab-container').style.display = "none"
            document.getElementById('reports-tab-container').style.display = "none"
            document.getElementById('myTab').style.display = 'none'
        }
    } else {
        if (fromW == 'feedback') {
            try {
                document.getElementsByClassName('loadIcon')[0].remove()
            } catch (error) {

            }

            document.getElementById('feedbacks-tab-container').style.display = "flex"
            renderFeedback(itemId)
            document.getElementById('reports-tab-container').style.display = "none"
            document.getElementById('withdraw-tab-container').style.display = "none"


        } else if (fromW == 'report') {
            try {
                document.getElementsByClassName('loadIcon')[0].remove()
            } catch (error) {

            }

            document.getElementById('reports-tab-container').style.display = "flex"
            renderReports(itemId, reports, categorie)
            document.getElementById('feedbacks-tab-container').style.display = "none"
            document.getElementById('withdraw-tab-container').style.display = "none"

        } else if (fromW == 'withdraw') {
            try {
                document.getElementsByClassName('loadIcon')[0].remove()
            } catch (error) {

            }

            document.getElementById('withdraw-tab-container').style.display = "flex"
            renderWithdraw(itemId)
            document.getElementById('feedbacks-tab-container').style.display = "none"
            document.getElementById('reports-tab-container').style.display = "none"
        }
        document.getElementById('feedbacks-tab-container').style.display = "flex"
    }
}

function returnToList() {


    if (screen.availWidth <= 400) {
        document.getElementById('myTab').style.display = 'flex'
    } else {
        document.getElementById('feedbacks-tab-container').style.display = "none"
    }
}


async function renderFeedback(itemId) {
    console.log('entrou em renderFeedback')
    const cookies = document.cookie.split('=');
    console.log(document.cookie)
    const authToken = cookies[1];
    console.log(cookies)
    
    const feedback = await axios.get(`https://server.mswareg.com/getFeedback/${itemId}/${userId}`, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }})




    const textHtml = `
                
                <i onclick="returnToList()" class="fa-solid fa-arrow-left"></i>
                
                            <h1>FEEDBACK</h1>
                        
                        <h4>From: ${feedback.data.feedback[0].username}</h4>
                        <h4>Idea: ${feedback.data.feedback[0].title}</h4>

                        <p>
                            "${feedback.data.feedback[0].feedbackMsg}"
                        </p>
                        <i onclick="deleteFeedback(${itemId})" class="fa-solid fa-trash"></i>
                
                `
    document.getElementById('feedbacks-tab-container').innerHTML = textHtml
}

async function renderReports(ideaId, reports, categorie) {
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    console.log(cookies)
    console.log(authToken)
    console.log(document.cookie)

    const reportsList = await axios.get('https://server.mswareg.com/getReports/' + ideaId,{
            headers: {
                'authorization': `Bearer ${authToken}`
            }})

    console.log(reportsList.data.reports)


    let textHtml = `
                
                <i onclick="returnToList()" class="fa-solid fa-arrow-left"></i>
                

                <button onclick="reportDecision('disable',${ideaId})" style="background-color: red;">DESLIGAR</button>
                <button onclick="reportDecision('release',${ideaId})" style="background-color: green;">LIBERAR</button>

                            <h1>REPORTS</h1>
                        
                        <h4>From: ${reports} users</h4>
                        <a onclick="openIdeaNewTab('https://mswareg.mswareg.com/getIdeaById/${ideaId}')" href="#">CLIQUE PARA VER IDEIA </a>
                        <h3>Categorie: ${categorie}
                        <p>
                            ""
                        </p>
                
                `

    reportsList.data.reports.forEach(item => {
        let newHtmlText = `<p>"${item.reportMsg}"</p>`

        textHtml += newHtmlText
    })
    document.getElementById('reports-tab-container').innerHTML = textHtml



}

async function renderWithdraw(userId){
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    console.log(cookies)
    console.log(authToken)
    console.log(document.cookie)

    const withdrawInfo = await axios.get('https://server.mswareg.com/findWithdrawRequestByUserId/' + userId, {
        headers: {
            'authorization': `Bearer ${authToken}`
        }
    })

    console.log(withdrawInfo)


    let textHtml = `
                
                <i onclick="returnToList()" class="fa-solid fa-arrow-left"></i>
                

                <button onclick="withdrawstatus(${userId}, 'deny', '${withdrawInfo.data[0].email}')" style="background-color: red;">Negar</button>
                <button onclick="withdrawstatus(${userId}, 'done', '${withdrawInfo.data[0].email}')" style="background-color: green;">Feito</button>

                            <h1>Withdraw</h1>
                        <h2>First Name: ${withdrawInfo.data[0].FirstName}</h2> 
                        <h2>Last Name: ${withdrawInfo.data[0].Lastname}</h2> 
                        <h2>Valor: ${withdrawInfo.data[0].valueReq}</h2> 
                        <h2>Saldo: ${withdrawInfo.data[0].credits}</h2>
                
                `
    document.getElementById('withdraw-tab-container').innerHTML = textHtml
}

function openIdeaNewTab(link){
    window.open(link);
}


async function limitList(tab) {
    if (tab == 'feedback') {
        ++limitFeedback
        loadFeedbackIconShowed = false
        let offsetFeedback = ((limitFeedback * 10) - 10)

        document.getElementsByClassName('loadIcon')[0].remove()

        let loadList = await axios.get('https://server.mswareg.com/listFeedbacks/' + userId + "/" + offsetFeedback)
        console.log(loadList.data.result)
        if (loadList.data.result.length < 1) {
            loadFeedbackIconShowed = true
            document.getElementsByClassName('loadIcon')[0].remove()
        }

        loadList.data.result.forEach(item => {
            let div = document.createElement('div');
            let id = item.id
            div.onclick = () => { openSelection('feedback', id) }
            div.innerHTML = `
                usuário: ${item.username} <br>
                Jogo: ${item.title}
                `;
            document.getElementById('feedbacksList').appendChild(div);


        })


        console.log(document.getElementById('feedbacksList').scrollTop)
        console.log(document.getElementById('feedbacksList').scrollHeight)




        console.log(limitFeedback)
        console.log(offsetFeedback)

    } else {

        ++limitReport
        loadReportIconShowed = false
        let offsetReports = ((limitReport * 10) - 10)

        document.getElementsByClassName('loadIcon')[0].remove()

        let loadList = await axios.get('https://server.mswareg.com/listReports/' + offsetReports)
        if (loadList.data.result.length < 1) {
            loadReportIconShowed = true
            document.getElementsByClassName('loadIcon')[0].remove()
        }

        console.log(loadList.data.result)
        loadList.data.result.forEach(item => {
            let div = document.createElement('div');
            let id = item.ideaId
            div.onclick = () => { openSelection('report', id, item.reports, item.categorieReport) }
            div.innerHTML = `
                from: ${item.reports} users <br>
                Jogo: ${item.title} id: ${item.ideaId}
                categoria: ${item.categorieReport}
                `;
            document.getElementById('reportsList').appendChild(div);


        })





        console.log(document.getElementById('reportsList').scrollTop)
        console.log(document.getElementById('reportsList').scrollHeight)


    }
}






async function reportDecision(decision, ideaId) {
    console.log(decision)
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    if (decision == 'disable') {
        console.log('entrou aqui 1')
        try {
            let result = await axios.put('https://server.mswareg.com/disableIdea', { ideaId }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })
            console.log(result)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            let result = await axios.put('https://server.mswareg.com/releaseIdea', { ideaId },{
                headers: {
                    'authorization': `Bearer ${authToken}`
                }
            })
            console.log(result)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }
}


async function deleteFeedback(itemId) {
    console.log('entrou aqui')
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    console.log(authToken)
    try {
        let response = await axios.delete(`https://server.mswareg.com/deleteFeedkback/${itemId}/${userId}`, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        } )
        location.reload()
    } catch (error) {
        console.log(error)

    }

}


async function withdrawstatus(userId, status, email){

    const cookies = document.cookie.split('=');
    console.log(document.cookie)
    const authToken = cookies[1];
    try {
            await axios.put('https://server.mswareg.com/withdrawstatus',{
                userId,
                status,
                email
            },{
                headers:{
                    'authorization': `Bearer ${authToken}`
                }
            })
            window.location.reload()
    } catch (error) {
        console.log(error)
    }
}




setInterval(() => {
    //console.log(document.getElementById('feedbacksList').scrollHeight)
    if ((document.getElementById('feedbacksList').scrollHeight - document.getElementById('feedbacksList').scrollTop) == 650) {
        if (!loadFeedbackIconShowed) {

            let loadIcon = document.createElement('i');
            loadIcon.classList = 'fa-solid fa-rotate-right loadIcon'
            console.log(loadIcon)
            loadIcon.onclick = () => { limitList('feedback') }
            document.getElementById('feedbacksList').appendChild(loadIcon)
            loadFeedbackIconShowed = true
        }
    }

    if ((document.getElementById('reportsList').scrollHeight - document.getElementById('reportsList').scrollTop) == 650) {
        if (!loadReportIconShowed) {

            let loadIcon = document.createElement('i');
            loadIcon.classList = 'fa-solid fa-rotate-right loadIcon'
            console.log(loadIcon)
            loadIcon.onclick = () => { limitList('report') }
            document.getElementById('reportsList').appendChild(loadIcon)
            loadReportIconShowed = true
        }
    }


    //console.log('entrou aqui')
}, 1000);