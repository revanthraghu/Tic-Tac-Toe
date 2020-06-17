//Function to decide players turn
var action = (function(){
    var turn = 'o'
    function fillCell(cell) {
        if(turn === 'o') {
            cell.querySelector('div').setAttribute('class','far fa-circle h1 text-danger d-flex align-items-center justify-content-center m-0')
            turn = 'x'
        }
        else {
            cell.querySelector('div').setAttribute('class','fas fa-times display-4 text-info d-flex align-items-center justify-content-center m-0')
            turn = 'o'
        }
        cell.classList.remove('hover-highlight')
    }
    return {fillCell}
})()

//grid click eventListener
document.querySelector('.grid').addEventListener('click', function(e){
    var cell = e.target
    if(cell !== '' && cell !== 'p1' && cell !== 'p2' && cell !== 'tie') {
        action.fillCell(cell)
    }
})

//back button eventListener
document.querySelector('#back').onclick = function (){
    location.href = 'startPage.html'
}