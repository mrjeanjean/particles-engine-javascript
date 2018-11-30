require('pixi.js');
import ParticlesEmitter from './particles-emitter';
import {
    TintEffect,
    AlphaEffectX,
    AlphaEffectY,
    MouseBoom
} from './particle-effects';

import {ExplosionEffect, GravityDelayEffect} from './particle-emitter-effects';

class ParticleAttacher {
    constructor($element, size) {
        this.$element = $element;
        this.size = size;

        // INIT PIXI CONTAINER AND CANVAS
        this.canvasRenderer = PIXI.autoDetectRenderer(size.width, size.height, {transparent: true});
        this.container = new PIXI.particles.ParticleContainer(10000, {
            alpha: true
        });

        // INIT PARTICLES EMITTER
        this.particlesEmitter = this.getParticlesEmitter(size);
        this.attachEmitterEffects(this.particlesEmitter);
        this.attachParticlesEffects(this.particlesEmitter);

        this.particlesEmitter.init();

        this.$element.appendChild(this.canvasRenderer.view);
    }

    getParticlesEmitter(size) {
        return new ParticlesEmitter(
            this.container,
            2000,
            size,
            "particle.png"
        );
    }

    attachEmitterEffects(particlesEmitter) {
    }

    attachParticlesEffects(particlesEmitter) {
    }

    render() {
        this.particlesEmitter.update();
        this.canvasRenderer.render(this.container);
    }
}

export class Section extends ParticleAttacher {
    constructor($element, size) {
        super($element, size);
    }

    attachParticlesEffects(particlesEmitter) {
        // PARTICLES EFFECTS
        particlesEmitter.addParticleEffect(new TintEffect({
            colors: [
                "#2CEBBC",
                "#2CCEFB",
                "#E38BF5"
            ]
        }));

        particlesEmitter.addParticleEffect(new AlphaEffectX({
            min: 0,
            max: 0.6
        }));
    }

    attachEmitterEffects(particlesEmitter) {
        // EMITTER EFFECTS
        // Explosion on mouse move
        let emitterExplosion = new ExplosionEffect(particlesEmitter);
        this.$element.addEventListener("mousemove", (e)=> {
            let sectionBounds = e.target.getBoundingClientRect();
            emitterExplosion.apply({
                x: e.clientX,
                y: (e.clientY - sectionBounds.top)
            }, 60, 60)
        });

        // Gravity on scroll
        /*let emitterGravityDelay = new GravityDelayEffect(particlesEmitter);

         let positionScroll = window.scrollY;

         let ticker = setInterval(()=>{
         let delta = positionScroll - window.scrollY;
         if(delta !== 0){
         emitterGravityDelay.apply(delta)
         }
         positionScroll = window.scrollY;
         }, 200);*/
    }

}

export default ParticleAttacher;