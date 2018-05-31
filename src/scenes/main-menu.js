export default class MainMenuScene extends Phaser.Scene {
    constructor (config, key = 'MainMenu') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
        this.load.image('play_button', 'play.png');
        this.load.image('credits_button', 'credits.png');
    }

    create () {
        this.CENTERX = this.sys.game.config.width / 2;
        this.CENTERY = this.sys.game.config.height / 2;
        var creditsButton = this.make.image({
            x: this.CENTERX,
            y: this.CENTERY-100,
            key: 'credits_button'
        });
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('Credits');
        });

        var playButton = this.make.image({
            x: this.CENTERX,
            y: this.CENTERY+100,
            key: 'play_button'
        });
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('PlayGame');
        });
    }
};
