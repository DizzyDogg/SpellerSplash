export default class WordFactory {

    constructor (scene) {
        this.scene = scene;
    }

    createWord (word) {
        let container = this.scene.add.container();
        let letters = word.toUpperCase().split('');
        let x_pos = -(letters.length - 1)/2 * 256;
        let letterImgs = [];

        letters.forEach(letter =>{
            let letterImg = this.scene.add.image(x_pos, 0, 'letters', 'letter_' + letter);
            letterImgs.push(letterImg);
            x_pos += 256;
        });
        container.add(letterImgs)
        
        return container;
    }

};
