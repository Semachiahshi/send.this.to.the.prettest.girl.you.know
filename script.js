const board = document.getElementById('game-board');

// Vytvoření prázdné mřížky
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}

let currentPlayer = 'X';

// Přidání logiky klikání na políčka
board.addEventListener('click', (e) => {
    const cell = e.target;

    // Kontrola, jestli klikáme na prázdné políčko
    if (cell.classList.contains('cell') && !cell.classList.contains('taken')) {
        cell.textContent = currentPlayer; // Nastaví aktuální hráče
        cell.classList.add('taken');     // Označí pole jako obsazené

        // Přepnutí hráče
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});
