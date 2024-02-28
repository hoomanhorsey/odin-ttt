document.addEventListener("DOMContentLoaded", function() {

// Gameboard object IIFE
const Gameboard = (function() {

    // drawing game board
    const board = [];
    for (let i = 0; i < 3; i++) {
        newArray = [];
        for (let j = 0; j < 3; j++) {
            newArray.push(' ');
            }
        board.push(newArray);
        }

    // method to add piece to game board
    const addPiece = (coord1, coord2, piece) => {
        console.log("Adding piece to Board", coord1, coord2, piece);       
        board[coord1][coord2] = piece;
        }

    // method to get game board
    const getBoard = () => board;

    // method to print game board to console
    const printBoard = () => console.table(board);

    return {addPiece, getBoard, printBoard};
    })();


// Player factory function
function player(playername) {
    let name = playername;
    const symbol = "";
    let marker = "";

    const getName = name;
    const setMarker = (input) => marker = input;
    const getMarker = () => marker; 

        return { getName, name, setMarker, getMarker}
    }

// Display Object IIFE
const displayBoard = (function() {
    // let board = Gameboard.getBoard();
    
    const display = (calledBoard, message) => {
    let board = calledBoard;

    console.log('displayboard has been called ' + message)

    let boardDisplay = document.querySelector('.boardDisplay');
    boardDisplay.textContent = ' ';
    console.log('displayBoard.board board display ' + message)
    console.table(board)

    for (let b = 0; b < 3; b++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row')        
        boardDisplay.appendChild(row);    

        for (let n = 0; n < 3; n++) {
        
            let cell = document.createElement('p');
            cell.textContent = board[b][n];
            cell.setAttribute('class', 'cell')
            row.appendChild(cell);
            }}      

        console.log('end of displayboard call')
        }
    return { display } 

    })();



// // Test Display IIFE
// const testDisplay = (function() {
//     let testDisplay = document.querySelector('.testDisplay');
//     testDisplay.textContent = ' ';
//     console.log('testBoard.board board display')
    
//     displayBoard.display(Gameboard.getBoard(), '- called from Test Display');
    
//     })();
    
// gameControl object
const gameControl = (function() {     

    displayBoard.display(Gameboard.getBoard(), '- called from gameControl 1');
    
    // hard coded names
    const playerOne = player('Whiskey'); // For the time being, hard code names.
    const playerTwo = player('Luna');

    playerOne.setMarker('X'); 
    playerTwo.setMarker("O");

    // Get player names to create player - // Insert this for final
    // const createPlayer = (number) => {
    //     let playerName = '';
    
    //     while (playerName === '') {
    //     playerName = prompt('Name of Player ' + number + ' ?')
    //     }
    //     return player(playerName);
    // }
    
    // choose marker method
    const chooseMarker = () => {
        let marker = "";

        while (((marker.toUpperCase() != 'X') && (marker.toUpperCase() != 'O')) )  {   
            marker = prompt(playerOne.name + ", please enter which marker you would like.  'X' or 'O'");
            }
        
        marker = marker.toUpperCase();
    
        if (marker === "X") {
            playerOne.setMarker(marker); playerTwo.setMarker("O");
            } else {playerOne.setMarker(marker); playerTwo.setMarker("X"); }
    
        console.log(playerOne.name + ' is represented by ' + playerOne.getMarker() +'. ' + playerTwo.name + ' is represented by ' + playerTwo.getMarker() + ' .')
    }

    // play turn method
    const playTurn = (activePlayer) => {  
        
        let board = Gameboard.getBoard();
        let row;
        let column;
        do {
            row = prompt(activePlayer + ', choose Row Number');
            column = prompt(activePlayer + ', choose Column Number');  
            if (board[row][column] === ' ') { break; 
            } alert('Position is already taken, please re-enter')
        } while (board[row][column] != ' ' );      
  
        return { row, column }
    }

    // change Active Player method
    const changeActivePlayer = (activePlayer) => {
        return activePlayer = activePlayer.name === playerOne.name ? playerTwo : playerOne;
    }
        
    // checkWin method
    const checkWin = () => {
    console.log("Currently testing conditions")

        board = Gameboard.getBoard();
        // const testboard = [['O', 'X', 'X'], ['X', 'O', 0], [0, 'X', 0]];

        // Checking rows
        for (let i = 0; i < 3; i++) {
            let testX = 0;
            let testO = 0;
            console.log('TESTING ROW '+ i + ', testX: ' + testX +', testO:' + testO)
            for (let j = 0; j < 3; j++) {
                switch (board[i][j]) {
                    case 'X':
                        testX++
                        break;
                    case 'O':
                        testO++
                        break;
                }
                if (testX === 3) {
                    return 'X'
                    } else if (testO === 3) {
                        return 'O'
                    }}}

        // Checking columns
        for (let j = 0; j < 3; j++) {
            let testX = 0;
            let testO = 0;
            console.log('TESTING COLUMN '+ j + ', testX: ' + testX +', testO:' + testO)
            for (let i = 0; i < 3; i++){
                switch (board[i][j]) {
                    case 'X':
                        testX++
                        break;
                    case 'O':
                        testO++
                        break;
                }
                if (testX === 3) {
                    return 'X'
                    } else if (testO === 3) {
                        return 'O'
                    }}}

        // Testing diagonals
        if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) {
            return board[0][0];
        } else if ((board[0][2] === board[1][1]) && (board[1][1] === board[2][0])) {
                return board[0][2];
            }
        
        // Check for tie
        let tie = 0;  
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === ' ') {
                    tie++
                }}}
        if (tie === 0) {
            return "Tie";
        }
         
    } // end of CheckWin method

    const winnerMessage = (winner) => {
        if (winner === 'X') {
            alert('xwinner')
              return ('winner is ' + winner)
            
          } else if (winner === 'O') {
            alert('Owinner')
            return ('winner is ' + winner)
            
          } else if (winner === 'Tie') {
            alert('Tiewinner')
            return ('Game is tied!')
            
          }
    }
 
    
