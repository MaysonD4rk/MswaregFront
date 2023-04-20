    var url = window.location.href;
    //valor precisa ser diferente na produção. deixar console.log para n ter problemas depois
    var offset = url.slice(20);
    
    var sep = offset.split('?');

    var querys = [];
    var offsetArray;
    var offNum;
    var nextLocation;

    try {
        
        querys = sep[1].split('&');
        

        if (querys.length>1) {

            offsetArray = querys[1].split('=')
            if (offsetArray[1] == 'NaN') {
                window.location.href = `http://localhost:8080/search?${querys[0]}&offset=1`
            }
            if (parseInt(offsetArray[1]) < 0) {
                window.location.href = `http://localhost:8080/search?${querys[0]}&offset=0`
            }
            
            
            offNum = offsetArray[1] == undefined || parseInt(offsetArray[1]) < 0 ? 0 : parseInt(offsetArray[1]);
            
            nextLocation = `http://localhost:8080/${sep[0]}?${querys[0]}&offset=${offNum}`

        }else{
            offsetArray = sep[1].split('=')
            offNum = offsetArray[1] == undefined || offsetArray[1]<0 ? 0 : parseInt(offsetArray[1]);

            nextLocation = `http://localhost:8080/${sep[0]}?offset=${offNum}`

        }

    } catch (error) {
        
        
    }

    
    
function nextPreview(order, search=false){
    
    if (!!search) {
        
        if (!!document.getElementById('search')) {
            
            if (document.getElementById('search').value.length <= 0) {
                
    
                if (order == 'next') {
                    offNum += 1
            
                    if (querys.length>1) {
                        nextLocation = `http://localhost:8080/${sep[0]}?${querys[0]}&offset=${offNum}`;
                    }else{
                        nextLocation = `http://localhost:8080/${sep[0]}?offset=${offNum}`;
                    }
            
                    
                    if (sep.length<2) {
                        window.location.href = `http://localhost:8080/${sep[0]}?offset=1`;
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
                        nextLocation = `http://localhost:8080/${sep[0]}?${querys[0]}&offset=${offNum}`;
                    } else {
                        nextLocation = `http://localhost:8080/${sep[0]}?offset=${offNum}`;
                    }
                    if (sep.length < 2) {
                        window.location.href = `http://localhost:8080/${sep[0]}?offset=0`;
                    } else {
                        window.location.href = nextLocation;
                    }
                }
                
            }else{
                
                //offNum = offsetArray[1] == undefined || parseInt(offsetArray[1]) < 0 || offsetArray[1] == 'NaN' ? 1 : parseInt(offsetArray[1]);
                if (order == 'next') {
                    offNum += 1
                    
                    if (!!document.getElementById('search')) {
                        if (sep[0] != 'sendMsg') {
                            location.href = `http://localhost:8080/search?ideaQuery=${document.getElementById('search').value}&offset=${offNum}`;
                        }else{
                            location.href = `http://localhost:8080/search?msgByUsernameQuery=${document.getElementById('search').value}&offset=${offNum}`;
                        }
                    } else {
                        if (sep[0] != 'sendMsg') {
                            location.href = `http://localhost:8080/search?ideaQuery=${querys[0]}&offset=${offNum}`;
                        } else {
                            location.href = `http://localhost:8080/search?msgByUsernameQuery=${querys[0]}&offset=${offNum}`;
                        }
                    }
                } else {
    
                    offNum -= 1
                    if (!!document.getElementById('search')) {
                        if (sep[0] != 'sendMsg') {
                            location.href = `http://localhost:8080/search?ideaQuery=${document.getElementById('search').value}&offset=${offNum}`;
                        } else {
                            location.href = `http://localhost:8080/search?msgByUsernameQuery=${document.getElementById('search').value}&offset=0`;
                        }
                    } else {
                        if (sep[0] != 'sendMsg') {
                            location.href = `http://localhost:8080/search?ideaQuery=${querys[0]}&offset=${offNum}`;
                        } else {
                            
                            location.href = `http://localhost:8080/search?msgByUsernameQuery=${querys[0]}&offset=${offNum}`;
                        }
                    }
                }
            }
        }else{
            if (order == 'next') {
                offNum += 1

                if (querys.length > 1) {
                    nextLocation = `http://localhost:8080/${sep[0]}?${querys[0]}&offset=${offNum}`;
                } else {
                    nextLocation = `http://localhost:8080/${sep[0]}?offset=${offNum}`;
                }


                if (sep.length < 2) {
                    window.location.href = `http://localhost:8080/${sep[0]}?offset=1`;
                } else {
                    window.location.href = nextLocation;
                }
            } else {
                offNum -= 1

                if (offNum < 0) {
                    ++offNum
                    return

                }

                if (querys.length > 1) {
                    nextLocation = `http://localhost:8080/${sep[0]}?${querys[0]}&offset=${offNum}`;
                } else {
                    nextLocation = `http://localhost:8080/${sep[0]}?offset=${offNum}`;
                }
                if (sep.length < 2) {
                    window.location.href = `http://localhost:8080/${sep[0]}?offset=0`;
                } else {
                    window.location.href = nextLocation;
                }
            }
        }
            
    }else{
        
        //offNum = offsetArray[1] == undefined || parseInt(offsetArray[1]) < 0 || offsetArray[1] == 'NaN' ? 1 : parseInt(offsetArray[1]);
        if (order == 'next') {
            offNum += 1
            currentQuery = querys[0].split('=');
            
            if (currentQuery[0] == 'msgByUsernameQuery') {
                if (!!document.getElementById('search')) {
                    location.href = `http://localhost:8080/search?msgByUsernameQuery=${currentQuery[1]}&offset=${offNum}`;
                } else {
                    location.href = `http://localhost:8080/search?${querys[0]}&offset=${offNum}`;
                }
            }else{
                if (!!document.getElementById('search')) {
                    location.href = `http://localhost:8080/search?ideaQuery=${document.getElementById('search').value}&offset=${offNum}`;
                }else{
                    location.href = `http://localhost:8080/search?${querys[0]}&offset=${offNum}`;
                }
            }
        }else{
            
            offNum -= 1
            currentQuery = querys[0].split('=');
            
            if (currentQuery[0] == 'msgByUsernameQuery') {
                if (!!document.getElementById('search')) {
                    location.href = `http://localhost:8080/search?msgByUsernameQuery=${currentQuery[1]}&offset=${offNum}`;
                } else {
                    location.href = `http://localhost:8080/search?${querys[0]}&offset=${offNum}`;
                }
            } else {
                if (!!document.getElementById('search')) {
                    location.href = `http://localhost:8080/search?ideaQuery=${document.getElementById('search').value}&offset=${offNum}`;
                } else {
                    location.href = `http://localhost:8080/search?${querys[0]}&offset=${offNum}`;
                }
            }
        }
    }
    
            
}

