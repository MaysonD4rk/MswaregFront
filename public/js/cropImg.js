//let img = document.getElementById('imagem');
const cropImg = document.getElementById('cropImg')
const photoPreview = document.getElementById('photoPreview')
var flagMove = false;
let photoFile = document.getElementById('photoFile')
let confirmCrop = document.getElementById('confirmCrop');
const userId = parseInt(document.getElementById('userId').value)


let usernameInput;
let refOfPubId;
if (document.getElementById('pubIdeaId')) {
    refOfPubId = document.getElementById('pubIdeaId').value
}else{
    console.log('n existe pubIdea');
}

if (document.getElementById('usname')) {
    usernameInput = document.getElementById('usname').value
} else {
    console.log('n existe usernameInput');
}


const username = usernameInput;
const pubIdeaId = parseInt(refOfPubId);
let currentFormat;
let cropped = false;

var imgRestored = {
    url:'',
    width: 0,
    height: 0,
}


document.getElementById('buttonPhotoFile').onclick = () =>{
    photoFile.click();
}


window.addEventListener('DOMContentLoaded', () => {
    photoFile.addEventListener('change', () => {
        let file = photoFile.files.item(0)
        photoName = file.name;

        console.log(photoFile.files[0])

        Object.keys(photoFile.files[0]).forEach(eventname=>{
            console.log(eventname)
        })
        
        

        // ler um arquivo
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (event) {
            img = new Image();
            //img.height = 380;
            //img.width = 380;
            imgRestored.url = event.target.result
            img.src = event.target.result
            
            img.onload = onLoadImage
        }
    })
})



let actualX, actualY, croppedWidth, croppedHeight;



