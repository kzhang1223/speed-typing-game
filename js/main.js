window.addEventListener('load', init);

// Global variables

// Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
};

const difficultys = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard'
};

const modes = {
    animals: 'animals',
    fruits: 'fruits',
    random: 'random'
};

// to change level 
let currentLevel = levels.easy;
let currentDifficulty = difficultys.easy;

// to change mode 
let currentMode = modes.random;

let time = currentLevel;
let score = 0;
// let highScore = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
// const highScoreDisplay = document.querySelector('#highscore');
const difficulty = document.querySelector('#difficulty');
const topText = document.querySelector('.lead');
const timeLeft = document.querySelector('#time-left');
const mode = document.querySelector('#mode');

let originalTopText = 'Type The Given Word Within ' + seconds.innerHTML + ' Seconds:';

const words = [
    'hello',
    'horse',
    'cat',
    'dog',	
    'fish',
    'bird',
    'orange',
    'yellow',
    'blue',
    'green',
    'black',
    'table',
    'chair',
    'desk',
    'bookcase',
    'bed',
    'teacher',
    'school',
    'student',
    'homework',
    'apple',
    'banana',
    'kiwi',
    'grape',
    'mango'
];

// Initialize game
function init() {
    // start screen
    topText.innerHTML = 'Type "start" to start again';
    currentWord.innerHTML = 'start';

    // start matching on word input 
    wordInput.addEventListener('input', startMatch);

    // show number of seconds in ui
    seconds.innerHTML = currentLevel;

    // check game status
    setInterval(checkStatus, 50);
};


// start match
function startMatch() {
    if (matchWords()) {
        if (currentWord.innerHTML !== 'start') {
            score++;
        }
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
    }
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// match current word to word input
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        if (currentWord.innerHTML !== 'start') {
            message.innerHTML = 'Correct!';
            message.style.color = 'green';
        } else {
            // call countdown every second
            setInterval(countdown, 1000);
            topText.innerHTML = originalTopText;
            message.style.color = 'green';
            message.innerHTML = 'Go!';
        }
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// pick and show random word
function showWord(words) {
    // generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    
    // output random word
    currentWord.innerHTML = words[randIndex];
}

// countdown timer 
function countdown() {
    // make sure time is not run out
    if (time > 0) {
        // decrement
        time--;
        if (time <= 3) {
            timeLeft.style.color = 'red';
            timeDisplay.style.color = 'red';
        } else {
            timeLeft.style.color = 'black';
            timeDisplay.style.color = 'black';
        }
    } else if (time === 0) {
        // game over
        isPlaying = false;
    }
    // show time
    timeDisplay.innerHTML = time;
}

function checkDifficulty() {
    if (difficulty.value !== currentDifficulty) {
        currentDifficulty = difficulty.value;

        switch(currentDifficulty) {
            case 'easy':
                currentLevel = levels.easy;
                seconds.innerHTML = currentLevel;
                originalTopText = 'Type The Given Word Within ' + seconds.innerHTML + ' Seconds:';
                break;
            case 'medium':
                currentLevel = levels.medium;
                seconds.innerHTML = currentLevel;
                originalTopText = 'Type The Given Word Within ' + seconds.innerHTML + ' Seconds:';
                break;
            case 'hard':
                currentLevel = levels.hard;
                seconds.innerHTML = currentLevel;
                originalTopText = 'Type The Given Word Within ' + seconds.innerHTML + ' Seconds:';
                break;
            default:
                console.log('difficulty is undefined');
                break;
        };
    }
}

// function checkMode() {
//     if ()
// }

// check game status and difficulty
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!';
        message.style.color = 'red';
        timeLeft.style.color = 'black';
        timeDisplay.style.color = 'black';
        score = -1;

        checkDifficulty();

        checkMode();

        topText.innerHTML = 'Type "start" to start again';
        currentWord.innerHTML = 'start';
    }
}