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

function drawSnakePart(x, y, isHead) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + box / 2, y + box / 2, box / 2 - 2, 0, Math.PI * 2);
    ctx.fillStyle = isHead ? '#ffe066' : '#b2f2ff';
    ctx.shadowColor = isHead ? '#ffd700' : '#69dbff';
    ctx.shadowBlur = isHead ? 12 : 6;
    ctx.fill();
    ctx.restore();
    // 눈 그리기 (머리만)
    if (isHead) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + box / 2 - 4, y + box / 2 - 3, 2, 0, Math.PI * 2);
        ctx.arc(x + box / 2 + 4, y + box / 2 - 3, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.restore();
    }
}

function drawFood(x, y) {
    // 귀여운 사과
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + box / 2, y + box / 2, box / 2 - 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6f61';
    ctx.shadowColor = '#ffb3ab';
    ctx.shadowBlur = 8;
    ctx.fill();
    // 잎사귀
    ctx.beginPath();
    ctx.arc(x + box / 2, y + box / 2 - 7, 3, 0, Math.PI, true);
    ctx.fillStyle = '#51cf66';
    ctx.fill();
    ctx.restore();
}

function draw() {
    ctx.fillStyle = '#e3fafc';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        drawSnakePart(snake[i].x, snake[i].y, i === 0);
    }

    drawFood(food.x, food.y);

    ctx.fillStyle = '#495057';
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
        ctx.fillStyle = '#ff8787';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', 80, 200);
        return;
    }

    snake.unshift(newHead);
}

gameInterval = setInterval(draw, 100);
