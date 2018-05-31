export default class CreditsScene extends Phaser.Scene {
    constructor (config, key = 'Credits') {
        super({ key: key });
    }

    preload () {
        this.load.image('phaser3-logo', 'phaser3-logo.png');
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

	var phaserLogo = this.add.image(centerX, 200, 'phaser3-logo');
	phaserLogo.setInteractive();
	phaserLogo.on('pointerdown', () => {
            this.input.stopPropagation();
	    // This appears to work for desktop browsers. I hope it will
	    // request an external browser on mobile devices.
	    window.open('http://phaser.io', '_system');
	})

    }
};
