const stage = document.querySelector('#stage');
const ctx = stage.getContext('2d');
const playBtn = document.querySelector('.play');
const playAgainBtn = document.querySelector('.play-again');
const score = document.querySelectorAll('.score');
var interval;

function startGame() {
  updateScore();
  turnRight();
  generateApple();
  game.hasStarted = true;
  game.isOver = false;
  interval = setInterval(playGame, 60);
  document.querySelector('.game.is-ready').classList.add('hidden');
}

function restartGame() {
  document.querySelector('.game.is-over').classList.toggle('hidden');
  resetProperties();
  fillGameBoard();
  fillSnake();
  startGame();
}

function gameOver() {
  return game.snake.trail.some(trail => trail.x === game.snake.x && trail.y === game.snake.y);
}

function resetProperties() {
  game.snake.lastDirection = undefined;
  game.snake.x = 4;
  game.snake.y = 1;
  game.snake.trail = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4 , y: 1 }
  ];
  game.snake.tailLength = 4;
}

function fillGameBoard() {
  ctx.clearRect(0, 0, stage.width, stage.height);
}

function fillSnake() {
  ctx.fillStyle = '#4a26e9';
  for (const trail of game.snake.trail) {
    ctx.fillRect(
      trail.x * game.spaces.lenght,
      trail.y * game.spaces.lenght,
      game.spaces.lenght,
      game.spaces.lenght
    );
  }
  ctx.fillStyle = '#3d21bd';
  ctx.fillRect(
    game.snake.x * game.spaces.lenght,
    game.snake.y * game.spaces.lenght,
    game.spaces.lenght,
    game.spaces.lenght
  );
}

function fillApple() {
  ctx.fillStyle = '#e90624';
  ctx.fillRect(
    game.apple.x * game.spaces.lenght,
    game.apple.y * game.spaces.lenght,
    game.spaces.lenght,
    game.spaces.lenght
  );
}

function hasEatenApple() {
  if (game.apple.x === game.snake.x && game.apple.y === game.snake.y) {
    return true;
  }
  return false;
}

function generateApple() {
  do {
    game.apple.x = Math.floor(Math.random() * game.spaces.totalInXAxis);
    game.apple.y = Math.floor(Math.random() * game.spaces.totalInYAxis);
  } while(game.snake.trail.some(trail => trail.x === game.apple.x && trail.y === game.apple.y));
  fillApple();
}

function updateTrail() {
  game.snake.trail.push({ x: game.snake.x, y: game.snake.y });
  while (game.snake.trail.length > game.snake.tailLength) {
    game.snake.trail.shift();
  }
}

function updateScore() {
  if(game.hasStarted) {
    score.forEach(score => score.innerHTML = String(Number(score.innerHTML) + 10));
  } else {
    score.forEach(score => score.innerHTML = '0');
  }
}

function move() {
  game.snake.x += game.snake.speedX;
  game.snake.y += game.snake.speedY;
}

function turnLeft() {
  if(game.snake.lastDirection !== 'right') {
    game.snake.speedX = -1;
    game.snake.speedY = 0;
    game.snake.lastDirection = 'left';
  }
}

function turnUp() {
  if(game.snake.lastDirection !== 'down') {
    game.snake.speedX = 0;
    game.snake.speedY = -1;
    game.snake.lastDirection = 'up'
  }
}

function turnRight() {
  if(game.snake.lastDirection !== 'left') {
    game.snake.speedX = 1;
    game.snake.speedY = 0;
    game.snake.lastDirection = 'right';
  }
}

function turnDown() {
  if(game.snake.lastDirection !== 'up') {
    game.snake.speedX = 0;
    game.snake.speedY = 1;
    game.snake.lastDirection = 'down'
  }
}

function teleportIfHitWall() {
  if (game.snake.x < game.walls.left) {
    game.snake.x = game.walls.right;
  }
  if (game.snake.x > game.walls.right) {
    game.snake.x = game.walls.left;
  }
  if (game.snake.y < game.walls.top) {
    game.snake.y = game.walls.bottom;
  }
  if (game.snake.y > game.walls.bottom) {
    game.snake.y = game.walls.top;
  }
}

function playGame() {
  move();
  fillGameBoard();
  fillSnake();
  fillApple();
  if(gameOver()) {
    clearInterval(interval);
    game.isOver = true;
    game.hasStarted = false;
    document.querySelector('.game.is-over').classList.toggle('hidden');
  }
  teleportIfHitWall();
  if(hasEatenApple()) {
    generateApple();
    game.snake.tailLength++;
    updateScore();
  }
  updateTrail();
}

function KeyPress() {
  if (!game.hasStarted && event.code === 'Space') {
    if (!game.isOver) {
      startGame();
    } else {
      restartGame();
    }
  } else {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        turnLeft();
        break;
      case 'ArrowUp':
      case 'KeyW':
        turnUp();
        break;
      case 'ArrowRight':
      case 'KeyD':
        turnRight();
        break;
      case 'ArrowDown':
      case 'KeyS':
        turnDown();
        break;
    }
  }
}

window.onload = () => {
  fillGameBoard();
  fillSnake();
}

playBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', restartGame);
document.addEventListener('keydown', KeyPress);