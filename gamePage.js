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
            game_data.push([cell.id,  cell.querySelector('div').classList])
            turn = 'x'
        }
        else {
            cell.querySelector('div').setAttribute('class','fas fa-times display-4 text-info d-flex align-items-center justify-content-center m-0')
            game_data.push([cell.id, cell.querySelector('div').classList])
            turn = 'o'
        }
        cell.classList.remove('hover-highlight')
        localStorage.setItem('saved_data', JSON.stringify(game_data))
        if(count === 9) {
            localStorage.setItem('saved_data', '[]')
            document.getElementById('tie').textContent = ++tie
        }
    }

    function progress() {
        return count
    }

    return {fillCell, progress}
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
    if(grid.progress() !== 9) {
        localStorage.setItem('continue', 'save')
    }
    else {
        localStorage.removeItem('continue')
    }
    location.href = 'startPage.html'
}

window.onload = function (){
    if(localStorage.getItem('continue') === 'load') {
        localStorage.setItem('continue', 'save')
        JSON.parse(localStorage.getItem('saved_data')).forEach(function(cell){
            document.querySelector('#'+ cell[0] +' > div').setAttribute('class', cell[1][0]+' '+cell[1][1]+' '+cell[1][2]+' '+cell[1][3]+' '+cell[1][4]+' '+cell[1][5]+' '+cell[1][6]+' '+cell[1][7])
        })
    }
}