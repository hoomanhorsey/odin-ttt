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

    // TODO - Prob delete this as I've now consolidated it into a new function
    // creating game board array variable.
    // let board = [];
    // new board for when game resets
    // const newBoard = () => {
    //     let newBoard = [];
    //     for (let i = 0; i < 3; i++) {
    //         tempArray = [];
    //         for (let j = 0; j < 3; j++) {
    //             tempArray.push(' ');
    //             }
    //         newBoard.push(tempArray);      
    //         }
    //         board = newBoard;  
    //         return board;          
    // };   

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

    // assigning a newly generated board to the board variable
    board = newBoard();

    // add piece to game board
    const addPiece = (coord1, coord2, piece) => {
    board[coord1][coord2] = piece;}

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
        let winner = 'No Winner Yet';
        let activePlayer = playerOne;

        return { playerOne, playerTwo, winner, activePlayer}
    }
    // initialize hard coded player names
    let {playerOne, playerTwo, winner, activePlayer } =  initialize();

    // restarts game
    const restartGame = () => {
        gameboard.newBoard();
    }
 
    // checkTurn board to determine if play is possible)
    const checkBoardTurn = (activePlayerName, coords) => { // TODO - checkBoard takes in activePlayerName but doesn't actually use it....
        let board = gameboard.getBoard();
        let row = coords[0];
        let column = coords[2];  
                
        do {
            if (board[row][column] === ' ') {
                return { row, column }
            }
            alert('Awww noes! Position is already taken. Please choose a different space');
            return 'space taken';
        } while ((board[row][column] === 'X') || (board[row][column] === 'O'));
    } 

    // change Active Player method  // TODO This appears to be redundant.....check to see if it is dealt with elsewhere
    const changeActivePlayer = (activePlayer) => {
        return activePlayer = activePlayer.getName() === playerOne.getName() ? playerTwo : playerOne;
    }
        
    // winnerMessage method
    const winnerMessage = (winner) => {
        if (winner === 'X') {
              return ('Winner is ' + gameControl.getActivePlayer()) 
          } else if (winner === 'O') {
            return ('Winner is ' +  gameControl.getActivePlayer())     
          } else if (winner === 'Tie') {
            return ('Game is tied!')
          }
    }
    
    // method to set winner
    const setWinner = (newWinner) => {
        winner = newWinner
    }

    // Method to get winner
    const getWinner = () => {
        return winner
    }
    
    const getActivePlayer = function () {
        return activePlayer.getName;
    };
    
    // method to play a round
    const playBoardRound = (coords) => {   

        // calls checkTurn to see if turn possible, returns turn co-ords
        let gameturn = checkBoardTurn(activePlayer.name, coords);
        if (gameturn === 'space taken') {
            return;
        }
        // calls addPiece to update board
        gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())

        //TO DO 
        // checkwin here?
        winner = gameControl.checkWin();

        if (winner === 'No Winner Yet') {
            console.log('No winner yet dude!')
              // calls activePlayer to change active player
                // activePlayer = changeActivePlayer(activePlayer); 
                AP = getActivePlayer();
                console.log('active playereerreerer' + AP)

                activePlayer = activePlayer.getName() === playerOne.getName() ? playerTwo : playerOne;
                console.log('active player, from playBoard Round' + activePlayer.name)
        } else {
            gameControl.setWinner(winner);
            console.log('getwinner from playerBoard Round' + getActivePlayer());
            console.log(' gameControl.setWinner(winner);' + gameControl.getWinner())
        }

        console.log('winner? - ' + winner)    
        //alert(activePlayer.name)
            };


 // checkWin method
 const checkWin = () => {
    board = gameboard.getBoard();

    // Checking rows
    console.log('checking rows')
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
                return 'X'
                } else if (testO === 3) {
                    return 'O'
                }}}

    // Checking columns
    console.log('checking columbs')

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
                return 'X'
                } else if (testO === 3) {
                    return 'O'
                }}}

    // Checking diagonals
    console.log('checking diags')

    if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2]) && (board[0][0] !== ' ')) {
        return board[0][0];
    }  
    if ((board[0][2] === board[1][1]) && (board[1][1] === board[2][0]) && (board[0][2] !== ' ')) {
        return board[0][2];
        }

    // Check for tie
    let tie = 0;  
    console.log('checking tie')
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                tie++
            }}}
    if (tie === 0) {
        return "Tie";
    }
    return 'No Winner Yet'

} // end of CheckWin method

    return { getActivePlayer, playBoardRound, checkWin, winnerMessage, getWinner, setWinner, restartGame} 
    })();



