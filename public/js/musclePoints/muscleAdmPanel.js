const userId = document.getElementById('userId').value;

async function freezyToken(freezyUserId, tokenId, freezyStatus) {
    console.log('chegou aqui');
    document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
    axios.put('https://server.mswareg.com/freezyToken', {
        tokenId,
        userId,
        freezyUserId,
        freezyStatus
    }, {
        headers: {
            'authorization': `Bearer ${authToken[1]}`
        }}).then(result => {
        console.log(result)
        location.reload()
    }).catch(error => {
        console.log(error)
    })

    }
    })
}

async function extendToken(tokenId) {
document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
    axios.put('https://server.mswareg.com/extendTokenTime', {
        tokenId,
        userId
    }, {
        headers: {
            'authorization': `Bearer ${authToken[1]}`
        }
        }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
    }
    })
}

async function addToken() {
    console.log('entrou aqui pelo mesno')
    try {
        console.log('entrou aqui')
        document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
        const createToken = await axios.post('https://server.mswareg.com/musclePointsToken', {
            userId
        }, {
                headers: {
                'authorization': `Bearer ${authToken[1]}`
                }
                })
                }
            })

        location.reload()
    } catch (error) {
        console.log(error)
    }
}

async function deleteToken(tokenId){
    
    try {
document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
        const deleteToken = await axios.delete('https://server.mswareg.com/deleteToken/'+userId+'/'+tokenId, {
            userId
        }, {
                headers: {
                    'authorization': `Bearer ${authToken[1]}`
                    }
            })
        }
    })

        console.log(deleteToken)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}


function showTrash() {
    if (document.getElementsByClassName('trashIcon')[0].style.display != 'initial') {
        for (let i = 0; i < document.getElementsByClassName('trashIcon').length; i++) {
            document.getElementsByClassName('trashIcon')[i].style.display = 'initial';

        }
    } else {
        for (let i = 0; i < document.getElementsByClassName('trashIcon').length; i++) {
            document.getElementsByClassName('trashIcon')[i].style.display = 'none';

        }
    }
}


function closeModal(element){
    document.getElementById(element).style.display = 'none'
    document.getElementById('new-token-modal').style.display = 'none';
}

function openNewTokenModal(){
    document.getElementById('areUSureModal').style.display = 'flex';
    document.getElementById('new-token-modal').style.display = 'initial';
    document.getElementById('delete-token-modal').style.display = 'none';
}

function openDeleteTokenModal(tokenId){
    document.getElementById('areUSureModal').style.display = 'flex';
    document.getElementById('new-token-modal').style.display = 'none';
    document.getElementById('delete-token-modal').style.display = 'initial';
    document.getElementById('confirmDeleteToken').onclick = () =>{
        deleteToken(tokenId)
    }
}

function changeTokenValueInputActive(){
    //<input type="text" placeholder="R$" value="R$<%=tokenInfo.yourTokenPrice%>" />
    let changeTokenInput = document.createElement('input');
        changeTokenInput.type = 'text';
        changeTokenInput.placeholder = 'R$'
        changeTokenInput.id = 'changeTokenInput'
        changeTokenInput.oninput = () => { blockInvalidInput(changeTokenInput)};
        changeTokenInput.value = document.getElementById('changeTokenId').children[1].innerHTML.split(/<|R\$|\/|\s+/)[1];
    console.log(document.getElementById('changeTokenId').children[1].innerHTML.split(/<|R\$|\/|\s+/))
    let buttonConfirmChange = document.createElement('button');
        buttonConfirmChange.innerHTML = "Confirmar";
        buttonConfirmChange.onclick = ()=>{
            changeTokenPrice()
        }

        document.getElementById('changeTokenId').insertBefore(changeTokenInput, document.getElementById('changeTokenId').children[2])
        changeTokenInput.insertAdjacentElement("afterend", buttonConfirmChange)
        document.getElementById('changeTokenId').children[1].remove()
}


async function changeTokenPrice(){
    const tokenPrice = document.getElementById('changeTokenInput').value;
    try {
document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
        let update = await axios.put('https://server.mswareg.com/updateTokenPrice',{
          userId,
          tokenPrice
        }, {
            headers: {
                'authorization': `Bearer ${authToken[1]}`
            }
            })

        }
            })
        location.reload()

    } catch (error) {
        console.log(error)
    }
}


function blockInvalidInput(input) {
    // Armazena o valor atual do input
    var value = input.value;
    // Remove caracteres que não são números ou ponto (.)
    value = value.replace(/[^\d\.]/g, "");

    // Impede a entrada de '0' no início do value
    if (value.length > 0 && value.charAt(0) === "0") {
        value = value.slice(1);
    }

    // Limita o número de dígitos após o ponto a dois
    var parts = value.split(".");
    if (parts.length > 1 && parts[1].length > 2) {
        parts[1] = parts[1].substr(0, 2);
        value = parts.join(".");
    }

    // Atualiza o value do input
    input.value = value;
}


async function payBilling(){
    try {
        document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
        await axios.put('https://server.mswareg.com/payBilling',{
            userId
        }, {
            headers: {
                'authorization': `Bearer ${authToken[1]}`
                }
            })
            }
        })
        location.reload()
    } catch (error) {
        console.log(error)   
    }
}