//Function to find if game won
function gameWon() {
    if(grid.filledCount() > 2) {
        if(document.querySelector('#top-start').getAttribute('name') === document.querySelector('#top-middle').getAttribute('name') && document.querySelector('#top-start').getAttribute('name') === document.querySelector('#top-end').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#center-start').getAttribute('name') === document.querySelector('#center-middle').getAttribute('name') && document.querySelector('#center-start').getAttribute('name') === document.querySelector('#center-end').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#bottom-start').getAttribute('name') === document.querySelector('#bottom-middle').getAttribute('name') && document.querySelector('#bottom-start').getAttribute('name') === document.querySelector('#bottom-end').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#top-start').getAttribute('name') === document.querySelector('#center-start').getAttribute('name') && document.querySelector('#top-start').getAttribute('name') === document.querySelector('#bottom-start').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#top-middle').getAttribute('name') === document.querySelector('#center-middle').getAttribute('name') && document.querySelector('#top-middle').getAttribute('name') === document.querySelector('#bottom-middle').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#top-end').getAttribute('name') === document.querySelector('#center-end').getAttribute('name') && document.querySelector('#top-end').getAttribute('name') === document.querySelector('#bottom-end').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#top-start').getAttribute('name') === document.querySelector('#center-middle').getAttribute('name') && document.querySelector('#top-start').getAttribute('name') === document.querySelector('#bottom-end').getAttribute('name')) {
            return true
        }
        else if(document.querySelector('#bottom-start').getAttribute('name') === document.querySelector('#center-middle').getAttribute('name') && document.querySelector('#bottom-start').getAttribute('name') === document.querySelector('#top-end').getAttribute('name')) {
            return true
        }
        else {
            return false
        }
    } 
    else {
        return false
    }
}


//Function to manipulate grid and give info about games played
var grid = (function(){
    var turn = 'o'
    var count = 0
    var tie = 0
    var p1 = 0
    var p2 = 0

    //fills the clicked cell with x or o
    function fillCell(cell) {
        if(localStorage.getItem('saved_data') === null) {
            localStorage.setItem('saved_data', '[]')
            var game_data = JSON.parse(localStorage.getItem('saved_data'))
        }
        else {
            var game_data = JSON.parse(localStorage.getItem('saved_data'))
            count = game_data.length
        }
        count++
        if(turn === 'o') {
            cell.setAttribute('name', turn)
            cell.querySelector('div').setAttribute('class','far fa-circle h1 text-danger d-flex align-items-center justify-content-center m-0')
            game_data.push([cell.id,  cell.querySelector('div').classList])
            turn = 'x'
        }
        else {
            cell.setAttribute('name', turn)
            cell.querySelector('div').setAttribute('class','fas fa-times display-4 text-info d-flex align-items-center justify-content-center m-0')
            game_data.push([cell.id, cell.querySelector('div').classList])
            turn = 'o'
        }
        cell.classList.remove('hover-highlight')
        localStorage.setItem('saved_data', JSON.stringify(game_data))

        //if all cells filled and game not won then updates tie count
        if(count === 9 && !gameWon()) {
            document.getElementById('tie').textContent = ++tie
        }

        //if game won then updates players win count//
        else if(gameWon()) {
            if(turn === 'x') {
                document.getElementById('p1').textContent = ++p1
            }
            else if(turn === 'o') {
                document.getElementById('p2').textContent = ++p2
            }
        }
    }
    
    //return current count of filled cells
    function filledCount() {
        return count
    }

    //return current count of ties
    function ties() {
        return tie
    }
    //set tie count
    function setTies(tie_count) {
        tie = tie_count
    }

    //return current count of p1 wins
    function p1s() {
        return p1
    }

    //set p1 count
    function setP1s(p1_count) {
        p1 = p1_count
    }

    //return current count of p2 wins
    function p2s() {
        return p2
    }

    //set p2 count
    function setP2s(p2_count) {
        p2 = p2_count
    }

    //resets the grid, saved_data and count
    function reset() {
        JSON.parse(localStorage.getItem('saved_data')).forEach(function(cell, index){
            document.querySelector('#' + cell[0]).classList.add('hover-highlight')
            document.querySelector('#' + cell[0]).setAttribute('name', index)
            document.querySelector('#'+ cell[0] +' > div').removeAttribute('class')
        })
        localStorage.setItem('saved_data', '[]')
        count = 0
        turn = 'o'
    }

    return {fillCell, filledCount, reset, ties, p1s, p2s, setTies, setP1s, setP2s}
})()

//grid click eventListener
document.querySelector('.grid').addEventListener('click', function(e){
    var cell = e.target
    if(cell !== '' && cell !== 'p1' && cell !== 'p2' && cell !== 'tie' && cell.firstElementChild !== null && cell.firstElementChild.classList.length === 0 && !gameWon()) {
        grid.fillCell(cell)
    }
    else if(grid.filledCount() === 9 || gameWon()) {
        grid.reset()
    }
})

//back button eventListener
document.querySelector('#back').onclick = function (){
    if(grid.filledCount() !== 9 && !gameWon()) {
        localStorage.setItem('continue', 'save')
        localStorage.setItem('tie', grid.ties())
        localStorage.setItem('p1', grid.p1s())
        localStorage.setItem('p2', grid.p2s())
    }
    else {
        localStorage.removeItem('continue')
    }
    location.href = 'startPage.html'
}

//on webpage load if a previous game was ongoing then refill grid
window.onload = function (){
    if(localStorage.getItem('continue') === 'load') {

        //change continue key value to save
        localStorage.setItem('continue', 'save')

        //set tie count
        var tie = localStorage.getItem('tie')
        document.getElementById('tie').textContent = tie
        grid.setTies(Number(tie))

        //set p1 count
        var p1 = localStorage.getItem('p1')
        document.getElementById('p1').textContent = p1
        grid.setP1s(Number(p1))

        //set p2 count
        var p2 = localStorage.getItem('p2')
        document.getElementById('p2').textContent = p2
        grid.setP2s(Number(p2))

        //go through each saved cell data and refill the grid
        JSON.parse(localStorage.getItem('saved_data')).forEach(function(cell){
            document.querySelector('#'+ cell[0]).classList.remove('hover-highlight')

            //set names to previously entered cell based on x or o
            if(cell[1][1] === 'fa-circle') {
                document.querySelector('#' + cell[0]).setAttribute('name', 'o')
            }
            else if(cell[1][1] === 'fa-times') {
                document.querySelector('#' + cell[0]).setAttribute('name', 'x')
            }
            //set class name to show font awesome icon
            document.querySelector('#'+ cell[0] +' > div').setAttribute('class', cell[1][0]+' '+cell[1][1]+' '+cell[1][2]+' '+cell[1][3]+' '+cell[1][4]+' '+cell[1][5]+' '+cell[1][6]+' '+cell[1][7])
        })
    }
}