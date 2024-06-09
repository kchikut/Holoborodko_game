const boardSize = 10;
const bombCount = 10;
const board = [];
const gameBoardElement = document.getElementById('game-board');

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            const cell = {
                element: document.createElement('div'),
                x: i,
                y: j,
                isBomb: false,
                isRevealed: false,
                adjacentBombs: 0
            };
            cell.element.classList.add('cell');
            cell.element.addEventListener('click', () => revealCell(cell));
            gameBoardElement.appendChild(cell.element);
            row.push(cell);
        }
        board.push(row);
    }
}

function placeBombs() {
    let bombsPlaced = 0;
    while (bombsPlaced < bombCount) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        if (!board[x][y].isBomb) {
            board[x][y].isBomb = true;
            bombsPlaced++;
        }
    }
}

function calculateAdjacentBombs() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (!board[i][j].isBomb) {
                let count = 0;
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const newX = i + x;
                        const newY = j + y;
                        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY].isBomb) {
                            count++;
                        }
                    }
                }
                board[i][j].adjacentBombs = count;
            }
        }
    }
}

function revealCell(cell) {
    if (cell.isRevealed || cell.element.classList.contains('flag')) return;
    cell.isRevealed = true;
    cell.element.classList.add('revealed');
    if (cell.isBomb) {
        cell.element.classList.add('bomb');
        setTimeout(() => {
            alert('Game Over!');
            location.reload();
        }, 100);
    } else {
        cell.element.textContent = cell.adjacentBombs;
        checkWin();
    }
}

function revealAllBombs() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].isBomb) {
                board[i][j].element.classList.add('bomb');
                board[i][j].element.classList.add('revealed');
            }
        }
    }
}

function checkWin() {
    let revealedCells = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].isRevealed && !board[i][j].isBomb) {
                revealedCells++;
            }
        }
    }
    if (revealedCells === boardSize * boardSize - bombCount) {
        setTimeout(() => {
            alert('Congratulations! You Win!');
            location.reload();
        }, 100);
    }
}

function init() {
    createBoard();
    placeBombs();
    calculateAdjacentBombs();
}

init();
