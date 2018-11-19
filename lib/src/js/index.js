const electron = require('electron');

// Global veriables
let gamestate = []; // The gamestate is used for stroing
for (let i = 0; i < 9; i++) { // Makes the gamestate a 2d array to match the tiles array
    gamestate.push([]);
    for (let j = 0; j < 11; j++) {
        gamestate[i].push(" ");
    }
}
let turn = 0; // The turn starts at 0
let players = ["x", "o"];

// Helper functions:
function findIndexOfTile(tileID) {
    // Finds the index of the tile using the tile id atribute goes from tile1, tile2 ... tile99
    // And returns it as an object with an x and an y atribute
    let indexes = {x: 0, y: 0};
    let yString = tileID.slice(8, (tileID.length - 1));
    indexes.x = parseInt(yString, 10);
    console.log(`X cordinate of tile: ${indexes.x}`);
    // Find the y component FIXME:
    for (let i = 0; i < (gamestate.length - 1); i++) { 
        for (let j = 0; j < gamestate[i].length; j++) {
            (gamestate[(i + 1)][j] === " ") ? indexes.y = (i + 1) : indexes.y = i;
        }
    } 
    console.table(indexes)
    //return indexes;
    return indexes;
}

// Main functions:
function CheckWin (gamestate, player) {
    // Loops though the hole gamestate and Checks if a player won
    for (let i = 0; i < gamestate.length; i++) {
        // Checks every horizontal and horizontal posibility
        for (let j = 0; j < (gamestate[i].length - 4); j++) {
            if (gamestate[i][j] == player && gamestate[i][j + 1] == player && gamestate[i][j + 2] == player && gamestate[i][j + 3] == player) {
                return true;
            } else if (gamestate[j][i] == player && gamestate[j + 1][i] == player && gamestate[j + 2][i] == player && gamestate[j + 3][i] == player) {
                return true;
            }
        }
    }
    // TODO: Check for slanted 
    for (let i = 0; i < gamestate.length; i++) { // Check for slanted rows
        for (let j = 0; j < gamestate[i].length; j++) {

        }
    }
}
// Adds the event listeneres for the tiles on the board
let tiles = document.getElementsByClassName('tile');
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', (event) => {
        // Finds the indexes of the tile
        let indexes = findIndexOfTile(event.target.id);
        // Update the gamestate
        gamestate[indexes.y][indexes.x] = players[(turn % 2)];
        console.table(gamestate);
        // FIXME: Update the cell and set its image equal to the current player
        let lowestTile = document.getElementById(`tile[${indexes.y}][${indexes.x}]`);
        let url;
        (players[(turn % 2)] === "x") ? url = "url('../../assets/img/x.svg')" : url = "url('../../assets/img/o.svg')";
        lowestTile.style.backgroundImage = url;
        
        // TODO: Display a player image as the background of that cell
        // TODO: Make a Check win function
        turn++;
    });
}