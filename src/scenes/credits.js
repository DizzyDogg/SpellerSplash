import WordFactory from '../ui/word-factory';

export default class CreditsScene extends Phaser.Scene {
    constructor (config, key = 'Credits') {
        super({ key: key });
    }

    preload () {
        this.load.image('kenney-logo', 'kenney-logo.png');
        this.load.image('phaser3-logo', 'phaser3-logo.png');
        this.load.image('wordnik-logo', 'wordnik-logo.png');
    }

    create () {
        let centerX = this.sys.game.config.width / 2;
        let centerY = this.sys.game.config.height / 2;

        this.makeWord = new WordFactory(this);
        let title = this.makeWord.createWord('credits');
        title.setPosition(centerX, 100);
        title.setScale(0.25);

        let kenneyLogo = this.add.image(centerX, 200, 'kenney-logo');
        kenneyLogo.setInteractive();
        kenneyLogo.on('pointerdown', () => {
            this.input.stopPropagation();
            // This appears to work for desktop browsers. I hope it will
            // request an external browser on mobile devices.
            window.open('https://kenney.nl', '_system');
        })

        let phaserLogo = this.add.image(centerX, 300, 'phaser3-logo');
        phaserLogo.setScale(0.5);
        phaserLogo.setInteractive();
        phaserLogo.on('pointerdown', () => {
            this.input.stopPropagation();
            // This appears to work for desktop browsers. I hope it will
            // request an external browser on mobile devices.
            window.open('https://phaser.io', '_system');
        })

        let worknikLogo = this.add.image(centerX, 400, 'wordnik-logo');
        worknikLogo.setInteractive();
        worknikLogo.on('pointerdown', () => {
            this.input.stopPropagation();
            window.open('https://www.wordnik.com/', '_system');
        })

        let backButton = this.makeWord.createWord('back');
        backButton.setPosition(centerX, 500);
        backButton.setScale(0.25);
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        });
    }
};