const screenController  = (function () {

    let boardDisplay = document.querySelector('.boardDisplay'); 

    const clickHandlerCell = () => {         

        let cells = document.querySelectorAll('.cell');
        cells.forEach((e) => {
            e.addEventListener('click', handleClick);
            console.log('added the cell event listener')
                        
            function handleClick(e) {
               
                gameControl.playBoardRound(e.target.dataset.index);
                updateScreen(' from clickHandlerCell 2nd time')
                // setTimeout(function() {
                     
                //     // winMessage = gameControl.winnerMessage(winner);
                //         if (winMessage !== undefined) {
                //         displayWinner(winMessage);
                        
                //         alert('we have winner')
                //         removeCellEventListener(cells);    
                                                
                //         function removeCellEventListener() {
                //             // let bells = document.querySelectorAll('.cell');

                //             alert('we have called remove Event Listener')
                //             cells.forEach( bell => {
                //                 console.log(bell)
                //                 bell.removeEventListener('click', handleClick);
                //             })
                //         }
                //     }}, 50);
                } 
        
    })
    }

    // const clickHandlerCell = () => {

    //     let cells = document.querySelectorAll('.cell');
    //     cells.forEach((e) => {
    //         e.addEventListener('click', (e) => {
    //         // console.log(e.target)    
    //         // console.log(e.target.dataset.index)

    //         gameControl.playBoardRound(e.target.dataset.index);
    //         updateScreen(' from clickHandlerCell 2nd time')
    //         setTimeout(function() {
    //             winner = gameControl.checkWin();
    //             winMessage = gameControl.winnerMessage(winner);
    //                 if (winMessage !== undefined) {
    //                 displayWinner(winMessage);
                    
    //                 function removeCellEventListener () {
    //                     cells.forEach( cell => {
    //                         cell.removeEventListener()
    //                     })
    //                 }
    //                 removeCellEventListener();
    //                 }}, 50);
    //         } 
    //     )})
    // };

    const updateScreen = (message) => {  
        
        // clear board

        console.log('calling updateScreen() from ' + message)
        boardDisplay.textContent = ' ';
        let board = gameboard.getBoard();

        console.table(board);

        // display player turn
        let gameStatusDisplay  = document.querySelector('.gameStatusDisplay');
        let turnID = document.createElement('p')
        turnID.setAttribute('class', 'turnID')              
        turnID.textContent = gameControl.getActivePlayer() +  "'s turn.";
        gameStatusDisplay.textContent = ' ';    
        gameStatusDisplay.appendChild(turnID);
    
        // render board
        console.log('rendering process started')
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

        // TODO, currently restarts clickHandler, but perhaps it only should if there is no winner. 
        // i.e. if winner === 'No Winner Yet'
        // clickHandlerCell()

        console.log('gamecontrol get winner' +gameControl.getWinner())
        // Maybe this function re: winner test needs to be elsewhere?
        if (gameControl.getWinner() === 'No Winner Yet') {
            console.log('process winner?'+ gameControl.getWinner())
            clickHandlerCell();
                } else {
                console.log('winner? Need to update winner display screen' + gameControl.getWinner())    
                console.log('need to also insert a start again button?')
                winMessage = gameControl.winnerMessage(gameControl.getWinner())
                displayWinner(winMessage);
                }
             }   
    const displayWinner = function (winMessage){
        let turnID  = document.querySelector('.turnID'); 
        turnID.textContent = ' ';

        let gameStatusDisplay  = document.querySelector('gameStatusDisplay'); 
        winnerMessage = document.querySelector('gameStatusDisplay');

        let DOMwinMessage = document.createElement('p')
        console.log(winMessage)    

        DOMwinMessage.setAttribute('class', 'winMessage')              
        DOMwinMessage.textContent = winMessage;
        gameStatusDisplay.appendChild(DOMwinMessage);
        
        // let playAgain = document.createElement('p')
        // playAgain.setAttribute('class', 'playAgain')  
        // playAgain.textContent = "Click to play again!"
        // whoseTurn.appendChild(playAgain);

        clickToPlayAgain = document.querySelector('.reset');

        clickToPlayAgain.addEventListener('click', () => {

            //Consider putting this into a restart function, mindful that you'll need to include all the object names of each method
            alert('restart game')
            // gameControl.restartGame();
            gameboard.newBoard();
            updateScreen('restart game');
            
            // const playAgain = document.querySelector(".playAgain");
            // playAgain.remove();
            const winMessage = document.querySelector(".winMessage");
            winMessage.remove();

            const turnID = document.querySelector(".turnID");
            turnID.textContent = gameControl.getActivePlayer() + "'s turn."          

            clickHandlerCell();
        } )
    }

  

        console.log('Is there a winner' )//+ winner)

             return {updateScreen, clickHandlerCell}

})(); // end of screenController function

screenController.updateScreen(' from global');


}) // end of DOM load function




