const electron = require('electron');

// Global veriables
let gamestate = []; // The gamestate is used for stroing
let turn; // The turn starts at 0
let players = ["x", "o"];
let scores;

// Helper functions:
function reset() { // Resets everything
    // Resets the variables
    resetBoardAndGamestate();
    scores = {
        x: 0,
        o: 0
    };
    UpdateScores(scores);
}

function resetBoardAndGamestate() { // Resets the board and gamestate
    gamestate = [];
    for (let i = 0; i < 9; i++) { // Makes the gamestate a 2d array to match the tiles array
        gamestate.push([]);
        for (let j = 0; j < 11; j++) {
            gamestate[i].push(" ");
        }
    }
    turn = 0;
    let tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) { // Resets the tiles so that they no longer have player icons on them ( o and x )
        tiles[i].style.backgroundImage = "url('../../assets/img/Blank.svg')";
    }
}

function findIndexOfTile(tileID) {
    // Finds the index of the tile using the tile id atribute goes from tile1, tile2 ... tile99
    // And returns it as an object with an x and an y atribute
    let indexes = {
        x: 0,
        y: 0
    };
    let yString = tileID.slice(8, (tileID.length - 1));
    indexes.x = parseInt(yString, 10);
    console.log(`X cordinate of tile: ${indexes.x}`);
    // Find the y component
    for (let i = 0; i < (gamestate.length - 1); i++) {
        if (gamestate[(i + 1)][indexes.x] == " ") {
            indexes.y = (i + 1);
        }
    }
    console.table(indexes)
    //return indexes;
    return indexes;
}

function UpdateScores(scores) {
    // Updates the score board
    let scoreVeiw = document.getElementById("scoreVeiw");
    scoreVeiw.innerText = `${scores.x} - ${scores.o}`
}

function CheckWin(gamestate, player) {
    // Loops though the hole gamestate and Checks if a player won
    for (let i = 0; i < gamestate.length; i++) {
        // Checks every horizontal posibility
        for (let j = 0; j < (gamestate[i].length - 3); j++) {
            if (gamestate[i][j] == player && gamestate[i][j + 1] == player && gamestate[i][j + 2] == player && gamestate[i][j + 3] == player) {
                return true;
            }
        }
    }
    for (let i = 0; i < (gamestate.length - 3); i++) {
        // Checks ever vertical posibility
        for (let j = 0; j < gamestate[i].length; j++) {
            if (gamestate[i][j] == player && gamestate[i + 1][j] == player && gamestate[i + 2][j] == player && gamestate[i + 3][j] == player) {
                return true;
            }
        }
    }
    for (let i = 0; i < (gamestate.length - 3); i++) {
        // Checks for slanted win conditions (the first way from right to left)
        for (let j = 0; j < (gamestate[i].length - 3); j++) {
            if (gamestate[i][j] == player && gamestate[i + 1][j + 1] == player && gamestate[i + 2][j + 2] == player && gamestate[i + 3][j + 3] == player) {
                return true;
            }
        }
    }
    for (let i = 0; i < (gamestate.length - 3); i++) {
        // Checks for slanted win conditions (the other way from right to left)
        for (let j = 3; j < (gamestate[i].length); j++) {
            if (gamestate[i][j] == player && gamestate[i + 1][j - 1] == player && gamestate[i + 2][j - 2] == player && gamestate[i + 3][j - 3] == player) {
                return true;
            }
        }
    }
    return false;
}

// Adds the event listeneres for the tiles on the board
let tiles = document.getElementsByClassName('tile');
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', (event) => {
        // Finds the indexes of the tile
        let indexes = findIndexOfTile(event.target.id);
        // Update the gamestate
        gamestate[indexes.y][indexes.x] = players[(turn % 2)];
        //  Update the cell and set its image equal to the current player
        let lowestTile = document.getElementById(`tile[${indexes.y}][${indexes.x}]`);
        lowestTile.style.backgroundImage = (players[(turn % 2)] === "x") ? "url('../../assets/img/x.svg')" : "url('../../assets/img/o.svg')";
        //  Display a player image as the background of that cell
        //  Make a Check win function
        if (CheckWin(gamestate, players[(turn % 2)]) === true) {
            alert(`${players[(turn % 2)]} won the game!`);
            (players[(turn % 2)] === "x") ? scores.x++: scores.o++;
            resetBoardAndGamestate(); // Resets the board
            UpdateScores(scores); // Displays the score
        }
        turn++;
    });
}

reset(); // Resets the score variables and gamestate