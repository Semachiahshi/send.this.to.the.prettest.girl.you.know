const playerSelect = document.getElementById('player-select');
const gameBoard = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player');
const playerNameSpan = document.getElementById('player-name');

let currentPlayer = ''; // 'User 1' nebo 'User 2'

// Herní mřížka
const boardState = Array(9).fill(null); // Pole o velikosti 9

// Výběr hráčů
document.getElementById('player1-btn').addEventListener('click', () => startGame('User 1'));
document.getElementById('player2-btn').addEventListener('click', () => startGame('User 2'));

function startGame(player) {
    currentPlayer = player;
    playerNameSpan.textContent = currentPlayer;
    playerSelect.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    currentPlayerDisplay.classList.remove('hidden');
    drawBoard();
}

// Vykreslení hrací plochy
function drawBoard() {
    gameBoard.innerHTML = ''; // Vyprázdní hrací plochu
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; // Přidání indexu pro logiku
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    // Pokud je políčko už obsazené, nic nedělej
    if (boardState[index]) return;

    // Nastav aktuální hráče a změň stav
    boardState[index] = currentPlayer === 'User 1' ? 'X' : 'O';
    cell.textContent = boardState[index];
    cell.classList.add('taken');

    // Přepnutí hráče
    currentPlayer = currentPlayer === 'User 1' ? 'User 2' : 'User 1';
    playerNameSpan.textContent = currentPlayer;

    // Kontrola výhry
    checkWinner();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Řádky
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Sloupce
        [0, 4, 8], [2, 4, 6]             // Diagonály
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            alert(`${currentPlayer === 'User 1' ? 'User 2' : 'User 1'} vyhrál!`);
            resetGame();
            return;
        }
    }

    // Pokud je mřížka plná a nikdo nevyhrál, je to remíza
    if (boardState.every(cell => cell)) {
        alert('Remíza!');
        resetGame();
    }
}

function resetGame() {
    currentPlayer = '';
    boardState.fill(null);
    gameBoard.classList.add('hidden');
    currentPlayerDisplay.classList.add('hidden');
    playerSelect.classList.remove('hidden');
}
