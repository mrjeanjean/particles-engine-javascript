import MathHelper from './math.helper';

export class ExplosionEffect{
    constructor(emitter){
        this.emitter = emitter;
    }

    apply(source, radius, force){
        for (let i = 0; i < this.emitter.particles.length; ++i) {

            if(MathHelper.distance(this.emitter.particles[i].x, this.emitter.particles[i].y, source.x, source.y) < radius){
                this.explode({
                    x: source.x,
                    y: source.y
                },this.emitter.particles[i], radius, force)
            }
        }
    }

    explode(source, particle, radius, force){
        let particleCoords = {
            x: particle.x,
            y: particle.y
        };
        let v = MathHelper.vector(source, particleCoords);
        let normalizeV = MathHelper.normalizeVector(v.x, v.y);
        let dist = MathHelper.distance(source.x, source.y, particleCoords.x, particleCoords.y);

        let impact = (radius / dist) * force;

        particle.dest = {
            x: particle.x + (normalizeV.x * impact),
            y: particle.y + (normalizeV.y * impact)
        };
    }
}

export class GravityDelayEffect{
    constructor(emitter){
        this.emitter = emitter;
    }

    apply(delta){
        for (let i = 0; i < this.emitter.particles.length; ++i) {
            let particle = this.emitter.particles[i];
            particle.dest = {
                x: particle.x,
                y: particle.y + MathHelper.clamp(delta, -100, 100)
            };
        }
    }
}