const events = {
    mouseover() { console.log(currentFormat) },
    mousedown() {
        
        if (!cropped) {
            
            if (currentFormat == 'idea') {
                actualX = (event.offsetX - 150)
                actualY = (event.offsetY - 200)
                croppedWidth = 300
                croppedHeight = 400
            }else{
                actualX = (event.offsetX - 97.5)
                actualY = (event.offsetY - 97.5)
                croppedWidth = 195
                croppedHeight = 195
            }
    
            console.log(`actualX: ${actualX}, actualY: ${actualY}, croppedWidth: ${croppedWidth}, croppedHeight${croppedHeight}`)
    
            
            flagMove = true;
            
            flagMove = true;
            if (flagMove) {
                
                //document.getElementsByClassName('circle-crop')[0].style.top = (event.clientY - 100) + "px";
                //document.getElementsByClassName('circle-crop')[0].style.left = (event.clientX - 100) + "px";
                
                if (currentFormat == 'profile') {
                    for (let i = 0; i < document.getElementsByClassName('circle').length; i++) {
                        document.getElementsByClassName('circle')[i].style.display = 'inline-block'
            
                    }
                    for (let i = 0; i < document.getElementsByClassName('square').length; i++) {
                        document.getElementsByClassName('square')[i].style.display = 'none'

                    }
                    document.getElementById('topCircle').style.top = (event.clientY - 96) + "px";
                    document.getElementById('rightCircle').style.left = (event.clientX + 67) + "px";
                    document.getElementById('leftCircle').style.left = (event.clientX - 100) + "px";
                    document.getElementById('bottomCircle').style.top = (event.clientY + 75) + "px";
    
                    document.getElementById('topCircle').style.left = (event.clientX - 75) + "px";
                    document.getElementById('rightCircle').style.top = (event.clientY - 67) + "px";
                    document.getElementById('leftCircle').style.top = (event.clientY - 67) + "px";
                    document.getElementById('bottomCircle').style.left = (event.clientX - 75) + "px";
                } else {
                    for (let i = 0; i < document.getElementsByClassName('square').length; i++) {
                        document.getElementsByClassName('square')[i].style.display = 'inline-block'
    
                    }
                    for (let i = 0; i < document.getElementsByClassName('circle').length; i++) {
                        document.getElementsByClassName('circle')[i].style.display = 'none'

                    }
                    document.getElementById('topSquare').style.top = (event.clientY - 220.5) + "px";
                    document.getElementById('rightSquare').style.left = (event.clientX + 140) + "px";
                    document.getElementById('leftSquare').style.left = (event.clientX - 187) + "px";
                    document.getElementById('bottomSquare').style.top = (event.clientY + 150) + "px";
    
                    document.getElementById('topSquare').style.left = (event.clientX - 150) + "px";
                    document.getElementById('rightSquare').style.top = (event.clientY - 205) + "px";
                    document.getElementById('leftSquare').style.top = (event.clientY - 198) + "px";
                    document.getElementById('bottomSquare').style.left = (event.clientX - 158) + "px";
                }
    
                    
            
                }
        }
            
        },
        mousemove() {

            if (!cropped) {
            
            if (flagMove) {

                if (currentFormat == 'profile') {
                    document.getElementById('topCircle').style.top = (event.clientY - 96) + "px";
                    document.getElementById('rightCircle').style.left = (event.clientX + 67) + "px";
                    document.getElementById('leftCircle').style.left = (event.clientX - 100) + "px";
                    document.getElementById('bottomCircle').style.top = (event.clientY+75) + "px";

                    document.getElementById('topCircle').style.left = (event.clientX - 75) + "px";
                    document.getElementById('rightCircle').style.top = (event.clientY - 67) + "px";
                    document.getElementById('leftCircle').style.top = (event.clientY - 67) + "px";
                    document.getElementById('bottomCircle').style.left = (event.clientX - 75) + "px";
                } else {
                    document.getElementById('topSquare').style.top = (event.clientY - 220.5) + "px";
                    document.getElementById('rightSquare').style.left = (event.clientX + 140) + "px";
                    document.getElementById('leftSquare').style.left = (event.clientX - 187) + "px";
                    document.getElementById('bottomSquare').style.top = (event.clientY + 150) + "px";

                    document.getElementById('topSquare').style.left = (event.clientX - 150) + "px";
                    document.getElementById('rightSquare').style.top = (event.clientY - 205) + "px";
                    document.getElementById('leftSquare').style.top = (event.clientY - 198) + "px";
                    document.getElementById('bottomSquare').style.left = (event.clientX - 158) + "px";
                }
            }
        }
            
            
        },
        mouseup() {

            if (!cropped) {
            flagMove = false;
            console.table(['clientY: ', event.clientY, "clientX: ", event.clientX, 'offsetY: ', event.offsetY, "offsetX: ", event.offsetX])
            if (currentFormat == 'idea') {
                actualX = (event.offsetX - 150)
                actualY = (event.offsetY - 200)
                croppedWidth = 300
                croppedHeight = 400
            } else {
                actualX = (event.offsetX - 97.5)
                actualY = (event.offsetY - 97.5)
                croppedWidth = 195
                croppedHeight = 195
            }
            document.getElementById('cropButton').style.display = 'block'

        }
    
    }
}


// Object.keys(events).forEach(eventName=>{
//     console.log(eventName)
//     cropImg.addEventListener(eventName, events[eventName])
// })


let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d')
let preCanvasW, preCanvasH;
let zoomGave = 0;

