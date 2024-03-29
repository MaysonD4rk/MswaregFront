const asksArrayInitialState = document.getElementsByClassName('asks')[0].innerHTML;



document.getElementById('search').addEventListener('focus', () => {
    document.getElementsByTagName('button')[0].style.color = "rgba(0, 0, 0, 1)"
})
document.getElementById('search').addEventListener('blur', () => {
    document.getElementsByTagName('button')[0].style.color = "rgba(0, 0, 0, 0)"
})

document.getElementById('sendMsg').className = "active"


document.getElementById('search').addEventListener('keydown', (event) => {
    
    if (!(event.keyCode >= 9 && event.keyCode <= 45)) {
        searchMsg();
    } else {
        return
    }

})







let textTo = document.getElementById('textTo')
let userList = document.getElementById('searchUserList')

let modalUserList = document.getElementById('searchModalUsers');
let arrayUserList = []

textTo.addEventListener('keydown', (event) => {

    // 

    if (textTo.value.length > 0) {
        modalUserList.style.display = 'block'
    } else {
        modalUserList.style.display = 'none'
    }

    axios.get('https://server.mswareg.com/searchUser/' + document.getElementById('textTo').value)
        .then((res) => {

            res.data.result.row.forEach(element => {
                arrayUserList.push(element.username)
                userList.innerHTML = ''
            })


            arrayUserList.splice(0, (arrayUserList.length - res.data.result.row.length))

            arrayUserList.forEach(element => {
                let usernameLi = document.createElement('li');

                usernameLi.innerHTML = element
                usernameLi.onclick = () => {
                    textTo.value = element
                    userList.innerHTML = ''
                }

                userList.appendChild(usernameLi)
            })


        })
        .catch(err => {
            userList.innerHTML = ''
        })


})



function searchMsg() {

    document.getElementById('search').value
    document.getElementsByClassName('asks')[0].innerHTML = ''

    if (document.getElementById('search').value.length < 1) {
        document.getElementsByClassName('asks')[0].innerHTML = asksArrayInitialState;
    }


    axios.get('https://server.mswareg.com/searchMsgList/0/' + document.getElementById('search').value)
        .then(msgs => {

            msgs.data.result.row.forEach(element => {


                let askItem = document.createElement('div');
                askItem.classList.add('ask-item')
                let h3 = document.createElement('h3')
                let askItemImg = document.createElement('div')
                askItemImg.classList.add('ask-item-img')
                askItemImg.style.backgroundImage = `url(${element.profilePhoto})`


                let askItemInfo = document.createElement('div');
                askItemInfo.classList.add('ask-item-info')

                let div1 = document.createElement('div');
                let div1h3 = document.createElement('h3')
                div1h3.innerHTML = "from: @" + element.username
                let div2 = document.createElement('div');
                let div2h3 = document.createElement('h3')
                div2h3.innerHTML = "to: @" + element.recipientName
                let askText = document.createElement('div')
                askText.innerHTML = element.msg
                askText.classList.add('ask-text')

                askItem.appendChild(askItemImg)
                askItem.appendChild(askItemInfo)
                askItemInfo.appendChild(div1)
                div1.appendChild(div1h3)
                askItemInfo.appendChild(div2)
                div2.appendChild(div2h3)
                askItemInfo.appendChild(askText)
                document.getElementsByClassName('asks')[0].appendChild(askItem)
                


            });

        })
        .catch(error => {
            return error
        })

}



async function writeMsg(senter) {
    let recipient = document.getElementById('textTo').value;
    senter = parseInt(senter);
    
    let msg = document.getElementById('msg').value
    document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {

            try {
                let tryWrite = await axios.post('https://server.mswareg.com/writeMsg', { userId: senter, recipientName: recipient, msg }, {
                    headers: {
                        'authorization': `Bearer ${authToken[1]}`
                    }
                })
                document.getElementsByClassName('statusModal')[0].style.display = 'flex';
                document.getElementsByClassName('statusModal')[0].firstChild.nextElementSibling.className = 'success';
                document.getElementsByClassName('statusModal')[0].firstChild.nextElementSibling.innerHTML = tryWrite.data.msg;
                
        
                setTimeout(() => {
                    document.getElementsByClassName('statusModal')[0].style.display = 'none';
        
                }, 500);
            } catch (error) {
                document.getElementsByClassName('statusModal')[0].style.display = 'flex';
                document.getElementsByClassName('statusModal')[0].firstChild.nextElementSibling.className = 'failed';
                document.getElementsByClassName('statusModal')[0].firstChild.nextElementSibling.innerHTML = 'usuário não encontrado, tome cuidado!';
                setTimeout(() => {
                    document.getElementsByClassName('statusModal')[0].style.display = 'none';
                    
                }, 500);
            }

        }
    })


}

if (!!document.getElementById('nextButton') && !!document.getElementById('previewButton')) {
    document.getElementById('nextButton').onclick = () => {
        nextPreview('next', true)
    }
    document.getElementById('previewButton').onclick = () => {
        nextPreview('preview', true)
    }
}