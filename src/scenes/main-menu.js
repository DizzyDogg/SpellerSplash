import WordFactory from '../ui/word-factory';

export default class MainMenuScene extends Phaser.Scene {
    constructor (config, key = 'MainMenu') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
        this.load.image('play_button', 'play.png');
        this.load.image('credits_button', 'credits.png');
        this.load.atlas('letters', 'blue_letters.png', 'blue_letters.json');
    }

    create () {
        this.CENTERX = this.sys.game.config.width / 2;
        this.CENTERY = this.sys.game.config.height / 2;

        this.makeWord = new WordFactory(this);
        let playButton = this.makeWord.createWord('play');
        playButton.setPosition(this.CENTERX, this.CENTERY);
        playButton.setScale(0.5);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('GradeSelect');
        });

        let creditsButton = this.makeWord.createWord('credits');
        creditsButton.setPosition(this.CENTERX, this.CENTERY+250);
        creditsButton.setScale(0.125);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('Credits');
        });
    }
};