// Logic for game turns, check winnner, change player

    // Initiating variables for winner check, and activePlayer
          
    let winner = '';
    let activePlayer = playerOne;
    // displayBoard.display(Gameboard.getBoard(), 'called from outside of do while loop');

    // chooseMarker();



    // PLAY TURN ON REQUEST

    const playRound = () => {

        let gameturn = playTurn(activePlayer.name);
      
          Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
        //   displayBoard.display(Gameboard.getBoard());
          console.log('should be displaying here why not?')
          
        winner = checkWin();
            
            winMessage = winnerMessage(winner);

            if (winMessage !== undefined) {
                alert(winMessage);
            }

          activePlayer = changeActivePlayer(activePlayer); 
          console.log('activePlayer', activePlayer)    
          displayBoard.display(Gameboard.getBoard(), "Called from Game Control do while loop");

        return {playRound}

    }



    // // do while loop that keeps playing turns until a winner has been found
    // do {

    //     let gameturn = playTurn(activePlayer.name);
      
    //       Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
    //     //   displayBoard.display(Gameboard.getBoard());
    //       console.log('should be displaying here why not?')

    //       Gameboard.printBoard();
    //       console.log('Gameboard.printBoard() ^')
          
    //     winner = checkWin();
            
    //         winMessage = winnerMessage(winner);

    //         if (winMessage !== undefined) {
    //             alert(winMessage);
    //             break;
    //         }

    //       activePlayer = changeActivePlayer(activePlayer); 
    //       console.log('activePlayer', activePlayer)    
    //       displayBoard.display(Gameboard.getBoard(), "Called from Game Control do while loop");

    //   } while ((winner !== 'X') || (winner !== 'O'));

    // // }


    displayBoard.display(Gameboard.getBoard());

    let bwinner = ' ';

    bwinner = checkWin();

    if ((bwinner === 'X') || (bwinner === 'O') || (bwinner === 'Tie')) {
        alert(winMessage);
    } else {

        let gameturn = playTurn(activePlayer.name);
        Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
    }
    })();
  





    // PLAY TURN ON REQUEST

    function playRound (activePlayer) {

        let winner = '';

        console.log('playround called')

        

        let gameturn = gameControl.playTurn(activePlayer.name);
      
          Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
        //   displayBoard.display(Gameboard.getBoard());
          console.log('should be displaying here why not?')
          
        winner = checkWin();
            
            winMessage = winnerMessage(winner);

            if (winMessage !== undefined) {
                alert(winMessage);
            }

          activePlayer = changeActivePlayer(activePlayer); 
          console.log('activePlayer', activePlayer)    
          displayBoard.display(Gameboard.getBoard(), "Called from Game Control do while loop");

        }

    

    function clickHandler() {
    let submitTurn = document.querySelector('.submitTurn');
    submitTurn.addEventListener('click', () => {
        alert('Submitted Turn')
        displayBoard.display(Gameboard.getBoard());
        console.log('hi')

        playRound();
        console.log('Submitted Turn')
    })

}


clickHandler(playRound(activePlayer));


// gameControl();






}) // end of DOM load function