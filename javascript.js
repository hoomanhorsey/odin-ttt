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
        //displayBoard.display(Gameboard.getBoard(), "Called from addpiece");
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

// // Display Object IIFE
// const displayBoard = (function() {
   
//     const display = (calledBoard, message) => {
//     let board = calledBoard;

//     console.log('displayboard has been called ' + message)

//     let boardDisplay = document.querySelector('.boardDisplay');
//     boardDisplay.textContent = ' ';

//     for (let b = 0; b < 3; b++) {
//         let row = document.createElement('div');
//         row.setAttribute('class', 'row')        
//         boardDisplay.appendChild(row);    

//         for (let n = 0; n < 3; n++) {
        
//             let cell = document.createElement('p');
//             cell.textContent = board[b][n];
//             cell.setAttribute('class', 'cell')
//             row.appendChild(cell);
//             }}      
//         }
//     return { display } 

//     })();


// gameControl object  
const gameControl = (function() {        
 
      // checkTurn method (checks board to determine if play is possible)
    const checkBoardTurn = (activePlayerName, coords) => {

        console.log('coords ' + coords)
        let board = Gameboard.getBoard();
        console.table(board)
        let row = coords[0];
        let column = coords[2];
        
        
             
        if ((board[row][column] === 'X') ||  (board[row][column] === 'O'))
        { 
            alert('Position is already taken, please re-enter')
            alert('need to change the function that calls this alert, to accomodate a different return objbect')
            return;
        } else {
            console.log('turn okay')
            return { row, column }
        
        } 
        
        
        // if (board[row][column] === ' ') 
        //         { 
        //         console.log('turn okay')
        //         return { row, column }
        //         } 
        //     else if  (board[row][column] != ' ' )  {
        //      alert('Position is already taken, please re-enter')
        //      alert('need to change the function that calls this alert, to accomodate a different return objbect')
        //      return;
        //     }
        
        // return { row, column }
        
        
        // do {
        //     if (board[row][column] === ' ') 
        //         { 
        //         console.log('turn okay')
        //         break; 
        //         } 
        //     alert('Position is already taken, please re-enter')
        //     break;
        // } while (board[row][column] != ' ' );      
        
        // return { row, column }
    } 

    // change Active Player method
    const changeActivePlayer = (activePlayer) => {
        return activePlayer = activePlayer.name === playerOne.name ? playerTwo : playerOne;
    }
        
    // checkWin method
    const checkWin = () => {
    console.log("Currently testing conditions - checkwin called")

        board = Gameboard.getBoard();
        // const testboard = [['O', 'X', 'X'], ['X', 'O', 0], [0, 'X', 0]];

        // Checking rows
        for (let i = 0; i < 3; i++) {
            let testX = 0;
            let testO = 0;
            //console.log('TESTING ROW '+ i + ', testX: ' + testX +', testO:' + testO)
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
            //console.log('TESTING COLUMN '+ j + ', testX: ' + testX +', testO:' + testO)
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

    // winnerMessage method
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
 
// Initialising hard coded variables to begin game. 
    const initialize = () => {
        // hard coded names
        const playerOne = player('Whiskey'); // For the time being, hard code names.
        const playerTwo = player('Luna');

        //alert(playerOne.name + 'from Gamecontrol, at time player names are declared')
        // hardcode player maker
        playerOne.setMarker('X'); 
        playerTwo.setMarker("O");

        // alternatively, can use "chooseMarker();"

        // Initiating variables for winner check, and activePlayer         
        let winner = '';
        let activePlayer = playerOne;

        return { playerOne, playerTwo, winner, activePlayer}
    }

    const getActivePlayer = function () {
        return activePlayer.name;
    };
    
// Logic for game turns, check winnner, change player

    let {playerOne, playerTwo, winner, activePlayer }=  initialize();
  


    const playBoardRound = (coords) => {   

        // calls checkTurn to see if turn possible, returns turn co-ords
        let gameturn = checkBoardTurn(activePlayer.name, coords);
        console.log('gameturn' + gameturn.row + gameturn.column)
    
        // calls add piece to update board
        Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
    
        activePlayer = changeActivePlayer(activePlayer); 
        console.log('activePlayer', activePlayer)                                    
            };
  

   return { getActivePlayer, playBoardRound, checkWin, winnerMessage } 

    })();



const screenController  = (function () {

    let boardDisplay = document.querySelector('.boardDisplay');

    


    const clickHandlerCell = () => {

        let cells = document.querySelectorAll('.cell');
        cells.forEach((e) => {
            e.addEventListener('click', (e) => {
            console.log(e.target)    
            console.log(e.target.dataset.index)

            gameControl.playBoardRound(e.target.dataset.index);
            //displayBoard.display(Gameboard.getBoard(), "Called from clickHandlerCell");
            // screenController.updateScreen('from ClickHandlerCell');
            updateScreen(' from clickHandlerCell 2nd time')
            setTimeout(function() {
                winner = gameControl.checkWin();
                console.log('checkwin from settimeout')
                winMessage = gameControl.winnerMessage(winner);
                    if (winMessage !== undefined) {
                    alert(winMessage);
                    }
            }, 250);

        } 
        )})
    };

    const updateScreen = (message) => {  
     
        console.log('updateScreen has been' + message)
    
        // clear board
        boardDisplay.textContent = ' ';
        let board = Gameboard.getBoard();

        // display player turn
        let whoseTurn  = document.querySelector('.whoseTurn');
        let turnID = document.createElement('p')
        turnID.setAttribute('class', 'turnID')              
        turnID.textContent = "Player turn: " + gameControl.getActivePlayer();
        whoseTurn.textContent = ' ';    
        whoseTurn.appendChild(turnID);
        //#TODO
    
        // render board
        for (let b = 0; b < 3; b++) {
            let row = document.createElement('div');
            row.setAttribute('class', 'row')        
            boardDisplay.appendChild(row);    
    
            for (let n = 0; n < 3; n++) {
                let cell = document.createElement('p');
                cell.textContent = board[b][n];
                cell.setAttribute('class', 'cell');
                cell.setAttribute('data-index', [b,n]);
                cell.dataset.coords = [b,n];
                row.appendChild(cell);
                }}      
            clickHandlerCell();
            }   

        


    return {updateScreen, clickHandlerCell}
})();

screenController.updateScreen(' from global');

screenController.clickHandlerCell();



}) // end of DOM load function




