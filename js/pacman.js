'use strict'
let PACMAN = '<img src="img/pacman.png" >';
let current_rotation = 0;
let lastMove = 'Right'


var gPacman;
var eatenGhostsCounter = 0;



function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    if (nextLocation.i === gPassages[3].i && nextLocation.j === gPassages[3].j) {
        nextLocation.i = gPassages[2].i
    } else if (nextLocation.i === gPassages[2].i && nextLocation.j === gPassages[2].j) {
        nextLocation.i = gPassages[3].i
    } else if (nextLocation.i === gPassages[1].i && nextLocation.j === gPassages[1].j) {
        nextLocation.j  = gPassages[0].j
    } else if (nextLocation.i === gPassages[1].i && nextLocation.j === gPassages[0].j) {
        nextLocation.j  = gPassages[1].j
    }
    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (gPacman.isSuper && nextCell === SUPERFOOD) {
        return;
    } else if (nextCell === SUPERFOOD) {
        gTime = 5000;
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;
            gTime = 1000;
            createGhosts(gBoard, eatenGhostsCounter);
            eatenGhostsCounter = 0;
        }, 5000)
    }
    if (nextCell === GHOST && gPacman.isSuper) {
        eatenGhostsCounter++;
        for (var i = 0; i < gGhosts.length; i++) {
            console.log(gGhosts)
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                gGhosts.splice(i, 1);
            }
        }
        // update the model
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
        renderCell(gPacman.location, EMPTY)
        // Move the pacman
        // update the model
        gPacman.location = nextLocation;
        gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    } else if (nextCell === GHOST) {
        renderCell(gPacman.location, EMPTY)
        gameOver()
       
        return
    }
   
    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === CHERRY) {

        updateScore(10);

    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman
    // update the model

    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    if (checkEmptyCell(gBoard)) {
        var modal = document.querySelector('.modal');
        modal.style.display = 'block'
        gameOver()
    }

    // update the DOM
    renderCell(gPacman.location, PACMAN);
}


function checkEmptyCell(board) {
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            if (board[i][j] === FOOD) {
                return false;
            }
        }
    }
    return true;
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (ev.code) {
        case 'ArrowUp':
           PACMAN = '<img src="img/FaceTop.png" >'
            nextLocation.i--
            break;
        case 'ArrowDown':
            PACMAN = '<img src="img/FaceDown.png" >'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            PACMAN = '<img src="img/FaceLeft.png" >'
            nextLocation.j--
            break;
        case 'ArrowRight':
            PACMAN = '<img src="img/pacman.png" >' 
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}