class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.score = 0;
    }
    shoot(attempts) {
        for (let i = 0; i < attempts; i++) {
            if (Math.random() < successRate()) {
                this.score++;
            }
        }
    }
}

function successRate() {
    return Math.random(); 
}

let players = [
    new Player("James", "Miami"),
    new Player("Curry", "Golden State"),
    new Player("Jordan", "Bulls"),
    new Player("Bryant", "Lakers"),
    new Player("Durant", "OKC")
];

const ATTEMPTS = 5; 

players.forEach(player => player.shoot(ATTEMPTS));

players.sort((a, b) => b.score - a.score);

console.log(`${String.fromCodePoint(0x1F3C6)} Rankings after this round:`);
players.forEach((player, index) => console.log(`${index + 1}. ${player.name} - ${player.score} points`));

function findTopPlayers(players) {
    let highestScore = players[0].score;
    return players.filter(player => player.score === highestScore);
}

let topPlayers = findTopPlayers(players);

while (topPlayers.length > 1) {
    console.log(`${String.fromCodePoint(0x1F525)} Tiebreaker needed between:`, topPlayers.map(p => p.name).join(", "));
    console.log(`${String.fromCodePoint(0x1F3C0)} Round begins!`);
    
    topPlayers.forEach(player => player.score = 0); 
    topPlayers.forEach(player => player.shoot(ATTEMPTS));
    topPlayers.sort((a, b) => b.score - a.score);
    
    topPlayers.forEach(player => console.log(`${player.name} scored ${player.score} successful shots.`));
    topPlayers = findTopPlayers(topPlayers);
}

console.log(`${String.fromCodePoint(0x1F3C6)} The champion is ${topPlayers[0].name} with ${topPlayers[0].score} points!`);
