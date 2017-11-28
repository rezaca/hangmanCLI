var inquirer = require('inquirer');
var Word = require('./word');

randomWord = Word();

var question = { type: 'input', message: 'Guess a letter!', name: 'letter', default: 'a' };

var progress = '', score = 0, guesses = 15, correctIndices = [];

inquirer.prompt([question]).then(letter => { Letter(letter);});

//Constructor to split the random word
function Letter(letter, word){
    
    this.letter = letter;
    this.word   = randomWord;
    //Check() method: iterates through word and checks if it contains the letter guessed.
    this.check  = function() {
        var splitWord = this.word.split('');

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

    progress = letter.check();
    

};

module.exports = Letter;