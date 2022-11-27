document.getElementById('recharge').addEventListener('keydown', (event) => {
    if (event.key == '.' || event.key == ',' || event.key == '-') {
        event.preventDefault()
        return
    }
    setTimeout(() => {
        const value = parseFloat(document.getElementById('recharge').value);

        var caringTax = parseFloat(value / 100 * 1)
        var companyTax = parseFloat(value / 100 * 0.5)

        document.getElementById('automaticTax').innerHTML = `${caringTax}R$ para caridade/ações sociais - 1,00%<br>${companyTax}R$ para a empresa - 0,5%</p>`

    }, 10);

})

document.getElementById('buyButton').onclick = async () => {

    try {
        let qrCodeData = await axios.get(`https://pix.mswareg.com/charge/${userId}?value=${parseInt(document.getElementById('recharge').value)}`);
        console.log(qrCodeData);
        document.getElementById('modal-payment-method').style.display = 'flex'
        document.getElementById('qrcodeArea').innerHTML = `<img src="${qrCodeData.data.imagem}" />`
        document.getElementById('qrcodeTxt').value = `${qrCodeData.data.qrCodeTxt}`
    } catch (error) {
        console.log(error)
    }
}

async function fastBuy(value) {
    try {
        let qrCodeData = await axios.get(`http://https://pix.mswareg.com/charge/${userId}?value=${parseInt(value)}`);
        console.log(qrCodeData);
        document.getElementById('modal-payment-method').style.display = 'flex'
        document.getElementById('qrcodeArea').innerHTML = `<img src="${qrCodeData.data.imagem}" />`
        document.getElementById('qrcodeTxt').value = `${qrCodeData.data.qrCodeTxt}`
    } catch (error) {
        console.log(error)
    }
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