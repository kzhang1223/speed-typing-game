window.addEventListener('load', init);

// Global variables
let time = 5;
let score = 0;
let highScore = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highScoreDisplay = document.querySelector('#highscore');

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
    // load word from array
    showWord(words);
    
    // call countdown every second
    setInterval(countdown, 1000);

    // check game status
    setInterval(checkStatus, 50);
};

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
    } else if (time === 0) {
        // game over
        isPlaying = false;
    }
    // show time
    timeDisplay.innerHTML = time;
}

// check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!';
    }
}