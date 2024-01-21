    let container = document.querySelector('#container');
    let dino = document.querySelector('#dino');
    let block = document.querySelector('#block');
    let road = document.querySelector('#road');
    let cloud = document.querySelector('#cloud');
    let score = document.querySelector('#score');
    let gameOver = document.querySelector('#gameOver');
    let controls = document.querySelector('#controls');

    let interval = null;
    let playerScore = 0;

    const scoreCounter = () => {
      playerScore++;
      score.innerHTML = `Score: <b>${playerScore}</b>`;
    };

    window.addEventListener('keydown', (start) => {
      if (start.code == 'Space') {
        startGame();
      }
    });

    window.addEventListener('touchstart', startGame);

    function startGame() {
      gameOver.style.display = 'none';
      block.classList.add('blockActive');
      road.firstElementChild.style.animation = 'animateRoad 1s linear infinite';
      cloud.firstElementChild.style.animation = 'animateCloud 20s linear infinite';
      controls.style.display = 'none';

      playerScore = 0;
      interval = setInterval(scoreCounter, 100);

      // Remova o evento touchstart após o início do jogo
      window.removeEventListener('touchstart', startGame);
    }

    // Dinosaur jump

    window.addEventListener('keydown', (event) => {
      if (event.key == 'ArrowUp' || event.key == 'w') {
        jumpDino();
      }
    });

    window.addEventListener('touchstart', jumpDino);

    function jumpDino() {
      if (dino.classList != 'dinoActive') {
        dino.classList.add('dinoActive');

        // Remova a classe após 0.5s
        setTimeout(() => {
          dino.classList.remove('dinoActive');
        }, 500);
      }
    }

    // Game Over screen

    let result = setInterval(() => {
      let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue('bottom'));
      let blockLeft = parseInt(getComputedStyle(block).getPropertyValue('left'));

      if (dinoBottom <= 100 && blockLeft >= 20 && blockLeft <= 65) {
        gameOver.innerHTML = `Game Over \n <p>Você bateu ${playerScore} pontos.</p>`;
        gameOver.style.display = 'block';
        block.classList.remove('blockActive');
        road.firstElementChild.style.animation = 'none';
        cloud.firstElementChild.style.animation = 'none';

        clearInterval(interval);
        playerScore = 0;

        // Reative o evento touchstart para reiniciar o jogo
        window.addEventListener('touchstart', startGame);
      }
    }, 10);