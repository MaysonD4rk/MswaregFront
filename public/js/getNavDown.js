var navbar = document.getElementById('navbar');





setInterval(verScroll, 150);

function verScroll(){

    if (window.scrollY >= 100) {

        createMenuSettingsButton(70, 300)
        navbar.classList.add("navbar-fixed-bottom");
        document.getElementsByClassName('nav-hole')[0].style.display = "block";
        document.getElementById('footer').style.display = 'block'

    }else{
        document.getElementsByClassName('nav-hole')[0].style.display = "none";
        document.getElementById('footer').style.display = 'none'
        navbar.classList.remove("navbar-fixed-bottom");
        createMenuSettingsButton(20,300)
    }
}