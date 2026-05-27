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
            debug: true
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
    console.log('Window loaded, starting Phaser...');
    try {
        const game = new Phaser.Game(config);
        console.log('Phaser Game instance created:', game);
    } catch (e) {
        console.error('Failed to create Phaser Game:', e);
    }
});
