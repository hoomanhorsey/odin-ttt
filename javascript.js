// TODO

// Query 
// Markers 
    // - whether to get rid of Gameboard.setMarker, and Gameboard.getMarker methods 
    // - Just hard code them instead?


// IF there is a winner, 
// - then update screen to advise winner.
// - prompt to start new game.

// Prompt user: 
// -  to input names?
// - choose maker?

// maybe create a winner variable in the Game control, then get that to update if there is a winner
// get screen control to check that variable to turn off the event listener?


document.addEventListener("DOMContentLoaded", function() {

// Gameboard object IIFE
const gameboard = (function() {

    const newBoard = () => {
        let board = [];
        for (let i = 0; i < 3; i++) {
            tempArray = [];
            for (let j = 0; j < 3; j++) {
                tempArray.push(' ');
                }
            board.push(tempArray);      
            }
        return board;
    };   

    // assigning a new blank gameboard to the board variable
    board = newBoard();

    // add piece to game board, including check turn
    const addPiece = (row, column, marker) => 
    {    
        do {
            if (board[row][column] === ' ') {           
                board[row][column] = marker;
                return true;
            } 
        alert('Sorry that location is taken. Choose another?')
        return false;
    } while ((board[row][column] === 'X') || (board[row][column] === 'O'));
    }
        
    // method to get game board
    const getBoard = () => board;

    return { newBoard, addPiece, getBoard };
    })();

// Player factory function
function player(playername) {
    let name = playername;
    let marker = "";
    const getName = () => name; // TODO Is this redundant?  Is name actually gotten?
    const setMarker = (input) => marker = input;
    const getMarker = () => marker; 
        return { getName, setMarker, getMarker}
    }

// gameControl object  
const gameControl = (function() {        
     
    // Initialising hard coded variables to begin game. 
    const initialize = () => {
        // hard coded names
        const playerOne = player('Whiskey'); // For the time being, hard code names.
        const playerTwo = player('Luna');

        // hardcode player maker -  // alternatively, can use "chooseMarker();"
        playerOne.setMarker('X'); 
        playerTwo.setMarker('O');

        // Initiating variables for winner check, and activePlayer         
        let winner = false;
        let activePlayer = playerOne;
        console.log('activeplayer initizlisation' + activePlayer.getName())

        return { playerOne, playerTwo, winner, activePlayer}
    }
    // initialize hard coded player names
    let {playerOne, playerTwo, winner, activePlayer } =  initialize();
    // TODO - I don't think there is any reason why the above needs to live in 
    // it's own function, although I think the way you have destructured the variables
    // is clever.// Keeping it in it's own function doesn't in this instance keep it
    // private as you are immediately returning it.

    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;

    // restarts game
    const restartGame = () => {
        gameboard.newBoard();
    }

    // change Active Player method  // TODO This appears to be redundant.....check to see if it is dealt with elsewhere
    const changeActivePlayer = (activePlayer) => {
        return activePlayer = activePlayer === playerOne.getName() ? playerTwo : playerOne;
    }
        
    // winnerMessage method
    const winnerMessage = (winner) => {
        if (winner === 'X') {
              return ('Winner is ' + gameControl.getActivePlayerName()) 
          } else if (winner === 'O') {
            return ('Winner is ' +  gameControl.getActivePlayerName())     
          } else if (winner === 'Tie') {
            return ('Game is tied!')
          }
    }
    
    // method to set winner
    const setWinner = (newWinner) => {
        winner = newWinner
        console.log('Winner set! Winner is ' + winner)
    }

    // Method to get winner
    const getWinner = () => {
        return winner
    }
    
    const getActivePlayerName = function () {
           return activePlayer.getName();
    };
    
    // method to play a round
    const playRound = (coords) => {   

        // adds piece to board, after checking for validity.
        let turnOK = gameboard.addPiece(coords[0], coords[2], activePlayer.getMarker())
        if (!turnOK) return // if gameTurn is returned as 'false', playRound is exited
         
        // checkwin 
        gameControl.checkWin();

        if (!winner) { // No winner
                // changes active player over
                activePlayer = activePlayer.getName() === playerOne.getName() ? playerTwo : playerOne;
        } else {
            // What to do if there is a winner? Call endGame()?
            endGame();
        }
        console.log('end of playRound call.........................')
            };

    const endGame = () => {
        console.log('Game is ended. Winner is ' + winner)
        winnerMessage()
    }

 // checkWin method
 const checkWin = () => {
    board = gameboard.getBoard();

    // Checking rows
    for (let i = 0; i < 3; i++) {
        let testX = 0;
        let testO = 0;
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
                setWinner('X')
                } else if (testO === 3) {
                }}}

    // Checking columns
    for (let j = 0; j < 3; j++) {
        let testX = 0;
        let testO = 0;
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
                setWinner('X')
                } else if (testO === 3) {
                    setWinner('O')
                }}}

    // Checking diagonals
    if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2]) && (board[0][0] !== ' ')) {
        setWinner(board[0][0]);
    }  
    if ((board[0][2] === board[1][1]) && (board[1][1] === board[2][0]) && (board[0][2] !== ' ')) {
        setWinner(board[0][2]);
        }

    // Check for tie
    let tie = 0;  
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                tie++
            }}}
    if (tie === 0) {
        setWinner("Tie")
    }
    return false;

} // end of CheckWin method

    return { getActivePlayerName, changeActivePlayer, playRound, checkWin, winnerMessage, getWinner, setWinner, restartGame, initialize, getPlayerOne, getPlayerTwo} 
    })();


