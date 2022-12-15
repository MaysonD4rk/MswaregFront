var navbar = document.getElementById('navbar');





setInterval(verScroll, 150);

function verScroll(){

    if (window.scrollY >= 100) {

        navbar.classList.add("navbar-fixed-bottom");
        document.getElementsByClassName('nav-hole')[0].style.display = "block";
        document.getElementById('footer').style.display = 'block'
        try {
            createMenuSettingsButton(70, 420)
        } catch (error) {
            return true
        }

    }else{
        document.getElementsByClassName('nav-hole')[0].style.display = "none";
        document.getElementById('footer').style.display = 'none'
        navbar.classList.remove("navbar-fixed-bottom");
        try {
            createMenuSettingsButton(20,390)
        } catch (error) {
            return true
        }
    }
}