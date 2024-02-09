document.addEventListener("DOMContentLoaded", function() {


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

    const getBoard = () => board;

    return {addPiece, getBoard};
    })();



// Player factory function

function player(playername) {

        let name = playername;
        const symbol = "";
        let marker = "";
    
        const setMarker = (input) => marker = input;
        const getMarker = () => marker; 

        return { name, setMarker, getMarker}
    }

// Display Object

const displayBoard = (function() {
    let board = Gameboard.getBoard();

    const display = () => {
    let boardDisplay = document.querySelector('.boardDisplay');
    boardDisplay.textContent = '';

    console.table(board)

    for (let b = 0; b < 3; b++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row')
        boardDisplay.appendChild(row);

        for (let n = 0; n < 3; n++) {
        
            let cell = document.createElement('p');
            cell.textContent = board[b][n];
            cell.setAttribute('class', 'cell')
            console.log(cell)
            console.log(boardDisplay)

            row.appendChild(cell);
    }}

    }
    return {display}

    })();



// gameControl object

const gameControl = (function() {

          

    // hard coded names
    const playerOne = player('Whiskey'); // For the time being, hard code names.
    const playerTwo = player('Luna');

    // Get player names to create player - // Insert this for final
    // const createPlayer = (number) => {
    //     let playerName = '';
    
    //     while (playerName === '') {
    //     playerName = prompt('Name of Player ' + number + ' ?')
    //     }
    //     return player(playerName);
    // }
   
    // const playerOney = createPlayer('One');
    // console.table(playerOney)
    // const playerTwoy = createPlayer('Two');
    // console.table(playerTwoy)
    
    //Allocation of player marker inside a function

    const chooseMarker = () => {
        let marker = "";

        while (((marker.toUpperCase() != 'X') && (marker.toUpperCase() != 'O')) )  {   
            marker = prompt(playerOne.name + ", please enter which marker you would like.  'X' or 'O'");
            }
        
        marker = marker.toUpperCase();
    
        if (marker === "X") {
            playerOne.setMarker(marker); playerTwo.setMarker("O");
            } else {playerOne.setMarker(marker); playerTwo.setMarker("X"); }
    
        alert(playerOne.name + ' is represented by ' + playerOne.getMarker() +'. ' + playerTwo.name + ' is represented by ' + playerTwo.getMarker() + ' .')
    }

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
    alert("Currently testing conditions")

    board = Gameboard.getBoard();
    const testboard = [['O', 'X', 'X'], ['X', 'O', 0], [0, 'X', 0]];

    // Checking rows
        for (let i = 0; i < 3; i++) {
            let testX = 0;
            let testO = 0;
            console.log('TESTING ROW '+ i)
            for (let j = 0; j < 3; j++) {
                switch (board[i][j]) {
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
                    }}}

    // Checking columns
        for (let j = 0; j < 3; j++) {
            let testX = 0;
            let testO = 0;
            console.log('TESTING COLUMN '+ j)
            for (let i = 0; i < 3; i++){
                switch (board[i][j]) {
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
                if (board[i][j] === 0) {
                    tie++
                    console.log('adding one to tie')
                    console.log(tie);
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
          
    winner = '';
    let activePlayer = playerOne;

    chooseMarker();

    // do while loop that keeps playing turns until a winner has been found
    do {
        let gameturn = playTurn(activePlayer.name);
      
          Gameboard.addPiece(gameturn.row, gameturn.column, activePlayer.getMarker())
          console.table(Gameboard.getBoard())
          
          displayBoard.display(Gameboard.getBoard());
          
        winner = checkWin();
            
            winMessage = winnerMessage(winner);

            if (winMessage !== undefined) {
                alert(winMessage);
                break;
            }
                         
          activePlayer = changeActivePlayer(activePlayer); 
          console.log('activePlayer', activePlayer)    
      } while ((winner !== 'X') || (winner !== 'O'));

    }
    
)();

}) // end of DOM load function