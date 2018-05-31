export default class WordChecker {
    constructor (word) {
        this.word = word;
        this.progress = 0;
        this.fails = 0;
    }

    guess (letter) {
        let actualLetter = this.word.charAt(this.progress);
        if (actualLetter.match(letter)) {
            this.progress++;
            this.events.emit('guessCorrect', get_word_progress());
        }
        else {
            this.events.emit('guessFail', get_word_progress());
            this.fails++;
        }
    }

    get_failures () {
        return this.fails;
    }

    get_word () {
        return this.word;
    }

    get_word_progress () {
        let unknowns = this.word.length - this.progress;
        let wordSoFar = this.word.substring(0, this.progress);
        //Should I be adding underscores for the still unknown letters?
        for (unknowns; unknowns > 0; unknowns--) {
            wordSoFar + '_';
        }
        return wordSoFar;
    }
}
