window.onload = function(){
    if(localStorage.getItem('continue') === null){
        document.querySelector('#continue').style.display = 'none'
    }
}

document.getElementById('single').onclick = function () {
    location.href = 'gamePage.html'
}

document.getElementById('double').onclick = function () {
    location.href = 'gamePage.html'
}

document.getElementById('stats').onclick = function () {
    location.href = 'statsPage.html'
}