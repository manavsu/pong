const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 60;
const paddleSpeed = 6;

// Ball properties
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Paddle positions
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

// Control keys
const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
};

// Game loop
function gameLoop() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#fff';
    context.fillRect(10, paddle1Y, paddleWidth, paddleHeight); // Left paddle
    context.fillRect(canvas.width - 20, paddle2Y, paddleWidth, paddleHeight); // Right paddle

    // Draw ball
    context.fillRect(ballX, ballY, ballSize, ballSize);

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY < 0 || ballY > canvas.height - ballSize) {
        ballSpeedY *= -1;
    }

    // Ball collision with left paddle
    if (
        ballX <= 20 &&
        ballY + ballSize >= paddle1Y &&
        ballY <= paddle1Y + paddleHeight
    ) {
        ballSpeedX *= -1;
        const deltaY = (ballY - paddle1Y) - paddleHeight / 2;
        ballSpeedY = deltaY * 0.2;
    }

    // Ball collision with right paddle
    if (
        ballX >= canvas.width - 20 - ballSize &&
        ballY + ballSize >= paddle2Y &&
        ballY <= paddle2Y + paddleHeight
    ) {
        ballSpeedX *= -1;
        const deltaY = (ballY - paddle2Y) - paddleHeight / 2;
        ballSpeedY = deltaY * 0.2;
    }

    // Ball goes out of bounds (left or right)
    if (ballX < 0) {
        // Right player scores
        console.log("Right player scores!");
        resetBall();
    } else if (ballX > canvas.width) {
        // Left player scores
        console.log("Left player scores!");
        resetBall();
    }

    // Move paddles
    if (keys.w && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
    if (keys.s && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }
    if (keys.ArrowUp && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    }
    if (keys.ArrowDown && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += paddleSpeed;
    }

    requestAnimationFrame(gameLoop);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
}

// Event listeners for key presses
window.addEventListener('keydown', function (e) {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
});

window.addEventListener('keyup', function (e) {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

// Start the game loop
requestAnimationFrame(gameLoop);