/**
 * Vibe Gemini Bouncer - Main Entry Point
 */

import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import MainGameScene from './scenes/MainGameScene.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, PreloaderScene, MainGameScene]
};

window.addEventListener('load', () => {
    new Phaser.Game(config);
});
