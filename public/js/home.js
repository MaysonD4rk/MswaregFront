document.getElementById('home').className = "active"




for (let i = 0; i < document.getElementsByClassName('card-header').length; i++) {
    const subLength = document.getElementsByClassName('card-header')[i].firstChild.nextSibling.nextElementSibling

    if (subLength.innerHTML.length > 75) {
        subLength.innerHTML = subLength.innerHTML.slice(0, 75) + "<b>...</b>";
    }


}

