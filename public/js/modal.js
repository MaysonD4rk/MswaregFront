
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

    let result = await axios.get(`http://localhost:3000/findPub/${id}`);

    //var texto = reader.readAsArrayBuffer(result.data.pubData.mainIdea.data)
    

    document.getElementsByClassName('model-title')[0].innerHTML = `<h1>${result.data.pubData.title}</h1>`;
    document.getElementsByClassName('model-sub')[0].innerHTML = `<i>${result.data.pubData.ideaSummary}</i>`;
    document.getElementsByClassName('card-modal-idea')[0].innerHTML = `${result.data.pubData.mainIdea}`;

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
            
            var data = await axios.get(`http://localhost:3000/listDonates/${id}`);
            console.log(data);
            
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
            <div class="total-value-donated"> Total investido: $1000</div>
            <div class="confirm-confirm"> 
                <input type="number" placeholder="Quantia" id="amountToPay-input"> <button onclick="donate()">Ok!</button>
            </div>
        </div>
            `

                data.data.result.result[0].forEach((item)=>{
                    lista += ` 
                    <tr>
                        <td>
                            <span></span>
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
}


async function confirmPurchase(userId){

    var userId = parseInt(userId)

    var credits = parseFloat(document.getElementById('amountToPay-input').value)

    try {
        var result = await axios.post('http://localhost:3000/donateCredits', {
            userId,
            credits,
            projectId: currentProject
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



async function openModal(elementId, itemId){
    document.getElementById(elementId).style.display= "flex";
    itemId = parseInt(itemId)
    console.log(itemId)

    let result = await axios.get(`http://localhost:3000/findPub/${itemId}`);
    let title = result.data.pubData.title;
    document.getElementsByClassName('insertIdeaName')[0].innerHTML = `"${title}"`;
    document.getElementsByClassName('insertIdeaName')[1].innerHTML = `"${title}"`;
    document.getElementsByClassName('sendFeedback')[0].onclick = async ()=>{

        let sendFeedbackResult = await axios.post('http://localhost:3000/sendFeedback', {
            userId,
            ideaId: itemId,
            feedbackMsg: document.getElementById('feedback-textArea').value,
        })

        console.log(sendFeedbackResult)

    };
    document.getElementsByClassName('sendReport')[0].onclick = async () => {
       
        let sendReportResult = await axios.post('http://localhost:3000/sendReport', {
            userId,
            reportMsg: document.getElementById('report-textArea').value,
            ideaReport: itemId,
            reportCategorie: reportCategorie.value
        })
        console.log(sendReportResult)


    };
    
}