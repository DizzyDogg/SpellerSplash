export default class WordChecker {
    constructor (word, scene) {
        if (scene instanceof Phaser.Scene) {
            this.scene = scene; // store our scene
            this.events = Phaser.Events ? new Phaser.Events.EventEmitter() : new Phaser.EventEmitter(); // so we can emit a keypress event
        }
        this.word = word;
        this.progress = 0;
        this.fails = 0;
    }

    guess (letter) {
        let actualLetter = this.word.charAt(this.progress);
        if (actualLetter.match(letter)) {
            this.progress++;
            this.events.emit('guessCorrect', this.get_word_progress());
            if (this.progress === this.word.length) { // Win condition
                this.events.emit('winWord', this.word);
            }
        }
        else {
            this.events.emit('guessFail', this.get_word_progress());
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
            wordSoFar = wordSoFar + '_';
        }
        return wordSoFar;
    }
}