function onLoadImage(event, initialW=380) {
    const { width, height } = img
    
    imgRestored.height = img.height;
    imgRestored.width = img.width;
    

    

    if (currentFormat == 'idea') {
        initialW = 600 + (50*zoomGave)
     }else{
        initialW = initialW + (50*zoomGave)
     }

     

    console.log(event)
    console.log(initialW)

    preCanvasW = width;
    preCanvasH = height;

    console.log(preCanvasW, preCanvasH)


    
    // limpar o contexto
    ctx.clearRect(0, 0, width, height)
    //ctx.drawImage(img, 0, 0, 380, (380 / (preCanvasW / preCanvasH)))
    // desenhar a imagem no contexto
    //photoPreview.src = canvas.toDataURL()
    
    if ((preCanvasW / preCanvasH) >= 1.62337662 && (preCanvasW / preCanvasH) <= 1.8 ) {
        console.log('16:9')
        canvas.width = initialW;
        canvas.height = initialW / (preCanvasW / preCanvasH)
        ctx.drawImage(img, 0, 0, initialW, (initialW / (preCanvasW / preCanvasH)))
        photoPreview.height = canvas.height
        photoPreview.width = canvas.width
        img.height = canvas.height
        img.width = canvas.width
        cropImg.style.height = canvas.height + "px"
        cropImg.style.width = canvas.width + "px"
        photoPreview.src = canvas.toDataURL()
        

    } else if ((preCanvasW / preCanvasH) >= 0.5624297 && (preCanvasW / preCanvasH) <= 0.7) {
        console.log('9:16')
        canvas.width = initialW;
        canvas.height = (initialW+( initialW*(preCanvasW / preCanvasH) ))
        ctx.drawImage(img, 0, 0, initialW, (initialW+(initialW*(preCanvasW/preCanvasH))))
        
        console.log(canvas.height)
        photoPreview.height = canvas.height
        photoPreview.width = canvas.width
        img.height = canvas.height
        img.width = canvas.width
        cropImg.style.height = canvas.height + "px"
        cropImg.style.width = canvas.width + "px"

        photoPreview.src = canvas.toDataURL()
        
    } else if ((preCanvasW / preCanvasH) >= 1.3 && (preCanvasW / preCanvasH) <= 1.5){
        console.log('4:3')
        canvas.width = initialW;
        canvas.height = initialW / (preCanvasW / preCanvasH)
        ctx.drawImage(img, 0, 0, initialW, (initialW / (preCanvasW / preCanvasH)))
        console.log(canvas.height)
        photoPreview.height = canvas.height
        photoPreview.width = canvas.width
        img.height = canvas.height
        img.width = canvas.width
        cropImg.style.height = canvas.height + "px"
        cropImg.style.width = canvas.width + "px"

        photoPreview.src = canvas.toDataURL()
        
    } else if ((preCanvasW / preCanvasH) >= 2.3 && (preCanvasW / preCanvasH) <= 3){
        console.log('21:9')
        canvas.width = initialW;
        canvas.height = initialW / (preCanvasW / preCanvasH)
        console.log(canvas.height)
        ctx.drawImage(img, 0, 0, initialW, (initialW / (preCanvasW / preCanvasH)))

        photoPreview.height = canvas.height
        photoPreview.width = canvas.width
        img.height = canvas.height
        img.width = canvas.width

        cropImg.style.height = canvas.height + "px"
        cropImg.style.width = canvas.width + "px"

        photoPreview.src = canvas.toDataURL()

    }
    
    //photoPreview.height = canvas.height
    //photoPreview.width = canvas.width
    //photoPreview.src = canvas.toDataURL()
    photoPreview.draggable = false
    console.log(photoPreview)
    console.log(canvas)
    

    
}
//onLoadImage()



function croppingImg(){
    console.log('chegou aqui')
    const croppedImage = ctx.getImageData(actualX,actualY, croppedWidth, croppedHeight)
    
    ctx.clearRect(0, 0, ctx.width, ctx.height)
    img.width = canvas.width = croppedWidth;
    img.height = canvas.height = croppedHeight;
    ctx.putImageData(croppedImage, 0, 0)

    console.log(canvas.toDataURL())

    cropImg.style.height = (croppedHeight)+'px'
    cropImg.style.width = (croppedWidth) + 'px'
    if (currentFormat == 'profile') {
        cropImg.style.borderRadius = '50%'
        photoPreview.style.borderRadius = '50%'
    }else{
        photoPreview.style.borderRadius = '10px'
        cropImg.style.borderRadius = '10px'
    }
    photoPreview.src = canvas.toDataURL()
    photoPreview.height = croppedHeight
    photoPreview.width = croppedWidth

    for (let i = 0; i < document.getElementsByClassName('circle').length; i++) {
        document.getElementsByClassName('circle')[i].style.display = 'none'
        
    }

    for (let i = 0; i < document.getElementsByClassName('square').length; i++) {
        document.getElementsByClassName('square')[i].style.display = 'none'
        
    }

    cropButton.style.display = 'none'
    confirmCrop.style.display = 'flex'
    document.getElementById('zooms').style.display = 'none'
    
    cropped = true;
    
    
    console.log(photoPreview)
}


