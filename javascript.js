
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






// Get Player Names, Instantiate Player Objects
// TODO - sort out issues if player presses cancel

// let playerOneName = '';

// while (playerOneName === '') {
//     playerOneName = prompt('Name of Player 1')
//     }
// const playerOne = player(playerOneName);

// let playerTwoName = '';
// while (playerTwoName === '') {
//     playerTwoName = (prompt('Name of Player 2'));
// }
// const playerTwo = player(playerTwoName);








// Gameboard object

const Gameboard = (function() {

    const board = [];
    for (let i = 0; i < 3; i++) {
        newArray = [];
        for (let j = 0; j < 3; j++) {
            newArray.push(0);
        }
        board.push(newArray);
    }

    const addPiece = (coord1, coord2, piece) => {
        console.log("Adding piece to Board", coord1, coord2, piece);
               
        board[coord1][coord2] = piece;
        }

        // const addPiece = (coord1, coord2, piece) => {
        // if (board[coord1][coord2] === 0) {      
        //     alert('empty')     
        //     board[coord1][coord2] = piece;
        // } else {
        //     alert ('not empty');
        //     }
        // }


       

    const getBoard = () => board;

    return {addPiece, getBoard};
})();




// gameControl object

const gameControl = (function() {

    const playerOne = player('Whiskey'); // For the time being, hard code names.
    const playerTwo = player('Luna');

    //Allocation of player marker

    let marker = "";

    while (((marker.toUpperCase() != 'X') && (marker.toUpperCase() != 'O')) )  {   
        marker = prompt(playerOne.name + ", please enter which marker you would like.  'X' or 'O'");
    }
    marker = marker.toUpperCase();

    if (marker === "X") {
        playerOne.setMarker(marker); playerTwo.setMarker("O");
        } else {playerOne.setMarker(marker); playerTwo.setMarker("X"); }

    alert(playerOne.name + ' is represented by ' + playerOne.getMarker() +'. ' + playerTwo.name + ' is represented by ' + playerTwo.getMarker() + ' .')

    // play turn method

    const playTurn = (activePlayer) => {  
        let board = Gameboard.getBoard();
        let row;
        let column;
        do {
            row = prompt(activePlayer + ', choose Row Number');
            column = prompt(activePlayer + ', choose Column Number');  
            if (board[row][column] === 0) { break; 
            } alert('Position is already taken, please re-enter')
        } while (board[row][column] != 0 ); 
  
        return { row, column }
    }

    // change Active Player method
    const changeActivePlayer = () => {
        return activePlayer = activePlayer.name === playerOne.name ? playerTwo : playerOne;
    }
        
    // checkWin method

    const checkWin = () => {
    alert("Currently testing conditions for tie")

    board = Gameboard.getBoard();
    // const testBoard = [['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']];


    // Check for tie
    let tie = 0;  
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                tie++
                console.log('adding one to tie')
                console.log(tie);
            }
        }
      
    }
    if (tie === 0) {
        return "tie";
    } else {
        return "not tie";
        }

    // Check for win

    let test = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++){
            if (board[i][j] === 'X') {
                test++
            }
        if (test === 3) {
            alert("WINNER! WINNER! TOFU DINNER!")
        }
        }

    }


    }
   
    // Setting player turns
    let activePlayer = playerOne // variable to hold name of player whose turn it is, maybe not necessary
    console.log('activePlayer', activePlayer)
 
    // While loop prompting choices until game is won
    let winner = '';

    while (!winner) {

        let gameturn = playTurn(activePlayer.name);
    
        Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
        console.table(Gameboard.getBoard())
        
        let winTest = checkWin();
        console.log('winTest', winTest)
        
        if (winTest === 'tie') {
            alert("It's a tie")
            alert("end of game")
            alert('insert, do you want to play again?  later')
        
            break;
        }

        
        activePlayer = changeActivePlayer(activePlayer); // change player turn
        console.log('activePlayer', activePlayer)

       

    }   
    
})();



// function turn(activePlayer) {

//     if (activePlayer.name === playerOne.name) {
//         activePlayer = playerTwo;
//     } else {
//         activePlayer = playerOne;
//     }
//     return activePlayer
// }

// Factory function

// function gameTurns(activePlayer) {  
//     let row = prompt(activePlayer + ', choose Row Number');
//     let column = prompt(activePlayer + ', choose Column Numer');  
//     return { row, column }
// }




// Player factory function

function player(playername) {
    let reputation = 0; 
    const getReputation = () => reputation;
    const giveReputation = () => reputation++; 

    let name = playername;
    const symbol = "";
    let marker = "";
 
    const setMarker = (input) => marker = input;
    const getMarker = () => marker;
   
    // const getName = () =>  
    // let playerName; 
    // do {playerName = prompt('Name of Player')
    //     } while (while playerName === '')
    return { name, getReputation, giveReputation, setMarker, getMarker}
}






// Create sub function which allocates a player their piece.

// // Prototype play

// console.log('Prototype of Player One', Object.getPrototypeOf(playerOne));

// console.log(Object.isPrototypeOf(playerOne)) // returns false.






// // Contstructor, old style
// const gameboardconstructor = function (name) {
//     this.name = name;
//     this.discordName = "@" + name;
// }

// const monopoly = new gameboardconstructor("monopoly");



// // object.create   static method to create a new object, based on existing object
// const cat = {
//     "fur": "hairy",
//     makeSound: function () {
//         console.log(this.sound)
//     } 
// }

// floof = Object.create(cat)
// floof.sound = "Purrrupr"

// floof.makeSound();


// console.log(cat.isPrototypeOf(floof));
// console.log(cat);
// console.log(floof);



// Gameboard.addPiece(0, 1, 'X');
// Gameboard.addPiece(1, 2, 'O');
// console.table(Gameboard.getBoard());