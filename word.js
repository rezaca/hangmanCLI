//Constructor to pick a random word
var Word = function (words, random){
    this.words = ['coffee', 'sugar', 'cream'];
    this.random = Math.floor(Math.random() * this.words.length);
    return this.words[this.random];
};


module.exports = Word;