// Enemies our player must avoid
class Enemy {
    constructor (x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.originalSpeed = speed;
    }
};

// Update the enemy's position. Parameter dt is a time delta between ticks
// to ensure the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
        this.x = -100;
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
class Player {
    constructor (x,y) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the input to the player
Player.prototype.handleInput = function(direction) {
    switch (direction){
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// Keep player inside canvas
Player.prototype.update = function() {
    if (this.x < 1){
        this.x = 1;
    }
    else if (this.x > 405) {
        this.x = 405;
    }
    else if (this.y > 406) {
        this.y = 406;
    }
};

// Return player to initial spot
Player.prototype.goBack = function() {
    this.x = 203;
    this.y = 406;
}

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0,63,Math.random()*200);
const enemy2 = new Enemy(-300,63,enemy1.speed);
const enemy3 = new Enemy(0,146,Math.random()*200);
const enemy4 = new Enemy(-300,146,enemy3.speed);
const enemy5 = new Enemy(0,229,Math.random()*200);
const enemy6 = new Enemy(-300,229,enemy5.speed);
allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
const player = new Player(203,406);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let score = 0;
let highScore = 0;
const scoreSpan = document.querySelector('.score');
const highScoreSpan = document.querySelector('.high-score');

// When player wins, raise score by 1 and increase enemy speed by 10%
function success() {
    score += 1;
    scoreSpan.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreSpan.textContent = highScore;
    }
    allEnemies.forEach(function(enemy) {
        enemy.speed = enemy.speed * 1.1;
    });
}

// When player loses, reset score
function lost() {
    score = 0;
    scoreSpan.textContent = score;
    allEnemies.forEach(function(enemy) {
        enemy.speed = enemy.originalSpeed * 1.1;
    });
}
