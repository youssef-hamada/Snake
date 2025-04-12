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

//food
var foodX;
var foodY;

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
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    placeFood();
  }

  context.fillStyle = "green";
  snakeX += valoX * blockSize;
  snakeY += valoY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
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