const screenController  = (function () {

    let boardDisplay = document.querySelector('.boardDisplay'); 

    const handleClick = (e) => {
        gameControl.playRound(e.target.dataset.index);
        updateScreen('from sep handleclick function')
        } 

    const clickHandlerCell = () => {    
        let cells = document.querySelectorAll('.cell');
        cells.forEach((e) => {
            e.addEventListener('click', handleClick);
            window.handleClick = handleClick; // adds function to global, so it can be removed
         })
    }

    const displayTurn = () => {
        let gameStatusDisplay  = document.querySelector('.gameStatusDisplay');
        let turnID = document.createElement('p')
        turnID.setAttribute('class', 'turnID')              
        turnID.textContent = gameControl.getActivePlayerName() +  "'s turn.";
        gameStatusDisplay.textContent = ' ';    
        gameStatusDisplay.appendChild(turnID);
        }

    const updateScreen = (message) => {  
        // clear board      
        console.log('calling updateScreen() from ' + message)
        boardDisplay.textContent = ' ';
        let board = gameboard.getBoard();

        displayTurn();
         
        // render board
        for (let b = 0; b < 3; b++) {
            let row = document.createElement('div');
            row.setAttribute('class', 'row')        
            boardDisplay.appendChild(row);    
    
            for (let n = 0; n < 3; n++) {
                let cell = document.createElement('p');
                cell.textContent = board[b][n];                       
                cell.classList.add('cell', 'cell-'+ b + n);
                cell.setAttribute('data-index', [b,n]);
                row.appendChild(cell);
                }}      
        
        
        
        console.log('getWinner from if test' +gameControl.getWinner())
        if (gameControl.getWinner() === false) { 
            clickHandlerCell();
        }

        // win check
        if (gameControl.getWinner() !== false) {
            displayWinner(gameControl.winnerMessage(gameControl.getWinner()));
            
            // let cells = document.querySelectorAll('.cell');
            // cells.forEach((e) => { 
            //     e.removeEventListener('click', window.handleClick);
            //     }
            //     )
            }
            };  
              
    const displayWinner = function (winMessage){
        let turnID  = document.querySelector('.turnID'); 
        turnID.textContent = winMessage;
    }

    const reset = () => {
        resetDiv = document.querySelector('.reset');
        resetDiv.addEventListener('click', () => {
            console.log('reset, from inside screenController')
            board = gameboard.newBoard(); 
            // do i need to udpate everything else? reinitialize    
            console.log('newboard')

            // let test = gameControl.getWinner();
            // console.log('winner  ' + test)
            // if (test === 'O') {
            //     gameControl.changeActivePlayer('Whiskey')
            // } else if (test === 'X') {
            // gameControl.changeActivePlayer('Luna')}
            

            gameControl.setWinner(false) // reset winner as false
            updateScreen('reset');
            console.log(gameControl.getActivePlayerName())


            activePlayer = gameControl.getActivePlayerName === gameControl.getPlayerOne().getName() ? gameControl.getPlayerTwo() : gameControl.getPlayerOne();
            // activePlayer = activePlayer === playerOne.getName() ? playerTwo : playerOne; 
            gameControl.changeActivePlayer(gameControl.getActivePlayerName())

            displayTurn();


    })}

// if (!gameControl.getWinner()) {
//         // alert('Is there a winner? ' + gameControl.getWinner());
//         updateScreen('global');
//         clickHandlerCell();
//     }  

// do {
// if (!gameControl.getWinner()) {
//     alert('Is there a winner? ' + gameControl.getWinner());
//     clickHandlerCell();
// }  
// } while (gameControl.getWinner() === false);



updateScreen('inside screenController')
   

reset();

})(); // end of screenController function

}) // end of DOM load function




