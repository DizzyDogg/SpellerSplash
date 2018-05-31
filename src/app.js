import 'phaser';
import 'lodash';
import 'webfontloader';

require('./index.html'); // so we get it in the dist

import { Plugins } from '@capacitor/core';

// import scenes
import CreditsScene from './scenes/credits.js';
import LoadingScene from './scenes/loading.js';
import MainMenuScene from './scenes/main-menu.js';
import PlayGameScene from './scenes/play-game.js';
import GradeSelectScene from './scenes/grade-select.js';

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
    scene: [LoadingScene, MainMenuScene, PlayGameScene, CreditsScene, GradeSelectScene]
}

const { StatusBar, SplashScreen } = Plugins;

export class Game extends Phaser.Game {

    constructor(config) {
  
        super(config);
      
        StatusBar.hide();
        SplashScreen.hide();
  
    }
  
}

let game = new Game(gameConfig);
