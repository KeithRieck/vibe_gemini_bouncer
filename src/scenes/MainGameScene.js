/**
 * Vibe Gemini Bouncer - Main Game Scene
 */

import Circle from '../game/Circle.js';

export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super('MainGameScene');
        this.circles = null;
    }

    create() {
        console.log('MainGameScene creating...');
        this.physics.world.resume();
        
        this.circles = this.add.group({
            classType: Circle,
            runChildUpdate: true
        });

        const count = 64;
        const diameter = 50;
        const radius = diameter / 2;
        const maxRetries = 100;

        for (let i = 0; i < count; i++) {
            let x, y, placed = false;
            let retries = 0;

            while (!placed && retries < maxRetries) {
                x = Phaser.Math.Between(radius, this.scale.width - radius);
                y = Phaser.Math.Between(radius, this.scale.height - radius);

                // Check for overlap with existing circles
                const overlap = this.circles.getChildren().some(circle => {
                    const dist = Phaser.Math.Distance.Between(x, y, circle.x, circle.y);
                    return dist < diameter;
                });

                if (!overlap) {
                    placed = true;
                }
                retries++;
            }

            const color = Phaser.Display.Color.RandomRGB().color;
            // Create a texture for the circle if it doesn't exist (moved here for test)
            const textureKey = `circle_${color.toString(16)}`;
            if (!this.textures.exists(textureKey)) {
                const graphics = this.make.graphics({ x: 0, y: 0, add: false });
                graphics.fillStyle(color, 1);
                graphics.fillCircle(25, 25, 25);
                graphics.generateTexture(textureKey, 50, 50);
            }

            const circle = new Circle(this, x, y, color);
            this.circles.add(circle);
        }

        console.log(`Created ${this.circles.getLength()} circles.`);

        // Add collision between circles
        this.physics.add.collider(this.circles, this.circles);

        // Handle resize
        this.scale.on('resize', this.resize, this);
        console.log('MainGameScene create complete.');
    }

    update() {
        // Explicitly update children if runChildUpdate isn't working as expected
        if (this.circles) {
            this.circles.getChildren().forEach(circle => circle.update());
        }
    }

    resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.physics.world.setBounds(0, 0, width, height);

        // Ensure circles stay in bounds after resize
        this.circles.getChildren().forEach(circle => {
            const radius = 25;
            if (circle.x < radius) circle.x = radius;
            if (circle.x > width - radius) circle.x = width - radius;
            if (circle.y < radius) circle.y = radius;
            if (circle.y > height - radius) circle.y = height - radius;
        });
    }
}
