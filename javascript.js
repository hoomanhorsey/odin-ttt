
// Game control function
// - Get player names
// - Allocate turns / toss of dice?
// - Allocate 0s or Xs to players
// - Request move
    // - Check if move possible (i.e., if position != empty, not possible)
    // - If not, request another move
    // Check if board is winning.
// - If Board has won, then trigger celebration
        // else, next move



// Get Player Names TODO - sort out issues if player presses cancel

playerOne = player(prompt('Name of Player 1'));

playerTwo = player(prompt('Name of Player 2'));

let symbol = "";

/// Allocation of Player Symbols 'O' or 'X'.  TODO may need to hide in a factor function later.

while (((symbol.toUpperCase() != 'X') && (symbol.toUpperCase() != 'O')) )  {
    
    symbol = prompt("Please enter 'X' or 'O'");
}

if (symbol === 'X') {
    playerOne.symbol = symbol;
    playerTwo.symbol = 'O';
} else {
    playerOne.symbol = 'O';
    playerTwo.symbol = 'X';
}

console.log('Player One: ', playerOne.name, ':', playerOne.symbol, 'Player Two: ', playerTwo.name, ':' ,playerTwo.symbol)





// Contstructor, old style
const gameboardconstructor = function (name) {
    this.name = name;
    this.discordName = "@" + name;
}

const monopoly = new gameboardconstructor("monopoly");
console.log(monopoly);

// Factory function

function gameboard(name) {
    const board = [];
    for (let i = 0; i < 3; i++) {
        newArray = [];
        for (let j = 0; j < 3; j++) {
            newArray.push(0);
        }
        board.push(newArray);
    }

    const addPiece = (coord1, coord2, x) => {
        console.log(coord1, coord2, x);
        board[coord1][coord2] = x;
        }

    const manualBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]] 
    console.log(manualBoard)
    console.log(board);

    console.log("Interestingly, this console log is called inside the function despite the function not being called");

    return { name, board, addPiece};
};
helloBoard = gameboard('scrabble');
console.log(helloBoard);
console.log(helloBoard.name);

helloBoard.addPiece(0, 1, 'y');
console.log(helloBoard.board);

gameboard();
gameboard.board;

function player(playerName) {
    let reputation = 0; 
    const name = playerName;
    const symbol = "";
    const getReputation = () => reputation;
    const giveReputation = () => reputation++; 
    return { name, symbol, getReputation, giveReputation }
}
playerOne.symbol = 'X';
console.log(playerOne);
// Create sub function which allocates a player their piece.







