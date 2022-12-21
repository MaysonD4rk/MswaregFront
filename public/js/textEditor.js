
    var i = 0;
    var titleInsertStatus = false;
    var boldInsertStatus= false;
    var fReader = new FileReader();
    var cardModalImg = document.getElementsByClassName('card-modal-images')[0]
    let listenerType = ''
    if (screen.availWidth < 1000) {
        listenerType = 'change'
    }else{
        listenerType = 'keypress'
    }

    const professionalInfo = [{
            DevAprendiz: 0,
            DevJunior: 0,
            DevPleno: 0,
            DevSenior: 0,
            WebDesigner: 0,
            Vr: false
        },{
            DevAprendiz: 0,
            DevJunior: 0,
            DevPleno: 0,
            DevSenior: 0,
            WebDesigner: 0,
            finalAmount: 0
        }]

    const ideaInfo = {
        title: '',
        summary: '',
        content: ''
    }

    const mainImages = []



    const inputFocus = {
        titleFocus: false,
        summaryFocus: false
    }

    let inputTitle = document.getElementById('content-title');
    let inputSummary = document.getElementsByClassName('content-summary')[0];

    inputTitle.addEventListener('focus',()=>{
        inputFocus.titleFocus = true;
        
    });
    inputTitle.addEventListener('blur', () => {
            inputFocus.titleFocus = false;
        });
        
    inputSummary.addEventListener('focus', () => {
        inputFocus.summaryFocus = true;
    })
        
    inputSummary.addEventListener('blur', () => {
                inputFocus.summaryFocus = false;
        });
    
   async function renderContent(){
        var renderField = document.getElementsByClassName('card-modal-idea')[0];
        var modelTitle = document.getElementsByClassName('model-title')[0];
        var modelSub = document.getElementsByClassName('model-sub')[0];
        
        var content = document.getElementById('content').innerHTML;
        document.getElementById('modal').style.display = "flex";
        
        console.log(content);
        
        let result = await content.replace(/&lt;|&gt;/gi, function (x) {
            switch (x) {
                case '&lt;':
                    x = '<'
                    break;
                
                case '&gt;':
                    x = '>'
                    break; 
            }
           return x;
        }); 

        console.log(result)

        modelTitle.innerHTML = `<h1>${inputTitle.value}</h1>`
        modelSub.innerHTML = `${inputSummary.value}`



        renderField.innerHTML = result;

        return result;

    }

    function teste3(height) {

        ++i

        var input = document.getElementById('inputFile');

        
        if (input.files.length < 1) {
            document.getElementsByClassName('imgInsert')[0].innerHTML = "<span style='border: none; color: red;background-color: transparent;'>não tem imagem</span>";
            setTimeout(() => {
                document.getElementsByClassName('imgInsert')[0].style.display = 'none'
                document.getElementsByClassName('imgInsert')[0].innerHTML = "inserir img";
            }, 1000);
            
        }else{
            console.log(input.files)
            var newImg = document.createElement('img');
                newImg.id = "img"+i
                newImg.height = height;
            fReader.readAsDataURL(input.files[0]);
            fReader.onloadend = function (event) {
                newImg.src = event.target.result;
                
                document.getElementById('content').appendChild(newImg);
                document.getElementsByClassName('imgInsert')[0].style.display = 'none'
            }
        }

        

    }


    function titleInsert(){
        console.log(titleInsertStatus)
        
        if (titleInsertStatus) {
            titleInsertStatus = false;
            
            var h1 = "&lt;/h1&gt;"
            var content = document.getElementById('content').innerHTML;
            console.log(content)
            var newContent = content + h1;
            console.log(newContent)

            document.getElementById('content').innerHTML = `${newContent}`;
            console.log(titleInsertStatus)
            
        }else{
            titleInsertStatus = true;
            var h1 = "&lt;h1&gt;"
            var content = document.getElementById('content').innerHTML;
            console.log(content)
            var newContent = content + h1;
            console.log(newContent)

            document.getElementById('content').innerHTML = `${newContent}`;
            console.log(titleInsertStatus)
        }


    }

    function boldInsert() {

            if (boldInsertStatus) {
                boldInsertStatus = false;

                let b = "&lt;/b&gt;"
                let content = document.getElementById('content').innerHTML;
                console.log(content)
                let newContent = content + b;
                console.log(newContent)

                document.getElementById('content').innerHTML = `${newContent}`;
                console.log(boldInsertStatus)

            }else {
                boldInsertStatus = true;
                let b = "&lt;b&gt;"
                let content = document.getElementById('content').innerHTML;
                console.log(content)
                let newContent = content + b;
                console.log(newContent)

                document.getElementById('content').innerHTML = `${newContent}`;
                console.log(boldInsertStatus)
            }


        }


    console.log()

    
    document.getElementsByClassName('inputFile-label')[0].addEventListener('click', ()=>{
        if (document.getElementById('imgHeight').value == '' || parseInt(document.getElementById('imgHeight').value)<30) {
            document.getElementsByClassName('inputFile-label')[0].attributes.for.value = ''
            document.getElementsByClassName('imgInsert')[0].style.display = 'none'
            alert('Defina o tamanho da img')
        }else{
            document.getElementsByClassName('inputFile-label')[0].attributes.for.value = 'inputFile'
            document.getElementsByClassName('imgInsert')[0].style.display = 'inline'
        }
    })

    
    

    addEventListener(listenerType,(event)=>{
        let inputTitle = document.getElementById('content-title')
        let inputSummary = document.getElementsByClassName('content-summary')[0];

        if (inputFocus.titleFocus) {
            if (inputTitle.value.length < 50) {
                document.getElementsByClassName('length-left')[0].innerHTML = (49 - inputTitle.value.length)
                ideaInfo.title = inputTitle.value;
            }else{
                let maxChar = inputTitle.value.slice(0, 49);
                 inputTitle.value = maxChar;
                 document.getElementsByClassName('length-left')[0].innerHTML = (49 - inputTitle.value.length)
                ideaInfo.title = inputTitle.value;
                 alert('max character alcançado')
            }
        }

        if (inputFocus.summaryFocus) {
            if (inputSummary.value.length < 250) {
                document.getElementsByClassName('length-left')[1].innerHTML = (249 - inputSummary.value.length)
                ideaInfo.summary = inputSummary.value;
            } else {
                let maxChar = inputSummary.value.slice(0, 249);
                inputSummary.value = maxChar;
                document.getElementsByClassName('length-left')[1].innerHTML = (249 - inputSummary.value.length)
                ideaInfo.summary = inputSummary.value;
                alert('max character alcançado')
            }
        }

       
        

    })




    function proChoise(decision, pro){
        switch (decision) {
            case 0:
            
                switch (pro) {
                    case 1:
                        if(!professionalInfo[0].DevAprendiz <= 0){

                            --professionalInfo[0].DevAprendiz
                            professionalInfo[1].DevAprendiz -= 48
                            document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `8$/h Dev Aprendiz: ${professionalInfo[0].DevAprendiz}`;
                        }
                        break;
                    case 2:
                        if(!professionalInfo[0].DevJunior <= 0){
                        --professionalInfo[0].DevJunior
                        professionalInfo[1].DevJunior -= 60
                        document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `10$/h Dev Júnior: ${professionalInfo[0].DevJunior}`;
                        }
                        break;
                    case 3:
                        if(!professionalInfo[0].DevPleno <= 0){
                        --professionalInfo[0].DevPleno
                        professionalInfo[1].DevPleno -= 120
                        document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `20$/h Dev Pleno: ${professionalInfo[0].DevPleno}`;
                        }
                        break;
                    case 4:
                        if(!professionalInfo[0].DevSenior <= 0){
                        --professionalInfo[0].DevSenior
                        professionalInfo[1].DevSenior -= 180
                        document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `30$/h Dev Sênior: ${professionalInfo[0].DevSenior}`;
                        }
                        break;
                    case 5:
                        if(!professionalInfo[0].WebDesigner <= 0){
                        --professionalInfo[0].WebDesigner
                        professionalInfo[1].WebDesigner -= 114
                        document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `19$/h Web Designer: ${professionalInfo[0].WebDesigner}`;
                        }
                        break;
                }
            
                
                break;

            case 1:

                    switch (pro) {
                        case 1:
                            ++professionalInfo[0].DevAprendiz
                            professionalInfo[1].DevAprendiz += 48
                            document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `8$/h Dev Aprendiz: ${professionalInfo[0].DevAprendiz}`;
                            break;
                        case 2:
                            ++professionalInfo[0].DevJunior
                            professionalInfo[1].DevJunior += 60

                            document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `10$/h Dev Júnior: ${professionalInfo[0].DevJunior}`;
                            break;
                        case 3:
                            ++professionalInfo[0].DevPleno
                            professionalInfo[1].DevPleno += 120

                            document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `20$/h Dev Pleno: ${professionalInfo[0].DevPleno}`;
                            break;
                        case 4:
                            ++professionalInfo[0].DevSenior
                            professionalInfo[1].DevSenior += 180

                            document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `30$/h Dev Sênior: ${professionalInfo[0].DevSenior}`;
                            break;
                        case 5:
                            ++professionalInfo[0].WebDesigner
                            professionalInfo[1].WebDesigner += 114

                            document.getElementsByClassName(`pro-${pro}`)[0].innerHTML = `19$/h Web Designer: ${professionalInfo[0].WebDesigner}`;
                            break;
                    }

                
                
            break;
            
        }

        let finalAmount = (professionalInfo[1].DevAprendiz
            +professionalInfo[1].DevJunior
            +professionalInfo[1].DevPleno
            +professionalInfo[1].DevSenior
            +professionalInfo[1].WebDesigner
            )*6;

            var percent = 0;

            if(document.getElementById('vr-check').checked){
                percent = finalAmount*20
                percent = percent/100
                finalAmount = percent+finalAmount
            }
                
                
            professionalInfo[1].finalAmount = finalAmount;
            document.getElementsByClassName('inicialAmount')[0].innerHTML = `investimento necessário<br>para inicar produção: ${finalAmount}$ por semana`;


    }


    async function loadRequiredFields(){
        document.getElementById('finish-modal').style.display = 'flex';

        ideaInfo.content = await renderContent();
        closeModal('modal');
        
    }



    async function send(){

        document.getElementById('areusure').style.display='none';

        if(ideaInfo.content.length >= 500){
            const cookies = document.cookie.split('=');
            const authToken = cookies[1];
            try {
                var pub = await axios.post('https://server.mswareg.com/pub',{
                    title: inputTitle.value, 
                    ideaSummary: inputSummary.value,
                    mainIdea: ideaInfo.content, 
                    userId, 
                    categoryId: parseInt(document.getElementById('categoryId').value),
                    initialAmountRequired: 5000,//parseFloat(professionalInfo[1].finalAmount),
                    images: mainImages,
                    allowFeedbacks: document.getElementById('allowFeedback').checked
                }, {
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })
                window.location.href = `https://mswareg.mswareg.com/addPubImg/${pub.data[0]}`;
            } catch (error) {
                console.log(error)
            }
            console.log(document.getElementById('allowFeedback').checked)
        }else{
            alert('precisa de mais conteúdo')
        }
    }

