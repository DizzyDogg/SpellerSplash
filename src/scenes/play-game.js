import SelectLetter from '../interfaces/select-letter';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    init () {
        this.selectLetter = new SelectLetter(this);
    }

    create () {
        this.selectLetter.events.on('keypress', (key) => {
            console.log(key);
        });
    }

    update () {
    }
};
