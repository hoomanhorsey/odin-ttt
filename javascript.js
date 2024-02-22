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


// gameControl object  
const gameControl = (function() {     

    displayBoard.display(Gameboard.getBoard(), '- called from gameControl 1');
    
    // hard coded names
    const playerOne = player('Whiskey'); // For the time being, hard code names.
    const playerTwo = player('Luna');

    playerOne.setMarker('X'); 
    playerTwo.setMarker("O");




    // play turn method
    const playTurn = (activePlayer) => {
        alert('hello, from playTurn called');
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

    // function playTurn() {
    //     alert('hello function play Turn')
    //     return playTurn;
    // }
    

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


    
    // chooseMarker();



    const clickHandler = () => {

            let submitTurn = document.querySelector('.submitTurn');
            submitTurn.addEventListener('click', () => {
                alert('Submitted Turn, from inside gameControl')
                displayBoard.display(Gameboard.getBoard());
                console.log('hi')
        
                // gameControl.playTurn();

                let gameturn = gameControl.playTurn(activePlayer.name);
      
                Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
                displayBoard.display(Gameboard.getBoard());
                console.log('should be displaying here why not?')

                console.log('Submitted Turn, from inside Game Control   ')

                displayBoard.display(Gameboard.getBoard(), "Called from clickhandler");

                winner = checkWin();
            
                winMessage = winnerMessage(winner);
            
                        if (winMessage !== undefined) {
                            alert(winMessage);
                        }
            
                    activePlayer = changeActivePlayer(activePlayer.name); 
                    console.log('activePlayer', activePlayer.name)    
                   


    })};


    // clickHandler(playTurn(activePlayer));
    return { playTurn , clickHandler }

    })();
  





    // // PLAY TURN ON REQUEST

    // function playRound (activePlayer) {

    //     let winner = '';

    //     console.log('playround called')

        

    //     let gameturn = gameControl.playTurn(activePlayer.name);
      
    //       Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
    //     //   displayBoard.display(Gameboard.getBoard());
    //       console.log('should be displaying here why not?')
          
    //     winner = checkWin();
            
    //         winMessage = winnerMessage(winner);

    //         if (winMessage !== undefined) {
    //             alert(winMessage);
    //         }

    //       activePlayer = changeActivePlayer(activePlayer); 
    //       console.log('activePlayer', activePlayer)    
    //       displayBoard.display(Gameboard.getBoard(), "Called from Game Control do while loop");

    //     }



// function clickHandler(activePlayer) {
//     let submitTurn = document.querySelector('.submitTurn');
//     submitTurn.addEventListener('click', () => {
//         alert('Submitted Turn')
//         alert(activePlayer);
//         displayBoard.display(Gameboard.getBoard());
//         console.log('hi')

//         let gameturn = gameControl.playTurn(activePlayer.name);
//         alert(gameturn);
//         // let gameturn = gameControl.playTurn(activePlayer.name);
      
//         //       Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
//         //     //   displayBoard.display(Gameboard.getBoard());
//         //       console.log('should be displaying here why not?')

//         console.log('Submitted Turn')
//     })
// }
gameControl.clickHandler();


// gameControl();


}) // end of DOM load function