// document.getElementsByTagName('body')[0].addEventListener("keydown", (event) => {
//     if(event.key == 'j'){
//         croppingImg()
//     }else{
//         console.log('deu nada')
//     }
//     // do something
// });


document.getElementsByTagName('body')[0].addEventListener('mousedown', (event)=>{
    console.log('x' + event.clientX + 'y' + event.clientY)
    
})
// document.getElementsByTagName('body')[0].addEventListener('mouseup', events.mouseup)
// document.getElementsByTagName('body')[0].addEventListener('mousemove', events.mousemove)

cropImg.addEventListener('mouseover', events.mouseover)
cropImg.addEventListener('mousedown', events.mousedown)
cropImg.addEventListener('mouseup', events.mouseup)
cropImg.addEventListener('mousemove', events.mousemove)






console.log(document.getElementById('topCircle').width)








function zoom(action){

    
    if (action === "+") {
    
        // img.width = (img.width + 50)
        // img.height = ((img.width+50)/((img.width+50) / (img.height+50)))
        // canvas.width = (img.width + 50)
        // canvas.height = ((img.width + 50) / ((img.width + 50) / (img.height + 50)))
        // photoPreview.width = (img.width + 50)
        // photoPreview.height = ((img.width + 50) / ((img.width + 50) / (img.height + 50)))
        // cropImg.style.width = (img.width + 50)+"px"
        // cropImg.style.height = ((img.width + 50) / ((img.width + 50) / (img.height + 50)))+"px"
        ++zoomGave
        onLoadImage(null, (img.width+50))
    }else{
        // img.width = (img.width - 50)
        // img.height = ((img.width - 50) / ((img.width - 50) / (img.height - 50)))
        // canvas.width = (img.width - 50)
        // canvas.height = ((img.width - 50) / ((img.width - 50) / (img.height - 50)))
        // photoPreview.width = (img.width - 50)
        // photoPreview.height = ((img.width - 50) / ((img.width - 50) / (img.height - 50)))
        // cropImg.style.width = (img.width - 50) + "px"
        // cropImg.style.height = ((img.width - 50) / ((img.width - 50) / (img.height - 50))) + "px"
        if (zoomGave > 0) {
            --zoomGave
            console.log(zoomGave)
        }else{
            return
        }

        onLoadImage(null, (img.width - 50))
    }
    


}



async function confirmCropFunction(action){

    if (action == "no") {
        if (currentFormat == 'idea') {
            for (let i = 0; i < document.getElementsByClassName('square').length; i++) {
                document.getElementsByClassName('square')[i].style.display = 'initial'
    
            }
        }else{
            for (let i = 0; i < document.getElementsByClassName('circle').length; i++) {
                document.getElementsByClassName('circle')[i].style.display = 'initial'

            }
        }

        cropImg.style.borderRadius = '0'
        photoPreview.style.borderRadius = '0'
        document.getElementById('zooms').style.display = 'flex'
        document.getElementById('confirmCrop').style.display = 'none'
        cropped = false;
        img.src = imgRestored.url
        img.height = imgRestored.height
        img.width = imgRestored.width
    
        
        img.onload = onLoadImage
        console.log(imgRestored)

    }else{
        if (currentFormat == 'profile') {
        
            try {
                var resposta = await axios.put('http://localhost:3000/updatePhotoProfile',{
                    userId,
                    profileUrl: canvas.toDataURL()
                })
                if(resposta.status == 200){
                    window.location.href = `/profile/${username}`
                }
                
            } catch (error) {
                console.log(error)
            }

            
        }else{
            try {
                var resposta = await axios.put('http://localhost:3000/updateIdeaPhoto', {
                    userId,
                    pubIdeaId,
                    imgUrl: canvas.toDataURL()
                })

                if (resposta.status == 200) {
                    window.location.href = `/home`
                }
                
            } catch (error) {
                console.log(error)
            }

            console.log(resposta)
        }
    }

}