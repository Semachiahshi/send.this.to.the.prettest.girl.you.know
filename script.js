// Přihlášení
const loginForm = document.getElementById('loginForm');
const loginDiv = document.getElementById('login');
const gameDiv = document.getElementById('game');
const turnDisplay = document.getElementById('turn');
const board = document.getElementById('board');
const historyBody = document.getElementById('historyBody');

let players = {};
let currentPlayer = null;
let boardState = Array(9).fill(null);
let history = [];

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user1 = document.getElementById('user1').value;
  const password1 = document.getElementById('password1').value;
  const user2 = document.getElementById('user2').value;
  const password2 = document.getElementById('password2').value;

  if (password1 === '1' && password2 === '2') {
    players = { X: user1, O: user2 };
    currentPlayer = 'X';
    turnDisplay.textContent = `Na tahu: ${players[currentPlayer]}`;
    loginDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    initBoard();
  } else {
    alert('Špatné heslo!');
  }
});

// Inicializace hrací plochy
function initBoard() {
  board.innerHTML = '';
  boardState.fill(null);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }
}

// Zpracování tahu
function handleMove(e) {
  const index = e.target.dataset.index;
  if (!boardState[index]) {
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');
    if (checkWin()) {
      endGame(players[currentPlayer]);
    } else if (boardState.every(cell => cell)) {
      endGame('Remíza');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turnDisplay.textContent = `Na tahu: ${players[currentPlayer]}`;
    }
  }
}

// Kontrola výhry
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontální
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikální
    [0, 4, 8], [2, 4, 6],           // Diagonální
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      document.querySelector(`[data-index="${a}"]`).classList.add('win');
      document.querySelector(`[data-index="${b}"]`).classList.add('win');
      document.querySelector(`[data-index="${c}"]`).classList.add('win');
      return true;
    }
    return false;
  });
}

// Ukončení hry
function endGame(winner) {
  alert(winner === 'Remíza' ? 'Hra skončila remízou!' : `${winner} vyhrál!`);
  history.push({ player1: players.X, player2: players.O, winner });
  updateHistory();
  initBoard();
}

// Aktualizace historie
function updateHistory() {
  historyBody.innerHTML = '';
  history.forEach(game => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${game.player1}</td>
      <td>${game.player2}</td>
      <td>${game.winner}</td>
    `;
    historyBody.appendChild(row);
  });
}
