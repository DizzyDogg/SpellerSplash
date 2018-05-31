export default class GradeSelectScene extends Phaser.Scene {
    constructor (config, key = 'GradeSelect') {
        super({ key: key });
    }

    preload () {
    }

    init () {
    }

    create () {
        var centerX = this.sys.game.config.width / 2;
        var centerY = this.sys.game.config.height / 2;

        var firstGrade = this.add.text(
	    centerX,
	    100,
	    'First Grade',
	    {fontFamily: 'Arial', fontSize: 32, color: '#f00'}
	).setOrigin(0.5);
        firstGrade.setInteractive();
        firstGrade.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        });

    }

    update () {
    }
};
