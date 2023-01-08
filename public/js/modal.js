
var donateTable = false;
var currentProject = 0;
const userId = parseInt(document.getElementById('userId').value);
let reader = new FileReader();

function closeModal(id, closeLayer=[0,1]){
    if (closeLayer != null) {
        
    if (!!document.getElementsByClassName('closeLayer')) {
        closeLayer.forEach(i => {
            document.getElementsByClassName('closeLayer')[i].style.display = 'none'
        })
    }
    }
    

    document.getElementById(id).style.display = 'none';
    document.getElementsByClassName('card-modal-images')[0].innerHTML = ''
    donateTable = false;
}

async function openIdeaModal(id){
    document.getElementById('investors-table').style.display = 'none';
    id = parseInt(id);
    currentProject = id;

    let result = await axios.get(`https://server.mswareg.com/findPub/${id}`);

    //var texto = reader.readAsArrayBuffer(result.data.pubData.mainIdea.data)
    
    console.log(result)
    document.getElementsByClassName('model-title')[0].innerHTML = `<h1>${result.data.pubData.title}</h1>`;
    document.getElementsByClassName('model-sub')[0].innerHTML = `<i>${result.data.pubData.ideaSummary}</i>`;
    document.getElementsByClassName('card-modal-idea')[0].innerHTML = `${result.data.pubData.mainIdea}`;
    document.getElementsByClassName('modal-category')[0].children[0].innerHTML = `#${result.data.pubData.category}`;
    document.getElementsByClassName('modal-category')[0].children[1].innerHTML = `@${result.data.pubData.createdBy}`;
    
    let date = result.data.pubData.createdAt;
    let day = date.slice(0, 10)
    let daySplit = day.split('-')
    let brDate = `${daySplit[2]}/${daySplit[1]}/${daySplit[0]}`
    document.getElementsByClassName('modal-category')[0].children[2].innerHTML = brDate

    result.data.pubData.images.forEach(data=>{
        let newImg = document.createElement('img')
        newImg.src = data.url
        
        document.getElementsByClassName('card-modal-images')[0].insertBefore(newImg, document.getElementsByClassName('card-modal-images')[0].children[0] )
    })
    
    
    document.getElementById('modal').style.display = 'flex';
    
    document.getElementsByClassName('actionButton')[0].onclick = async ()=>{
        if (donateTable) {
            document.getElementById('investors-table').style.display = 'none';
            donateTable = false;
        }else{
            
            var data = await axios.get(`https://server.mswareg.com/listDonates/${id}`);
            console.log(data);

            const totalInvestment = !!result.data.pubData.totalInvestment ? result.data.pubData.totalInvestment:0
            
            var lista = `
            <div class="table">
            <table>
                <tr>
                    <th>
                    </th>
                    <th>Nome</th>
                    <th>investimento</th>
                </tr>
                `;

            var finishList = `</table></div>
            <div class="confirm">
            <div class="total-value-donated"> Total investido: R$${totalInvestment}</div>
            <div class="confirm-confirm"> 
                <input type="number" placeholder="Quantia" id="amountToPay-input"> 
                <textarea id="investmentMsg">escreva um recado!</textarea><br>
                <button onclick="donate()">Ok!</button>
            </div>
        </div>
            `

                data.data.result.result[0].forEach((item)=>{
                    lista += ` 
                    <tr id="investment${item.id}" onclick="getInvestment(${item.id})">
                        <td>
                            <span style="background-image: url('${item.profilePhoto}')"></span>
                        </td>
                        <td>${item.username}</td>
                        <td>${item.investment}$</td>
                    </tr>
                    `
                })
            console.log(data.data.result.result[0]);

            var finalResult = lista+finishList;

            document.getElementById('investors-table').innerHTML = finalResult;

                
            document.getElementById('investors-table').style.display = 'flex';
            document.getElementsByClassName('closeLayer')[0].style.display = 'flex';
            donateTable = true;




        }
    }
    document.getElementsByClassName('actionButton')[1].onclick = () => {
        console.log('comprando...' + id)
    }
    

};



function donate(){
    document.getElementById('sure').style.display = "flex"
    document.getElementsByClassName('sure-container')[0].style.display = 'initial'
    document.getElementById('sureMsg').innerHTML = `irá utilizar R$ ${document.getElementById('amountToPay-input').value} do seus créditos para realizar esta ação?`
}


async function confirmPurchase(userId){
    document.getElementsByClassName('sure-container')[0].style.display = 'none'
    var userId = parseInt(userId)
    console.log('entrou aqui')

    var credits = parseFloat(document.getElementById('amountToPay-input').value)
    document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {

            try {
                var result = await axios.post('https://server.mswareg.com/donateCredits', {
                    userId,
                    credits,
                    projectId: currentProject,
                    investmentMsg: document.getElementById('investmentMsg').value,
                    currentcode: document.getElementById('currentcode').value
                }, {
                    headers: {
                        'authorization': `Bearer ${authToken[1]}`
                    }
                })
        
                console.log(result)
        
                if(result.status == 200){
                    statusModal('success', result.data.msg)
                }else{
                    statusModal('failed', "Ops, algo deu errado!")
                }
                
            } catch (error) {
                console.log(error)
                statusModal('failed', error.response.data.msg)
            }

        }
    })
}


