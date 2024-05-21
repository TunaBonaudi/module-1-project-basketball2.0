window.onload = function () {
    const startButton = document.getElementById("start-game");
    const restartButton = document.getElementById("restart-button");
    let game; 

    function handleKeydown(event) {
        const key = event.key;
        console.log('key', key)
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowRight",
        ];

        if (possibleKeystrokes.includes(key)) {
            event.preventDefault();


            switch (key) {
                case "ArrowLeft":
                    game.player.directionX = -4;
                    break;
                case "ArrowRight":
                    game.player.directionX = 4;
                    break;
            }
        }
    }

    function startGame() {
        game = new Game();
        document.getElementById ('stats').style.display = 'block';
        game.start();
        
    }

    function restartGame() {
        location.reload();
    }

    window.addEventListener("keydown", handleKeydown);

    startButton.addEventListener("click", function () {
        startGame();
    });

    restartButton.addEventListener("click", function () {
        startGame();
    });

};
