/**
 * Vibe Gemini Bouncer - Main Game Module
 * Phaser 4.0 Implementation
 */

class Circle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, color) {
        // Create a texture for the circle if it doesn't exist
        const textureKey = `circle_${color.toString(16)}`;
        if (!scene.textures.exists(textureKey)) {
            const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(color, 1);
            graphics.fillCircle(25, 25, 25);
            graphics.generateTexture(textureKey, 50, 50);
        }

        super(scene, x, y, textureKey);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(25);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // Set initial velocity
        const angle = Phaser.Math.Between(0, 360);
        scene.physics.velocityFromAngle(angle, 200, this.body.velocity);
    }

    update() {
        // Maintain uniform speed at 200 pixels/second
        const speed = Math.sqrt(this.body.velocity.x ** 2 + this.body.velocity.y ** 2);
        if (Math.abs(speed - 200) > 0.1 && speed > 0) {
            const factor = 200 / speed;
            this.body.velocity.x *= factor;
            this.body.velocity.y *= factor;
        }
    }
}

class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Load a tiny logo for the preloader (using a pixel as placeholder)
        this.load.image('logo', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    }

    create() {
        this.scene.start('Preloader');
    }
}

class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const logo = this.add.image(width / 2, height / 2 - 50, 'logo');
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            logo.destroy();
        });

        // No external assets to load for this simulation, 
        // but we keep the scene for compliance and texture generation.
    }

    create() {
        this.scene.start('MainGame');
    }
}

class MainGame extends Phaser.Scene {
    constructor() {
        super('MainGame');
        this.circles = null;
    }

    create() {
        this.circles = this.physics.add.group({
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
            const circle = new Circle(this, x, y, color);
            this.circles.add(circle);
        }

        // Add collision between circles
        this.physics.add.collider(this.circles, this.circles, (c1, c2) => {
            // Elastic collision logic is handled by Arcade Physics with bounce 1,
            // but we ensure speed normalization in update.
        });

        // Handle resize
        this.scale.on('resize', this.resize, this);
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
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Boot, Preloader, MainGame]
};

window.addEventListener('load', () => {
    new Phaser.Game(config);
});