function statusModal(status, msg){
    if (status == 'success') {
        document.getElementById('statusModal').style.display = 'flex';
        document.getElementsByClassName('statusModal-container')[0].innerHTML = `<h1>${msg}<h1>`
        document.getElementsByClassName('statusModal-container')[0].className = 'statusModal-container success';
        setTimeout(() => {
            closeModal('statusModal', null);
            closeModal('sure', null);
        }, 2000);
    }else{
        document.getElementById('statusModal').style.display = 'flex';
        document.getElementsByClassName('statusModal-container')[0].innerHTML = `<h1>${msg}<h1>`
        document.getElementsByClassName('statusModal-container')[0].className = 'statusModal-container failed';
        setTimeout(() => {
            closeModal('statusModal', null);
            closeModal('sure', null);
        }, 2000);
    }
}



async function openModal(elementId, itemId, allowFeedback=true){

    allowFeedback = !!(parseInt(allowFeedback))
    
    if (!allowFeedback) {
        document.getElementById('feedbackAction').style.display = 'none'
    }else{
        document.getElementById('feedbackAction').style.display = 'initial'
    }
    
    document.getElementById(elementId).style.display= "flex";
    itemId = parseInt(itemId)
    console.log(itemId)

    let result = await axios.get(`https://server.mswareg.com/findPub/${itemId}`);
    let title = result.data.pubData.title;
    document.getElementsByClassName('insertIdeaName')[0].innerHTML = `"${title}"`;
    document.getElementsByClassName('insertIdeaName')[1].innerHTML = `"${title}"`;
    document.getElementsByClassName('sendFeedback')[0].onclick = async ()=>{
        document.cookie.split(';').forEach(async cookie => {
            authToken = cookie.split('=');
            if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
                try {
                    let sendFeedbackResult = await axios.post('https://server.mswareg.com/sendFeedback', {
                        userId,
                        ideaId: itemId,
                        feedbackMsg: document.getElementById('feedback-textArea').value,
                    }, {
                    headers: {
                        'authorization': `Bearer ${authToken[1]}`
                    }
                })
                    statusModal('success', sendFeedbackResult.data.msg) 
                } catch (error) {
                    statusModal('failed', error ) 
                }

            }
        })

    };
    document.getElementsByClassName('sendReport')[0].onclick = async () => {
        document.cookie.split(';').forEach(async cookie => {
            authToken = cookie.split('=');
            if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {

                try {
                    let sendReportResult = await axios.post('https://server.mswareg.com/sendReport', {
                        userId,
                        reportMsg: document.getElementById('report-textArea').value,
                        ideaReport: itemId,
                        reportCategorie: reportCategorie.value
                    }, {
                     headers: {
                         'authorization': `Bearer ${authToken[1]}`
                     }
                 })
                    statusModal('success', sendReportResult.data.msg) 
                } catch (error) {
                    statusModal('failed', error) 
                }

            }
        })


    };
    
}


async function openInfoModal(userId){
    try {
        const userInfo = await axios.get('https://server.mswareg.com/userHelpInfo/'+userId)
        console.log(userInfo)
        document.getElementById('user-info-container').innerHTML = 
        `
        <h2>informações do usuário: <i onclick="closeModal('user-info-modal', null)" class="fa-solid fa-xmark"></i></h2> <br>
            <ul>
                <li>Você colaborou com <span style="color: blue;">${userInfo.data.info.totalInvestiment}</span> </li><br>
                <li>Ajudou em <span style="color: blue;">${userInfo.data.info.ideaHelped}</span> ideias  </li><br>
                <li>Criou <span style="color: blue;">${userInfo.data.info.madeIdeas}</span> ideias: </li><br>
                <li>Ajudou a salvar <span style="color: blue;">${parseInt(userInfo.data.info.totalInvestiment/10)}</span> entre pessoas e animais. <span style="font-size: 12px;">(aumentamos 1 a cada 10R$ destinados a caridade)</span></li><br>
                <li>Suas ideias tem <span style="color: blue;">${userInfo.data.info.countIdeaLikes}</span> likes no total. </li><br>
                <li style="background-color: rgb(112, 112, 112); color: white;">Você possui <span style="color: blue;">**</span> medalhas. <br>-- medalhas ainda não estão disponíveis.</li>
            </ul><br><br>
        `
        document.getElementById('user-info-modal').style.display = 'flex';
    } catch (error) {
        console.log(error)
    }
}

async function getInvestment(investmentId){
    try {
        const investmentData = await axios.get('https://server.mswareg.com/getOneDonate/'+investmentId);
        console.log(investmentData)
        const investmentMsgContainerHTML = `
        <h3>valor: <span style="color: blue;">${investmentData.data.result.result.investment}</span></h3>
        <p id="currentInvestmentMsg">${investmentData.data.result.result.investmentMsg}</p>
        `

        document.getElementById('investmentMsgContainer').innerHTML = investmentMsgContainerHTML;
        document.getElementById('investmentMsgModal').style.display = 'flex'
        document.getElementsByClassName('closeLayer')[1].style.display = 'flex';
    } catch (error) {
        console.log(error)
    }
}