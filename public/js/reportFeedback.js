// REPORT FEEDBACK SCRIPTS

let currentPage;
let previewPage;

function selectAction(action) {
    currentPage = action + '1';
    previewPage = 'selectAction'


    console.log(currentPage)
    document.getElementById('select-action').style.display = 'none';

    if (action == 'feedback') {
        document.getElementById('pages').style.display = 'flex';
        document.getElementById('report-page').style.display = 'none'
        document.getElementById('feedback-page').style.display = 'flex'
        document.getElementsByClassName('fa-arrow-left')[0].style.display = 'initial'
    } else {
        document.getElementById('pages').style.display = 'flex';
        document.getElementById('report-page').style.display = 'flex'
        document.getElementById('report-option').style.display = 'flex'
        document.getElementById('feedback-page').style.display = 'none'
        document.getElementsByClassName('fa-arrow-left')[0].style.display = 'initial'

    }
}

function selectReportCategorie(categorie) {

    previewPage = 'report1'

    document.getElementById('reportCategorie').value = categorie;

    document.getElementById('report-option').style.display = 'none'
    document.getElementById('report-form').style.display = 'flex'
    document.getElementsByClassName('fa-arrow-left')[0].style.display = 'initial'

}

function getPreviewPage() {

    console.log(previewPage)

    switch (previewPage) {
        case 'selectAction':
            document.getElementById('pages').style.display = 'none';
            document.getElementById('select-action').style.display = 'flex';
            document.getElementsByClassName('fa-arrow-left')[0].style.display = 'none'
            break;
        case 'report1':
            document.getElementsByClassName('fa-arrow-left')[0].style.display = 'initial'
            document.getElementById('pages').style.display = 'flex';
            document.getElementById('report-page').style.display = 'flex'
            document.getElementById('report-option').style.display = 'flex'
            document.getElementById('feedback-page').style.display = 'none'
            document.getElementById('report-form').style.display = 'none';
            previewPage = 'selectAction'

            break;
        default:
            break;
    }

}




