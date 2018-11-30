require('pixi.js');
import ParticlesEmitter from './particles-emitter';
import {
    TintEffect,
    AlphaEffectX,
    AlphaEffectY,
    MouseBoom
} from './particle-effects';

import Easing from 'easing-js';

import {ExplosionEffect, GravityDelayEffect} from './particle-emitter-effects';

class ParticleAttacher {
    constructor($element, size, nbParticles = 2000) {
        this.$element = $element;
        this.size = size;
        this.nbParticles = nbParticles;

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
            this.nbParticles,
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
    constructor($element, size, nbParticles) {
        super($element, size, nbParticles);
        this.canvasRenderer.view.style.right = 0;
        this.canvasRenderer.view.style.left = "auto";
    }

    getParticlesEmitter(size) {
        return new ParticlesEmitter(
            this.container,
            this.nbParticles,
            size,
            "particle.png"
        );
    }

    attachParticlesEffects(particlesEmitter) {
        // PARTICLES EFFECTS
        particlesEmitter.addParticleEffect(new TintEffect({
                colors: [
                    "#2CEBBC",
                    "#2CCEFB",
                    "#E38BF5"
                ]
            }
        ));

        particlesEmitter.addParticleEffect(new AlphaEffectX({
                min: 0.1,
                max: 0.8,
                easing: Easing.linear
            }
        ));
    }

    attachEmitterEffects(particlesEmitter) {
        // EMITTER EFFECTS
        // Explosion on mouse move
        let emitterExplosion = new ExplosionEffect(particlesEmitter);

        this.$element.addEventListener("mousemove", (e)=> {
            let sectionBounds = e.target.getBoundingClientRect();
            let canvasBounds = this.canvasRenderer.view.getBoundingClientRect();

            emitterExplosion.apply({
                x: e.clientX - canvasBounds.x,
                y: e.clientY - sectionBounds.top
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

export class Section2 extends ParticleAttacher {
    constructor($element, size, nbParticles) {
        super($element, size, nbParticles);
    }

    attachParticlesEffects(particlesEmitter) {
        // PARTICLES EFFECTS
        particlesEmitter.addParticleEffect(new TintEffect({
                colors: [
                    "#2CEBBC",
                    "#2CCEFB",
                    "#E38BF5"
                ],
                reverse: true
            }
        ));

        particlesEmitter.addParticleEffect(new AlphaEffectY({
                min: 0.5,
                max: 0,
                easing: Easing.linear
            }
        ));
    }

    attachEmitterEffects(particlesEmitter) {
        let emitterExplosion = new ExplosionEffect(particlesEmitter);

        this.$element.addEventListener("click", (e)=> {
            let sectionBounds = e.target.getBoundingClientRect();
            let canvasBounds = this.canvasRenderer.view.getBoundingClientRect();

            emitterExplosion.apply({
                x: e.clientX - canvasBounds.x,
                y: e.clientY - sectionBounds.top
            }, 200, 20)
        });
    }
}

export default ParticleAttacher;