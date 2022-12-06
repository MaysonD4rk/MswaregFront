const currentCredits = document.getElementById('currentCredits').value

    
    document.getElementById('recharge').addEventListener('keydown', (event) => {
        if (event.key == '.' || event.key == ',' || event.key == '-') {
            event.preventDefault()
            return
        }
        setTimeout(() => {
            const value = parseFloat(document.getElementById('recharge').value);
    
            var caringTax = parseFloat(value / 100 * 1)
            var companyTax = parseFloat(value / 100 * 0.5)
            var apiPixTax = parseFloat(value / 100 * 1)
    
            document.getElementById('automaticTax').innerHTML = `${caringTax}R$ para caridade/ações sociais - 1,00%<br>${companyTax}R$ para a empresa - 0,5%<br>${apiPixTax}R$ Pix-services-api Tax`
    
        }, 10);
    
    })
    
    document.getElementById('buyButton').onclick = () => {
        setTimeout(async () => {
            try {
                let qrCodeData = await axios.get(`https://pix.mswareg.com/charge/${userId}?value=${parseInt(document.getElementById('recharge').value)}`);
                console.log(qrCodeData);
                document.getElementById('modal-payment-method').style.display = 'flex'
                document.getElementById('qrcodeArea').innerHTML = `<img src="${qrCodeData.data.imagem}" />`
                document.getElementById('qrcodeTxt').value = `${qrCodeData.data.qrCodeTxt}`
            } catch (error) {
                console.log(error)
            }
        }, 100);
    }
    
    function fastBuy(value) {
         setTimeout(async () => {
            try {
                let qrCodeData = await axios.get(`https://pix.mswareg.com/charge/${userId}?value=${parseInt(value)}`);
                console.log(qrCodeData);
                document.getElementById('modal-payment-method').style.display = 'flex'
                document.getElementById('qrcodeArea').innerHTML = `<img src="${qrCodeData.data.imagem}" />`
                document.getElementById('qrcodeTxt').value = `${qrCodeData.data.qrCodeTxt}`
            } catch (error) {
                console.log(error)
            }
        }, 100);
    }
    
    function copyTxt() {
        var copyText = document.getElementById("qrcodeTxt");
    
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
    
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
    
        // Alert the copied text
        alert("VOCÊ COPIOU O CÓDIGO PIX: " + copyText.value);
    }

document.getElementById('withdraw').addEventListener('keydown', (event) => {
    if (event.key == '.' || event.key == ',' || event.key == '-') {
        event.preventDefault()
        return
    }
})
    

    document.getElementById('withdrawBtn').onclick = async ()=>{
        console.log(userId)
        const withdrawValue = parseInt(document.getElementById('withdraw').value);
        console.log(currentCredits - withdrawValue)
        if (currentCredits <= 0 || withdrawValue <= 0) {
            alert('você não possui saldo em sua conta ou o valor é invalido para a retirada.');
            return;
        }
        
        if (currentCredits - withdrawValue < 0) {
            alert('Você não tem saldo o suficiente para retirar.')
        }else{
            const cookies = document.cookie.split('=');
            const authToken = cookies[1];
            try {
                const request = await axios.post('https://server.mswareg.com/withdrawRequest', { userId, value: withdrawValue },
                {
                    headers:{
                        'authorization': `Bearer ${authToken}`
                    }
                })
                console.log(request)
                alert('pedido de retirada realizado.')
            } catch (error) {
                
                if(error.response.data.status == 429){
                    alert(error.response.data.msg)
                }else{
                    alert('Algo não ocorreu como esperado. Tente novamente ou mais tarde!')
                }
                
            }
        }
    }
