// Get all the squares on the board
const squares = document.querySelectorAll('.square');

// Initialize the game state
let currentPlayer = 'x';
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

// Add a click event listener to each square
squares.forEach(square => {
    square.addEventListener('click', () => {
        // If the square is not already marked and the game is not over
        if (square.innerHTML === '' && !gameOver) {
            // Mark the square with the current player's symbol
            square.innerHTML = currentPlayer;
            square.classList.add(currentPlayer);

            // Update the game state
            board[square.id] = currentPlayer;
            checkForWinner();
            switchPlayer();

            // If it's the computer's turn
            if (currentPlayer === 'o' && !gameOver) {
                // Simulate the computer's move
                const computerMove = getComputerMove();
                squares[computerMove].click();
            }
        }
    });
});

// Add a click event listener to the reset button
const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', resetGame);

// Switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

// Check if there is a winner or a tie
function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
            alert(`${currentPlayer.toUpperCase()} wins!`);
        } else if (!board.includes('')) {
            gameOver = true;
            alert('Tie game!');
        }
    });
}

// Get the computer's move
function getComputerMove() {
    // First, check if the computer can win
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'o';
            if (checkForWinnerHelper('o')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    // Second, check if the player can win
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'x';
            if (checkForWinnerHelper('x')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    // Third, try to take the center square
    if (board[4] === '') {
        return 4;
    }

    // Fourth, take a random available square
    while (true) {
        const i = Math.floor(Math.random() * board.length);
        if (board[i] === '') {
            return i;
        }
    }
}

// Check if a player has won
function checkForWinnerHelper(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }

    return false;
}
// Reset the game
function resetGame() {
    // Clear the board
    squares.forEach(square => {
        square.innerHTML = '';
        square.classList.remove('x');
        square.classList.remove('o');
    });

    // Reset the game state
    currentPlayer = 'x';
    gameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
}