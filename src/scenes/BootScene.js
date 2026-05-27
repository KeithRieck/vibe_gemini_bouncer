/**
 * Vibe Gemini Bouncer - Boot Scene
 */

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load a tiny logo for the preloader (using a pixel as placeholder)
        this.load.image('logo', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    }

    create() {
        this.scene.start('PreloaderScene');
    }
}
