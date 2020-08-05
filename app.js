/*
Game function
-player must guess a number between a min and max
-player gets a certain amount of guesses
-notify player of guesses remaining
-notify player of correct answer if lose
-let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//  UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    };
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);
    }

    // Check if won
    if(guess === winningNum){
        // Game over, won
        gameOver(true, `Congrats, you picked the correct number of ${guess}`)
    }else{
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over, lost
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
        }else{
            // Game continues, answer wrong
             // Change border color
             guessInput.style.borderColor = 'red';
            
            //  clear input
            guessInput.value = '';
            setMessage(`${guess} is not correct. You have ${guessesLeft} guesses remaining`, 'red')
        }


    }
});


// Game over
function gameOver(won, msg){
    let color;
    won == true ? color = 'green' : color = 'red';
    
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);   
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
console.log(winningNum);