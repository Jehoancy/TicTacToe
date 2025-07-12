// index_script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],     // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],     // Columns
  [0, 4, 8], [2, 4, 6]                 // Diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  currentPlayer = 'X';
  gameActive = true;
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    message.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
function checkWin(player) {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

restartButton.addEventListener('click', startGame);

startGame();