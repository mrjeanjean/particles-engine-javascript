import MathHelper from './math.helper';
import Particle from './particle';
import ColorHelper from './color.helper';

const interpolate = require('color-interpolate');


/*
 let v = MathHelper.vector({
 x: 0,
 y: 0
 }, {
 x: -20,
 y: 55
 });

 let normalizeV = MathHelper.normalizeVector(v.x, v.y);

 */
class ParticlesEmitter {
    constructor(container, nbParticles, size, sprite) {
        this.particles = [];
        this.container = container;
        this.nbParticles = nbParticles;
        this.size = size;
        this.sprite = sprite;

        this.particlesEffects = [];
    }

    init() {
        for (let i = 0; i < this.nbParticles; ++i) {

            let scale = MathHelper.random(1, 1);

            let particle = new Particle(
                MathHelper.random(0, this.size.width),
                MathHelper.random(0, this.size.height),
                MathHelper.random(5,10),
                this.sprite,
                MathHelper.random(0.3, 0.6, false) //MathHelper.random(1, 2, false)
            );

            this.container.addChild(particle);
            this.particles.push(particle);
        }
    }

    addParticleEffect(applier) {
        this.particlesEffects.push(applier);
    }

    applyParticleEffects(particle) {
        this.particlesEffects.forEach(applier => applier.apply(particle, this.size));
    }

    update() {
        for (let i = 0; i < this.particles.length; ++i) {
            let particle = this.particles[i];
            particle.update();
            this.applyParticleEffects(particle);
            //this.applyTint(particle);
            //this.applyAlpha(particle);
        }
    }
}

export default ParticlesEmitter;