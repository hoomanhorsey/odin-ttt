
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
    const changeActivePlayer = (activePlayer) => {
        
        return activePlayer = activePlayer.name === playerOne.name ? playerTwo : playerOne;
    }
        
    // checkWin method

    const checkWin = () => {
    alert("Currently testing conditions" )

    board = Gameboard.getBoard();
    const testboard = [['O', 'X', 'X'], ['X', 'O', 0], [0, 'X', 0]];

    for (let i = 0; i < 3; i++) {
        let testX = 0;
        let testO = 0;
        console.log('TESTING ROW '+ i)
        for (let j = 0; j < 3; j++) {
            
            switch (testboard[i][j]) {
                case 'X':
                    testX++
                    break;
                case 'O':
                    testO++
                    break;
            }
            console.log('testX: ' + testX +', testO:' + testO)

             if (testX === 3) {
                return 'X'
                } else if (testO === 3) {
                    alert("WINNER! WINNER! TOFU DINNER! OOO")
                    return 'O'
                }

            }
    }


    // Check for win - down columns
    for (let j = 0; j < 3; j++) {
        let testX = 0;
        let testO = 0;
        console.log('TESTING COLUMN '+ j)
        for (let i = 0; i < 3; i++){
            
            switch (testboard[i][j]) {
                case 'X':
                    testX++
                    break;
                case 'O':
                    testO++
                    break;
            }
            console.log('testX: ' + testX +', testO:' + testO)

             if (testX === 3) {
                return 'X'
                } else if (testO === 3) {
                    return 'O'
                }}
        }


    // Check for win - diagonals


    if ((testboard[0][0] === testboard[1][1]) && (testboard[1][1] === testboard[2][2])) {
        console.log(testboard[0][0], testboard[1][1],testboard[2][2])
        console.log(testboard[0][2], testboard[1][1],testboard[2][0])
        return testboard[0][0];
    } else if ((testboard[0][2] === testboard[1][1]) && (testboard[1][1] === testboard[2][0])) 
        {
            console.log(testboard[0][0], testboard[1][1],testboard[2][2])
            console.log(testboard[0][2], testboard[1][1],testboard[2][0])
            return testboard[0][2];
        }

        
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
        };
        }
    winner = '';
    let activePlayer = playerOne;

    // Logic for game turns, check winnner, change player
    do {
        let gameturn = playTurn(activePlayer.name);
      
          Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
          console.table(Gameboard.getBoard())
          
          winner = checkWin();
          console.log('winner', winner)
          if (winner === 'X') {
             alert('winner is ' + winner)
              break
          } else if (winner === 'O') {

            alert('winner is ' + winner)
            break
          }
                    
          activePlayer = changeActivePlayer(activePlayer); // change player turn
          console.log('activePlayer', activePlayer)    
      } while ((winner !== 'X') || (winner !== 'O'));


    }

    // // Setting player turns
    // let activePlayer = playerOne // variable to hold name of player whose turn it is, maybe not necessary
    // console.log('activePlayer', activePlayer)
 
    // // While loop prompting choices until game is won
    // let winner = '';

    // while (winner !== 'X')   {
    //     let gameturn = playTurn(activePlayer.name);
    
    //     Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
    //     console.table(Gameboard.getBoard())
        
    //     let winner = checkWin();
    //     console.log('winner', winner)
    //     if (winner = 'X') {
    //         break
    //     }
        
    //     activePlayer = changeActivePlayer(activePlayer); // change player turn
    //     console.log('activePlayer', activePlayer)    
    // }   
    
)();



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