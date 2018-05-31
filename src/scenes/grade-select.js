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

	var grades = [
		{ 'text': 'First Grade', 'height': 100, 'gradeNumber': 1 },
		{ 'text': 'Second Grade', 'height': 150, 'gradeNumber': 2 },
		{ 'text': 'Third Grade', 'height': 200, 'gradeNumber': 3 },
		{ 'text': 'Fourth Grade', 'height': 250, 'gradeNumber': 4 },
		{ 'text': 'Fifth Grade', 'height': 300, 'gradeNumber': 5 },
		{ 'text': 'Sixth Grade', 'height': 350, 'gradeNumber': 6 },
		{ 'text': 'Seventh Grade', 'height': 400, 'gradeNumber': 7 },
		{ 'text': 'Eighth Grade', 'height': 450, 'gradeNumber': 8 },
		{ 'text': 'Ninth Grade', 'height': 500, 'gradeNumber': 9 },
	];

	grades.forEach((element) => {
		element.button = this.add.text( centerX, element.height, element.text, {fontFamily: 'Arial', fontSize: 32, color: '#f00'}
		).setOrigin(0.5);
		element.button.setInteractive();
		element.button.on('pointerdown', () => {
		    this.input.stopPropagation();
		    this.scene.start('PlayGame', { grade: element.gradeNumber });
		});
	}, this);

    }

    update () {
    }
};
