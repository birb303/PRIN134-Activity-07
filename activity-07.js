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

function findTopPlayers(players) {
  let highest = players[0].score;
  return players.filter(p => p.score === highest);
}

let players = [];
const ATTEMPTS = 5;

// ======================== GUI SECTION ========================================================

const app = document.getElementById("app");

// Main Container
const container = document.createElement("div");
container.id = "main";
container.classList.add("container");
app.append(container);

// Header
const header = document.createElement("h2");
header.textContent = "🏀 Basketball Shooting Game";
container.append(header);

// Instructions
const instructions = document.createElement("p");
instructions.textContent = "Enter player name and team, then start the game.";
container.append(instructions);

// Input Controls
const controls = document.createElement("div");
controls.id = "player-controls";
controls.classList.add("input-group");
container.append(controls);

// Name Input
const inputName = document.createElement("input");
inputName.placeholder = "Player Name";
inputName.classList.add("form-control");
inputName.id = "input-name";
controls.append(inputName);

// Team Input
const inputTeam = document.createElement("input");
inputTeam.placeholder = "Team Name";
inputTeam.classList.add("form-control");
inputTeam.id = "input-team";
controls.append(inputTeam);

// Add Player Button
const addPlayerBtn = document.createElement("button");
addPlayerBtn.textContent = "Add Player";
addPlayerBtn.classList.add("btn", "btn-outline-success");
addPlayerBtn.addEventListener("click", () => {
  const name = inputName.value.trim();
  const team = inputTeam.value.trim();
  if (!name || !team) return alert("Both name and team required.");

  players.push(new Player(name, team));
  renderPlayerList();
  inputName.value = "";
  inputTeam.value = "";
});
controls.append(addPlayerBtn);

// Player List
const playerList = document.createElement("ul");
playerList.id = "player-list";
playerList.classList.add("list-group", "pt-3", "pb-2");
container.append(playerList);

function renderPlayerList() {
  playerList.innerHTML = "";
  players.forEach(p => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${p.name} (${p.team})`;
    playerList.append(li);
  });
}

// Action Buttons
const actions = document.createElement("div");
actions.classList.add("btn-group", "pt-2", "pb-2");
container.append(actions);

// Start Game Button
const startBtn = document.createElement("button");
startBtn.textContent = "Start Game";
startBtn.classList.add("btn", "btn-outline-primary");
startBtn.addEventListener("click", () => {
  if (players.length < 2) return alert("Add at least 2 players to start.");

  resultDisplay.innerHTML = "🎯 Game started...<br/>";
  players.forEach(p => p.score = 0);
  players.forEach(p => p.shoot(ATTEMPTS));
  players.sort((a, b) => b.score - a.score);

  resultDisplay.innerHTML += "<h4>🏆 Rankings:</h4><ol>";
  players.forEach(p => {
    resultDisplay.innerHTML += `<li>${p.name} (${p.team}) - ${p.score} points</li>`;
  });
  resultDisplay.innerHTML += "</ol>";

  let topPlayers = findTopPlayers(players);
  while (topPlayers.length > 1) {
    resultDisplay.innerHTML += `🔥 Tiebreaker between: ${topPlayers.map(p => p.name).join(", ")}<br/>`;
    topPlayers.forEach(p => p.score = 0);
    topPlayers.forEach(p => p.shoot(ATTEMPTS));
    topPlayers.sort((a, b) => b.score - a.score);
    topPlayers.forEach(p => {
      resultDisplay.innerHTML += `${p.name} scored ${p.score} successful shots.<br/>`;
    });
    topPlayers = findTopPlayers(topPlayers);
  }

  resultDisplay.innerHTML += `<h3>🏆 Champion: ${topPlayers[0].name} with ${topPlayers[0].score} points!</h3>`;
});
actions.append(startBtn);

// Reset Button
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Game";
resetBtn.classList.add("btn", "btn-outline-danger");
resetBtn.addEventListener("click", () => {
  players = [];
  playerList.innerHTML = "";
  resultDisplay.innerHTML = "";
});
actions.append(resetBtn);

// Result Display
const resultDisplay = document.createElement("div");
resultDisplay.id = "game-results";
container.append(resultDisplay);






