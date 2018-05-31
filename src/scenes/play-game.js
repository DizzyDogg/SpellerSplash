import SelectLetter from '../interfaces/select-letter';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    init (data) {
	    this.selectLetter = new SelectLetter(this);
	    this.grade = data.grade;
    }

    create () {
	    let centerX = this.sys.game.config.width / 2;
    	let centerY = this.sys.game.config.height / 2;
        let title = this.add.text( centerX, 100, 'Play Scene', {fontFamily: 'Arial', fontSize: 32, color: '#f00'}).setOrigin(0.5);
        let title1 = this.add.text( centerX, 200, this.grade + ' grade', {fontFamily: 'Arial', fontSize: 32, color: '#f00'}).setOrigin(0.5);
        let mainMenu = this.add.text( centerX, 300, 'Main Menu', {fontFamily: 'Arial', fontSize: 32, color: '#f00'}).setOrigin(0.5);
        mainMenu.setInteractive();
        mainMenu.on('pointerdown', () => {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        });

	    this.selectLetter.events.on('keypress', (key) => {
	        console.log(key);
	    });
    }

    update () {
    }
};
