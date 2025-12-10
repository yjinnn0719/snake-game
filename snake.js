const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let food = randomFood();
let score = 0;
let gameInterval;

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function collision(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) return true;
    }
    return false;
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#4caf50' : '#8bc34a';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#f44336';
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 390);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvasSize || snakeY >= canvasSize ||
        collision(newHead, snake)
    ) {
        clearInterval(gameInterval);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', 80, 200);
        return;
    }

    snake.unshift(newHead);
}

gameInterval = setInterval(draw, 100);
