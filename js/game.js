class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.player = new Player(
            this.gameScreen,
            0,
            0,
            320,
            240,
            "./images/player.png" 
        );
        this.height = '100vh';
        this.width = `100vw`; 
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrequency = Math.round(1000 / 60);
    }

    start() {
        this.gameScreen.style.height = `${this.height}`;
        this.gameScreen.style.width = `${this.width}`;

        this.startScreen.style.display = "none";

        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    }

    gameLoop() {
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }
    updateLives() {
        document.getElementById('lives').textContent = this.lives;
    }
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }

    endGame() {
        this.updateLives();
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
        
    }


    update() { 
        this.updateScore()
        this.updateLives()
        this.player.move(); 

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.score++;
                i--; 
            }
            else if (obstacle.top > window.innerHeight) {
                this.lives--;
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            }

            if (this.lives === 0) {
                this.endGame();
            }
        }
        
        if (Math.random() > 0.98 && this.obstacles.length < 3) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = '10vh';
        this.height = '10vh';
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = '50px';
        this.element.style.bottom = `5px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;

        if (this.left < 10) {
            this.left = 10;
        }

        if (this.left > window.innerWidth - this.width -50) {
            this.left = window.innerWidth - this.width -50; // not working
        }

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
    }

    didCollide(obstacle) { 
        const playerRect = this.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
        const obstacleRect = obstacle.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) { 
            return true;
        } else {
            return false;
        }
    }
}

class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = randomIntFromInterval (50, window.innerWidth -50);
        this.top = 0;
        this.width = 100;
        this.height = 100;
        this.element = document.createElement("img");
        this.element.src = "./images/ball.png";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.gameScreen.appendChild(this.element);
    }

    updatePosition() {
        // Update the obstacle's position based on the properties left and top
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    move() {
        this.top += 2;
        this.updatePosition();
    }
}


