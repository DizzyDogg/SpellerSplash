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
        var centerX = this.sys.game.config.width / 2;
        var centerY = this.sys.game.config.height / 2;

        var creditsTitle = this.add.text(
            centerX,
            100,
            'CREDITS',
            {fontFamily: 'Arial', fontSize: 32, color: '#f00'}
        ).setOrigin(0.5);
        creditsTitle.setInteractive();
        creditsTitle.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        });

        var kenneyLogo = this.add.image(centerX, 200, 'kenney-logo');
        kenneyLogo.setInteractive();
        kenneyLogo.on('pointerdown', () => {
            this.input.stopPropagation();
            // This appears to work for desktop browsers. I hope it will
            // request an external browser on mobile devices.
            window.open('https://kenney.nl', '_system');
        })

        var phaserLogo = this.add.image(centerX, 300, 'phaser3-logo');
        phaserLogo.setScale(0.5);
        phaserLogo.setInteractive();
        phaserLogo.on('pointerdown', () => {
            this.input.stopPropagation();
            // This appears to work for desktop browsers. I hope it will
            // request an external browser on mobile devices.
            window.open('https://phaser.io', '_system');
        })

        var worknikLogo = this.add.image(centerX, 400, 'wordnik-logo');
        worknikLogo.setInteractive();
        worknikLogo.on('pointerdown', () => {
            this.input.stopPropagation();
            window.open('https://www.wordnik.com/', '_system');
        })

        var backButton = this.add.text(
            centerX,
            500,
            'BACK',
            {fontFamily: 'Arial', fontSize: 32, color: '#f00'}
        ).setOrigin(0.5);
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        });
    }
};
