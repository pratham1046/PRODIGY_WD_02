const tiles = document.querySelectorAll('.tile');
const displayPlayer = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleClick = (event) => {
  const tile = event.target;
  const cellIndex = tile.getAttribute('data-cell-index');

  if (board[cellIndex] !== '' || !isGameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  tile.classList.add(currentPlayer);
  tile.textContent = currentPlayer;

  if (checkWin()) {
    announcer.textContent = `${currentPlayer} Wins!`;
    announcer.classList.remove('hide');
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    announcer.textContent = 'Draw!';
    announcer.classList.remove('hide');
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayPlayer.textContent = currentPlayer;
  }
};

const checkWin = () => {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
};

const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  displayPlayer.textContent = currentPlayer;
  announcer.textContent = '';
  announcer.classList.add('hide');
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('X', 'O');
  });
};

tiles.forEach(tile => tile.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

resetGame(); // Initialize the game
