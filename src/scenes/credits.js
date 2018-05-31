export default class CreditsScene extends Phaser.Scene {
    constructor (config, key = 'Credits') {
        super({ key: key });
    }

    preload () {
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
    }
};
