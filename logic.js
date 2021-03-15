let canvas;
let canvasContext;
let ballX = 75;
let ballY = 200;
let ballSpeedX = 15;
let ballSpeedY = 6;
let playerPaddle = 200
let computerPaddle = 200;
const PADDLE_HEIGHT = 150;
let playerScore = 0;
let computerScore = 0;
window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    
    let framesPerSecond = 30;

    setInterval(function () {drawEverything(), moveEverything()}, 1000/framesPerSecond);

    canvas.addEventListener("mousemove", function (event) {
        let mousePos = calculateMousePos(event);
        playerPaddle = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function calculateMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function computerMovement() {
    let paddleCenter = computerPaddle + PADDLE_HEIGHT/2;
    if (paddleCenter < ballY - 35) {
        computerPaddle += 8;
    }
    else if (paddleCenter > ballY + 35) {
        computerPaddle -= 8;
    }
}

function moveEverything () {
    computerMovement();
    ballX += ballSpeedX;
    if (ballX > canvas.width) {
        if (ballY > computerPaddle && ballY < computerPaddle + PADDLE_HEIGHT)
        {
            ballSpeedX = - ballSpeedX;
            let deltaY = ballY - (playerPaddle + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.1;
        }
        else {
            ballReset();
            playerScore++;
        }
    }
    if (ballX < 0) {
        if (ballY > playerPaddle && ballY < playerPaddle + PADDLE_HEIGHT)
        {
            ballSpeedX = - ballSpeedX;
            let deltaY = ballY - (computerPaddle + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.1;
        }
        else {
            ballReset();
            computerScore++;
        }
    }
    ballY += ballSpeedY;
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function drawEverything () {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawCircle(ballX, ballY, 10, "white");
    drawRect(2, playerPaddle, 10, PADDLE_HEIGHT, "white");
    drawRect(canvas.width - 10, computerPaddle, 10, PADDLE_HEIGHT, "white");
    canvasContext.fillText(playerScore, 100, 100);
    canvasContext.fillText(computerScore, 700, 100);
}

function drawCircle(X, Y, rad, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(X, Y, rad, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawRect (topX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(topX, topY, width, height);
}