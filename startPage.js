window.onload = function(){
    if(localStorage.getItem('continue') === null){
        document.querySelector('#continue').style.display = 'none'
    }
}