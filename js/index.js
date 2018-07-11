
function checkGuess() {
    let userGuess = Number(guessField.value); // Number? -- display of'Postive interger only!' 
    // pastGuesses defined in <script> html 
    if (guessCount == 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent = guesses.textContent + userGuess + ' ';

    if (userGuess == randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = '#8BC34A';
        lowOrHi.textContent = '';
        setGameOver();
    }
    else if (guessCount == 10) {
        pastGuesses.push(userGuess);
        lastResult.textContent = 'You used 10 chances! GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
    }

    else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = '#FFC107';

        if (isNaN(userGuess) || Math.sign(userGuess) == -1 || Math.sign(userGuess) == 0) {
            lastResult.textContent = 'Postive interger only!';
        }

        else if (pastGuesses.includes(userGuess)) {
            lastResult.textContent = 'You guessed this number. Try anotner number!';
            lowOrHi.textContent = ' You have ' + (10 - guessCount) + ' chances left';
        }

        else if (userGuess < randomNumber) { // ( Math.abs(userGuess - randomNumber) < Math.abs(pastGuesses[pastGuesses.length-1] - randomNumber) ) : new guess closer to the answer -->lowOrHi.textContent doesnt work.  

            pastGuesses.push(userGuess);
            lowOrHi.textContent = 'Too low! You have ' + (10 - guessCount) + ' chances left';
        } else if (userGuess > randomNumber) {
            pastGuesses.push(userGuess);
            lowOrHi.textContent = 'Too high!' + ' You have ' + (10 - guessCount) + ' chances left';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}


function resetGame() {
    guessCount = 1;
    pastGuesses = [];

    let resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}