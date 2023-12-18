const gameboardconstructor = function (name) {
    this.name = name;
    this.discordName = "@" + name;
}

const monopoly = new gameboardconstructor("monopoly");
console.log(monopoly);



function gameboard(name) {
    const board = [];
    console.log("I'm alive");

    return { name, board };
};
helloBoard = gameboard('scrabble');
console.log(helloBoard);
console.log(helloBoard.name);



gameboard();
gameboard.board;
console.log('whyds hello');

function player(playerName) {
    let reputation = 0; 
    const name = playerName
    const getReputation = () => reputation;
    const giveReputation = () => reputation++; 
    return { name, getReputation, giveReputation }
}

const player1 = player("Gavin");
console.log(player1.name);

const namey = prompt("name please?")
console.log(namey);