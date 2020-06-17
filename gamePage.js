//Function to decide players turn
var grid = (function(){
    var turn = 'o'
    var count = 0
    var tie = 0
    var p1 = 0
    var p2 = 0
    function fillCell(cell) {
        count++
        if(localStorage.getItem('saved_data') === null) {
            localStorage.setItem('saved_data', '[]')
        }
        var game_data = JSON.parse(localStorage.getItem('saved_data'))
        if(turn === 'o') {
            cell.querySelector('div').setAttribute('class','far fa-circle h1 text-danger d-flex align-items-center justify-content-center m-0')
            game_data.push([cell,turn])
            turn = 'x'
        }
        else {
            cell.querySelector('div').setAttribute('class','fas fa-times display-4 text-info d-flex align-items-center justify-content-center m-0')
            game_data.push([cell,turn])
            turn = 'o'
        }
        cell.classList.remove('hover-highlight')
        if(count === 9) {
            localStorage.setItem('saved_data', '[]')
            document.getElementById('tie').textContent = ++tie
        }
    }

    return {fillCell}
})()

//grid click eventListener
document.querySelector('.grid').addEventListener('click', function(e){
    var cell = e.target
    if(cell !== '' && cell !== 'p1' && cell !== 'p2' && cell !== 'tie' && cell.firstElementChild !== null && cell.firstElementChild.classList.length === 0) {
        grid.fillCell(cell)
    }
})

//back button eventListener
document.querySelector('#back').onclick = function (){
    localStorage.setItem('continue', 'save')
    location.href = 'startPage.html'
}

window.onload = function (){
    if(localStorage.getItem('continue') === 'load') {
        //for everyelement in localStorage.getItem('saved_data') add that data to corresponding cell
    }
}