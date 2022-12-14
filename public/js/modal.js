
var donateTable = false;
var currentProject = 0;
const userId = parseInt(document.getElementById('userId').value);
let reader = new FileReader();


function closeModal(id){
    document.getElementById(id).style.display = 'none';
    document.getElementById('investors-table').style.display = 'none';
    donateTable = false;
}

async function openIdeaModal(id){
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
                <input type="number" placeholder="Quantia" id="amountToPay-input"> <button onclick="donate()">Ok!</button>
            </div>
        </div>
            `

                data.data.result.result[0].forEach((item)=>{
                    lista += ` 
                    <tr>
                        <td>
                            <span style="background-image: url('${item.profilePhoto}')"></span>
                        </td>
                        <td>${item.username}</td>
                        <td>${item.investment}$</td>
                    </tr>
                    `
                })

            var finalResult = lista+finishList;

            document.getElementById('investors-table').innerHTML = finalResult;

                
            document.getElementById('investors-table').style.display = 'flex';
            donateTable = true;




        }
    }
    document.getElementsByClassName('actionButton')[1].onclick = () => {
        console.log('comprando...' + id)
    }
    

};



function donate(){
    document.getElementById('sure').style.display = "flex"
    document.getElementById('sureMsg').innerHTML = `irá utilizar R$ ${document.getElementById('amountToPay-input').value} do seus créditos para realizar esta ação?`
}


async function confirmPurchase(userId){

    var userId = parseInt(userId)

    var credits = parseFloat(document.getElementById('amountToPay-input').value)
    const cookies = document.cookie.split('=');
    const authToken = cookies[1];
    try {
        var result = await axios.post('https://server.mswareg.com/donateCredits', {
            userId,
            credits,
            projectId: currentProject
        }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })

        console.log(result)

        if(result.status == 200){
            statusModal('success', result.data.msg)
        }else{
            statusModal('failed', "Ops, algo deu errado!")
        }
        
    } catch (error) {
        statusModal('failed', error.response.data.msg)
    }
}


function statusModal(status, msg){
    if (status == 'success') {
        document.getElementById('statusModal').style.display = 'flex';
        document.getElementsByClassName('statusModal-container')[0].innerHTML = `<h1>${msg}<h1>`
        document.getElementsByClassName('statusModal-container')[0].className = 'statusModal-container success';
        setTimeout(() => {
            closeModal('statusModal');
            closeModal('sure');
        }, 2000);
    }else{
        document.getElementById('statusModal').style.display = 'flex';
        document.getElementsByClassName('statusModal-container')[0].innerHTML = `<h1>${msg}<h1>`
        document.getElementsByClassName('statusModal-container')[0].className = 'statusModal-container failed';
        setTimeout(() => {
            closeModal('statusModal');
            closeModal('sure');
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
        const cookies = document.cookie.split('=');
        const authToken = cookies[1];
        try {
            let sendFeedbackResult = await axios.post('https://server.mswareg.com/sendFeedback', {
                userId,
                ideaId: itemId,
                feedbackMsg: document.getElementById('feedback-textArea').value,
            }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })
            statusModal('success', sendFeedbackResult.data.msg) 
        } catch (error) {
            statusModal('failed', error ) 
        }

    };
    document.getElementsByClassName('sendReport')[0].onclick = async () => {
        const cookies = document.cookie.split('=');
        const authToken = cookies[1];
       try {
           let sendReportResult = await axios.post('https://server.mswareg.com/sendReport', {
               userId,
               reportMsg: document.getElementById('report-textArea').value,
               ideaReport: itemId,
               reportCategorie: reportCategorie.value
           }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })
           statusModal('success', sendReportResult.data.msg) 
       } catch (error) {
           statusModal('failed', error) 
       }


    };
    
}