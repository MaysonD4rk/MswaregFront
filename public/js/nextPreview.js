    var url = window.location.href;
    var offset = url.slice(22);
    var sep = offset.split('?');

    var querys = [];
    var offsetArray;
    var offNum;

    var nextLocation;

    try {
        
        querys = sep[1].split('&');

        if (querys.length>1) {

            offsetArray = querys[1].split('=')
            
            offNum = offsetArray[1] == undefined || parseInt(offsetArray[1])<0 ? 0 : parseInt(offsetArray[1]);
            nextLocation = `http://18.230.25.68:8080/${sep[0]}?${querys[0]}&offset=${offNum}`

        }else{
            offsetArray = sep[1].split('=')
            offNum = offsetArray[1] == undefined || offsetArray[1]<0 ? 0 : parseInt(offsetArray[1]);

            nextLocation = `http://18.230.25.68:8080/${sep[0]}?offset=${offNum}`

        }

    } catch (error) {
        
        
    }

    
    
function nextPreview(order){

    if (order == 'next') {
        offNum += 1

        if (querys.length>1) {
            nextLocation = `http://18.230.25.68:8080/${sep[0]}?${querys[0]}&offset=${offNum}`;
        }else{
            nextLocation = `http://18.230.25.68:8080/${sep[0]}?offset=${offNum}`;
        }

        
        if (sep.length<2) {
            window.location.href = `http://18.230.25.68:8080/${sep[0]}?offset=1`;
        }else{
            window.location.href = nextLocation;
        }
    }else{
        offNum -= 1

        if (offNum < 0) {
            ++offNum
            return 

        }

        if (querys.length > 1) {
            nextLocation = `http://18.230.25.68:8080/${sep[0]}?${querys[0]}&offset=${offNum}`;
        } else {
            nextLocation = `http://18.230.25.68:8080/${sep[0]}?offset=${offNum}`;
        }
        if (sep.length < 2) {
            window.location.href = `http://18.230.25.68:8080/${sep[0]}?offset=1`;
        } else {
            window.location.href = nextLocation;
        }
    }
            
}
