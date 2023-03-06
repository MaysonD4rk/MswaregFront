const pixKey = document.getElementById('pixKey').value

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
        document.getElementById('waitpls').innerHTML = 'qrcode está sendo gerado, por favor espere!'
        document.getElementById('modal-payment-method').style.display = 'flex'
        setTimeout(async () => {
            try {
                let qrCodeData = await axios.get(`https://pix.mswareg.com/charge/${userId}?value=${parseInt(document.getElementById('recharge').value)}`);
                
        document.getElementById('waitpls').innerHTML = ''
                document.getElementById('qrcodeArea').innerHTML = `<img src="${qrCodeData.data.imagem}" />`
                document.getElementById('qrcodeTxt').value = `${qrCodeData.data.qrCodeTxt}`
            } catch (error) {
                console.log(error)
            }
        }, 100);
    }
    
    function fastBuy(value) {
        document.getElementById('modal-payment-method').style.display = 'flex'
        document.getElementById('waitpls').innerHTML = 'qrcode está sendo gerado, por favor espere!'
         setTimeout(async () => {
            try {
                let qrCodeData = await axios.get(`https://pix.mswareg.com/charge/${userId}?value=${parseInt(value)}`);
                document.getElementById('waitpls').innerHTML = ''
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
        
        const withdrawValue = parseInt(document.getElementById('withdraw').value);
        
        if (!pixKey || pixKey == ' '){
            alert('Não é possivel retirar sem registrar uma chave pix, irei te redirecionar para que possa habilitar sua chave pix.');
            window.location.href = "http://localhost:8080/accountSettings"
            return false
        }
        
        
        
        if (currentCredits <= 0 || withdrawValue <= 0) {
            alert('você não possui saldo em sua conta ou o valor é invalido para a retirada.');
            return;
        }
        
        if (currentCredits - withdrawValue < 0) {
            alert('Você não tem saldo o suficiente para retirar.')
        }else{
            document.cookie.split(';').forEach(async cookie => {
                authToken = cookie.split('=');
                if (authToken[0] == 'authToken') {
                    try {
                        const request = await axios.post('http://localhost:8000/withdrawRequest', { userId, value: withdrawValue }, {
                            headers: {
                                'authorization': `Bearer ${authToken[1]}`
                            }
                        })
                        
                        alert('pedido de retirada realizado.')
                    } catch (error) {

                        if (error.response.data.status == 429) {
                            alert(error.response.data.msg)
                        } else {
                            alert('Algo não ocorreu como esperado. Tente novamente ou mais tarde!')
                        }

                    }
                }
            })

            
        }
    }


    function showPixKey(){
        const pixKeyText = document.getElementById('pixKeyText').style.backgroundColor
        if (pixKeyText == 'black') {
            document.getElementById('pixKeyText').style.backgroundColor = 'white'
        }else{
            document.getElementById('pixKeyText').style.backgroundColor = 'black'
        }

    }