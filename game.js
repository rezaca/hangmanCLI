var inquirer = require('inquirer');
var Word = require('./word');

var randomWord = Word();

//Credit to KEIVON

var progress = '', score = 0, guesses = 15, correctIndices = [];

//Credit to KEIVON

var question = { type: 'input', message: 'Guess a letter!', name: 'letter', default: 'a' }

//Credit to KEIVON

inquirer.prompt([question]).then(function(response) { 
    Game(response); 
});

//Credit to KEIVON
function Letter(letter, word){
    this.letter = letter;
    this.word   = word;
    //Check() method: iterates through word and checks if it contains the letter guessed.
    this.check  = function() {
        var splitWord = this.word.split('');

        // splitWord.forEach(function(i) {
        //     if(this.letter === splitWord[i]) {
        //         splitWord[i] = this.letter;
        //         correctIndices.push(i);
        //     } 
        //     else if(correctIndices.indexOf(i) === -1) splitWord[i] = ' _ ';
        // });
        
        for (var i = 0; i < this.word.length; i++) {
            //True? Retain letter and store index correctly guessed
            if(this.letter === splitWord[i]) {
                splitWord[i] = this.letter;
                correctIndices.push(i);
            }
            //Else if index not correctly guessed before, replace index with underscore
            else if(correctIndices.indexOf(i) === -1) splitWord[i] = ' _ ';
        };
        return this.word = splitWord.join(''); //Return updated string
    };
};


// Credit to KEIVON
function Game(response) {
    //Creates a new letter object with response.letter and the current randomWord (for comparison)
    response = new Letter(response.letter, randomWord);

    //Progress gets the result of response.check(), which returns an updated string with the user's guess factored in
    progress = response.check();

    //If user's letter guess (response.letter) is not in the randomWord, decrement guesses
    if (randomWord.indexOf(response.letter) === -1) guesses--;

    //Log guessesRemaining and user's progress
    console.log('Guesses remaining: ', guesses);
    console.log(progress);

    //FIX THIS REPETITION======================
    //If the progress string has no more underscores, increment score and generate new randomWord
    if (progress === randomWord) {
        score++;
        guesses = 15;
        correctIndices = [];
        randomWord = Word();
        console.log('Great job! Current score:', score);
        console.log('Next word...');
    }
    //Else if user has no more guesses, decrement score and generate new random word
    else if (guesses < 1) {
        score--;
        guesses = 15;
        correctIndices = [];
        randomWord = Word();
        console.log('Out of guesses :( Current score:', score);
        console.log('Next word...');
    }
    //FIX THIS REPETITION======================

    //Prompt user for next letter guess, invoke Game() with user response
    inquirer.prompt(question).then(function(response) { 
        Game(response); 
    });
}

module.exports = Game;