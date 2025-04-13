//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var valoX = 0;
var valoY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.width = rows * blockSize;
  board.height = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  //   requestAnimationFrame(update);
  if (gameOver) {
    context.fillStyle = "white";
    context.font = "50px Arial";
    context.fillText("Game Over", board.width / 4, board.height / 2);
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "green";
  snakeX += valoX * blockSize;
  snakeY += valoY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX >= board.width ||
    snakeY < 0 ||
    snakeY >= board.height
  ) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && valoY != 1) {
    valoX = 0;
    valoY = -1;
  } else if (e.code == "ArrowDown" && valoY != -1) {
    valoX = 0;
    valoY = 1;
  } else if (e.code == "ArrowLeft" && valoX != 1) {
    valoX = -1;
    valoY = 0;
  } else if (e.code == "ArrowRight" && valoX != -1) {
    valoX = 1;
    valoY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
