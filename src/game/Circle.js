/**
 * Vibe Gemini Bouncer - Circle Entity
 */

export default class Circle extends Phaser.Physics.Arcade.Sprite {
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