async function confirmEditIdea() {
    const pubId = parseInt(document.getElementById('pubId').value)
    document.getElementById('areusure').style.display = 'none';

    if (ideaInfo.content.length >= 500) {
        const cookies = document.cookie.split('=');
        const authToken = cookies[1];
        try {
            var pub = await axios.put('https://server.mswareg.com/pub', {
                pubId,
                title: inputTitle.value,
                ideaSummary: inputSummary.value,
                mainIdea: ideaInfo.content,
                userId,
                categoryId: parseInt(document.getElementById('categoryId').value),
                initialAmountRequired: 5000,//parseFloat(professionalInfo[1].finalAmount),
                images: mainImages,
                allowFeedbacks: document.getElementById('allowFeedback').checked
            }, {
                headers: {
                    'authorization': `Bearer ${authToken}`
                }
            })
            window.location.href = `https://mswareg.mswareg.com/addPubImg/${pubId}`;
        } catch (error) {
            console.log(error)
        }
        console.log(document.getElementById('allowFeedback').checked)
    } else {
        alert('precisa de mais conteúdo')
    }
}


var imageFile = document.getElementById('imageFile')


document.getElementById('addImageButton').addEventListener('click',()=>{
    imageFile.click()
})



imageFile.addEventListener('change', ()=>{
    
    console.log('mudou')
    
    fReader.readAsDataURL(imageFile.files[0])
    fReader.onloadend = (event)=>{
        //mainImages.forEach((item)=>{
            let newImg = document.createElement('img');
            newImg.src = event.target.result
            
        if (!(mainImages.length >= 5)) {
            mainImages.push(`${event.target.result}`);
            cardModalImg.insertBefore(newImg, cardModalImg.children[0]);

            if (mainImages.length >= 5){addImageButton.style.display = 'none'}

        }else{
            addImageButton.style.display = 'none'
            console.log('já  atingiu o máximo')
            console.log(mainImages)
        }
            //})
            
        }
        
})


setTimeout(() => {

    if(!!document.getElementsByClassName('imgAdded')){
        for (let i = 0; i < document.getElementsByClassName('imgAdded').length; i++) {
            const element = document.getElementsByClassName('imgAdded')[i];
            mainImages.push(element.src);
        }
    }
}, 100);