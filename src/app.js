import 'phaser';
import 'lodash';
import 'webfontloader';

require('./index.html'); // so we get it in the dist

// import scenes
import LoadingScene from './scenes/loading.js';
import MainMenuScene from './scenes/main-menu.js';
import PlayGameScene from './scenes/play-game.js';
import CreditsScene from './scenes/credits.js';

var gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true, // enable to see physics bodies outlined
        }
    },
    scene: [LoadingScene, MainMenuScene, PlayGameScene, CreditsScene]
}

let game = new Phaser.Game(gameConfig);
