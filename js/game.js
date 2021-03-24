'use strict'

// • a game-over modal with a play again button should be 
// displayed.
// • When all food is collected - game done – show victorious 
// modal with a play again button
// • Ghosts should have a random color
// • Add support for power-food (4 corners of the board) 


const WALL = '<span class="wall"><i class="fas fa-building"></i></span>'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '<span class="food"><i class="fas fa-hamburger"></i></span>';
const CHERRY = '🍒';
let createCherry;

var elBtn = document.querySelector('.reset');
var elScore = document.querySelector('h2 span');
var gSuperFood;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gPassages = [];

function init() {
    gBoard = buildBoard()

    createPacman(gBoard);
    createGhosts(gBoard);
    setPasseges(gBoard)
    printMat(gBoard, '.board-container');
    cherryOnTop(gBoard);

    gGame.isOn = true;
}


function buildBoard() {
    var SIZE = 17;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {

            if ((i === 1 && j === 1) ||
                (i === SIZE - 2 && j === 1) ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPERFOOD;
            } else {
                board[i][j] = FOOD;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                ((j === 4 || j === 12) && i === 1) ||
                ((j === 4 || j === 12 || j === 2 || (j >= 6 && j <= 10) || j === 14) && (i === 2)) ||
                ((j < 3 || j === 4 || j === 6 || j === 8 || j === 10 || j === 12 || j > 13) && i === 4) ||
                ((j === 4 || j === 12) && i === 5) ||
                ((j >= 2 && j <= 4 || j >= 6 && j <= 10 || j >= 12 && j <= 14) && (i === 6 || i === 14)) ||
                ((j === 2 || j === 4 || j === 7 || j === 9 || j === 12 || j === 14) && i === 8) ||
                ((j === 2 || j === 4 || j >= 7 && j <= 9 || j === 12 || j === 14) && i === 9) ||
                ((j === 2 || j === 4 || j === 7 || j === 9 || j === 12 || j === 14) && i === 10) ||
                ((j === 2 || j === 14) && i === 13) ||
                ((j === 2 || j === 4 || j > 5 && j < 11 || j === 12 || j === 14) && i === 12)
            ) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    elScore.innerText = gGame.score;
}





function gameOver() {

    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(createCherry);
    gIntervalGhosts = null
    elBtn.style.display = 'block';

}

function cherryOnTop(board) {
    createCherry = setInterval(() => {
        var count = 0;
        var locations = [];
        for (var i = 1; i < board.length - 1; i++) {
            for (var j = 1; j < board[0].length - 1; j++) {
                if (board[i][j] !== FOOD && board[i][j] !== GHOST && board[i][j] !== PACMAN && board[i][j] !== WALL && board[i][j] !== SUPERFOOD) {
                    count++;
                    var location = { i: i, j: j }
                    locations.push(location);
                }
            }
        }
        if (count === 0) {
            return
        }

        var rand = Math.floor(Math.random() * locations.length);
        board[locations[rand].i][locations[rand].j] = CHERRY;
        renderCell(locations[rand], CHERRY);
        locations.splice(rand, 1);
    }, 4000);

}


function setPasseges(board) {
    var passages = [{
        i: Math.floor(gBoard.length / 2),
        j: 0
    }
        , {
        i: Math.floor(gBoard.length / 2),
        j: Math.floor(gBoard[0].length - 1)
    }
        , {
        i: 0,
        j: Math.floor(gBoard[0].length / 2)
    }
        , {
        i: Math.floor(gBoard.length - 1),
        j: Math.floor(gBoard[0].length / 2)
    }]
    for (var i = 0; i < passages.length; i++) {

        board[passages[i].i][passages[i].j] = '';
    }
    gPassages = passages.slice();
    return board;
}

function reset() {
    gGame.score = 0;
    elBtn.style.display = 'none';
    elScore.innerText = '0';
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    init();
}

