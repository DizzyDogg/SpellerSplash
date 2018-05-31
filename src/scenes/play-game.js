import SelectLetter from '../interfaces/select-letter';
import WordChecker from '../core/word-checker';
import GradeWordList from '../config/wordlist.json';
import WordFactory from '../ui/word-factory';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
        let apiKey = '&api_key=45ac016abb9c08d154008021412018f92ba8ecb481d9fb74c';
        let apiURL = "https://api.wordnik.com/v4/word.json/"+this.word;
        let apiAudioURL = apiURL+"/audio?useCanonical=false&limit=50"+apiKey;
        let apiDefURL = apiURL+"/useCanonical=false&includeSuggestions=true"+apiKey;

        // hardcoded audio for now for just kitchen word as the url
        // cannot be dynamically loaded into an web audio file
        // We think it might have to do with the fact that there isn't
        // an extention on the end of the url
        // leaving the call to get the audio file url below for once we figure out this issue
        this.load.audio('speaking', 'kitchen.mp3');
        // fetch(apiAudioURL, {
        //     method: 'GET',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json())
        // .catch(error => console.error('Error:', error))
        // .then(response => console.log('Success:', response[0].fileUrl));

        this.load.image('audio_button', 'audio.png');
        this.load.image('def_button', 'dictionary.png');
        this.load.audio('loser', 'timeup.mp3');
    }


    init (data) {
        this.selectLetter = new SelectLetter(this);
        this.grade = data.grade;
        this.timeLeft = 100;
        this.wordImg = new WordFactory(this);
        this.won = 0;
    }

    wordPicker() {
        let myWordList = GradeWordList["grade"+this.grade];
        return myWordList[Math.floor(Math.random()*myWordList.length)];
    }

    wordnik(apiType, word) {
        let apiKey = '&api_key=45ac016abb9c08d154008021412018f92ba8ecb481d9fb74c';
        let apiBaseURL = "https://api.wordnik.com/v4/word.json/"+word;
        if (apiType === 'definition') {
            if (this.sys.registry.has('def-'+word)) {
                return;
            } else {
                this.sys.registry.set('def-'+word, '');
                let apiURL = apiBaseURL+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false"+apiKey;
                let resp = fetch(apiURL, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => { this.sys.registry.set('def-'+word, response[0].text) });
            }
        } else if (apiType === 'audio') {
            let apiURL = apiBaseURL+"/audio?useCanonical=false&limit=50"+apiKey;
            this.sound.play('speaking');
        } else {
            console.log('nothing to do');
        }
    }

    setDef (parent, key, data) {
        this.wordDefinition.setText(data);
    }

    showTimer () {
        if (this.won) return;
        this.timerText.setText(this.timeLeft);
        if (this.timeLeft > 0) {
            this.time.delayedCall(1000, this.showTimer, [], this);
            this.timeLeft--;
        }
        else {
            this.sound.play('loser');
        }
    }

    create () {
        this.newWord();
        let centerX = this.sys.game.config.width / 2;
        let centerY = this.sys.game.config.height / 2;
        let title = this.add.text( centerX, 100, 'Play Scene', {fontFamily: 'Arial', fontSize: 32, color: '#f00'}).setOrigin(0.5);
        let title1 = this.add.text( centerX, 200, this.grade + ' grade', {fontFamily: 'Arial', fontSize: 32, color: '#f00'}).setOrigin(0.5);
        let mainMenu = this.add.text( centerX, 300, 'Main Menu', {fontFamily: 'Arial', fontSize: 32, color: '#f00'}).setOrigin(0.5);
        this.timerText = this.add.text( 20, 20, "Loading", {fontFamily: 'Arial', fontSize: 32, color: '#f00'} );
        this.showTimer();
        mainMenu.setInteractive();
        mainMenu.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        });

        this.selectLetter.events.on('keypress', (key) => {
            console.log(key);
            this.wordChecker.guess(key);
        });

        let audioButton = this.make.image({ x: this.sys.game.config.width - 50, y: 50, key: 'audio_button' });
        let defButton = this.make.image({ x: this.sys.game.config.width - 150, y: 50, key: 'def_button' });
        audioButton.setInteractive();
        audioButton.on('pointerdown', () => {
            this.wordnik('audio',this.word);
        });
        defButton.setInteractive();
        defButton.on('pointerdown', () => {
            this.wordnik('definition',myWord);
        });
        this.wordDefinition = this.add.text( 10, this.sys.game.config.height-80, '', {fontFamily: 'Arial', fontSize: 20, color: '#f00'});
        this.registry.events.on('changedata', this.setDef, this);
    }

    newWord () {
        let word = this.wordPicker();
        console.log('Your word is: '+ word);
        this.wordChecker = new WordChecker(word, this);

        this.wordChecker.events.on('guessCorrect', (wordSoFar) => {
            console.log("correct: " + wordSoFar);
        });
        this.wordChecker.events.on('guessFail', (wordSoFar) => {
            console.log("fail: " + wordSoFar);
        });
        this.wordChecker.events.on('winWord', (word) => {
            this.won++;
            console.log('You spelled ' + word + ' correctly!');
            this.newWord();
        });

        let progress = this.wordChecker.get_word_progress();
        this.displayWord(progress);
    }

    displayWord (word) {
        let centerX = this.sys.game.config.width / 2;
        let centerY = this.sys.game.config.height / 2;

        console.log('displayWord()' + word);
        // TODO: potentially need to consider blowing away the old letters
        this.currentWord = this.wordImg.createWord(word);
        this.currentWord.setPosition(this.centerX, this.centerY - 50);
        console.log(centerX, centerY - 50);
        this.currentWord.setScale(0.3);
    }

    update () {
    }
};
