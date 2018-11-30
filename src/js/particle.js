require('pixi.js');
import MathHelper from './math.helper';

class Particle extends PIXI.Sprite {
    constructor(x, y, speed, sprite, scale = 1) {
        super();
        this.texture = PIXI.Texture.fromImage(sprite);
        this.origin = {
            x: x,
            y: y
        };
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.life = 0;
        this.lifeTime = MathHelper.random(500, 800);
        this.particleScale = scale;

        this.init();
    }

    init() {
        this.x = this.origin.x;
        this.y = this.origin.y;
        this.scale.set(this.particleScale);

        this.setRandomDestination();
    }

    setRandomDestination() {
        let directionX = Math.random() < 0.5 ? -1 : 1;
        let directionY = Math.random() < 0.5 ? -1 : 1;
        this.dest = {
            x: this.origin.x + MathHelper.random(0, 5) * directionX,
            y: this.origin.y + MathHelper.random(0, 5) * directionY
        };
        this.life = 0;
    }

    update() {
        this.life++;
        let lerpX = MathHelper.lerp(this.x, this.dest.x, this.life / this.lifeTime);
        let lerpY = MathHelper.lerp(this.y, this.dest.y, this.life / this.lifeTime);
        let distance = MathHelper.distance(this.x, this.y, this.dest.x, this.dest.y);
        this.x = lerpX;
        this.y = lerpY;

        if (distance < 4) {
            this.setRandomDestination();
        }
    }

    resetPosition() {
        this.x = 600;
    }
}

export default Particle;