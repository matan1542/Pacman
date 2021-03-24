'use strict'
const GHOST = '<i class="fas fa-ghost"></i>';

var gGhosts = []
var gIntervalGhosts;
var gTime = 2000;

function createGhost(board) {
    // TODO
    var randColor = getRandomColor();
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        color: randColor,
        currCellContent: FOOD
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board,length = 3) {
    //  3 ghosts and an interval
    gGhosts = [];
    for(var i = 0;i<length;i++){
        createGhost(board);
    }
    gIntervalGhosts = setInterval(moveGhosts, gTime)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }


}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j

    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        renderCell(gPacman.location, EMPTY)

        gameOver();
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color: ${ghost.color}; "> ${GHOST}</span>`
}



