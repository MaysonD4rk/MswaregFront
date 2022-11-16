const filter = [];


function openFilterModal(){
    document.getElementsByClassName('filter')[0].style.display = 'flex';
}

function closeFilterModal() {
    document.getElementsByClassName('filter')[0].style.display = 'none';

}



function checkFilterItem(filterCategorie){
    
    event.preventDefault();

    if (filter.length <= 0) {
        document.getElementsByName(filterCategorie)[0].parentElement.style.background = 'blue'
        document.getElementsByName(filterCategorie)[0].checked = true
        filter[0] = filterCategorie;
        console.log(filter)
        return
    }

    var lastFilter = filter[0]


    if (document.getElementsByName(filterCategorie)[0].checked){
        document.getElementsByName(filterCategorie)[0].parentElement.style.background = 'rgb(173, 173, 173)';
        document.getElementsByName(filterCategorie)[0].checked = false
        if (filter.indexOf(filterCategorie) !== -1) {
            filter.splice(filter.indexOf(filterCategorie), 1);
            console.log(filter)
        }
        return
    }


    document.getElementsByName(filterCategorie)[0].parentElement.style.background = 'blue'
    document.getElementsByName(lastFilter)[0].parentElement.style.background = 'rgb(173, 173, 173)';
    document.getElementsByName(filterCategorie)[0].checked = true
    document.getElementsByName(lastFilter)[0].checked = false
    
    filter[0] = filterCategorie;
    console.log(filter)
    
    
    
    
}



function applyFilter(){
    /////SELECT LIKED BY YOU && non-liked //////////
    /////* WARNING *////// precisa de reajuste mais tarde para que apareça apenas os que foram curtido pelo user */


    if (filter[0] == 'non-filter') {
        window.location.href = `http://54.207.184.106:8080/home?offset=0`;
    }else{
        window.location.href = `http://54.207.184.106:8080/home?filter=${filter[0]}&offset=0`;
    }



}