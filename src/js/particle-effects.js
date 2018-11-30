import ColorHelper from './color.helper';
import MathHelper from './math.helper';
const interpolate = require('color-interpolate');

export class TintEffect{
    constructor(values){
        this.values = values;
        let colors = (values.reverse) ? values.colors.reverse() : values.colors;
        this.colorInterpolation = interpolate(values.colors);
    }
    apply(star, size){
        size = this.values.size || size;
        let delta = star.x / size.width;
        let tint = this.colorInterpolation(delta);
        star.tint = "0x" + ColorHelper.fullColorHex(tint[0], tint[1], tint[2]);
    }
}

export class AlphaEffectY{
    constructor(values){
        this.values = values;
    }
    apply(star, size) {
        size = this.values.size || size;
        let delta = star.y / size.height;
        let from = this.values.min;
        let to = this.values.max;

        star.alpha = MathHelper.lerp(from, to, delta);
    }
}

export class AlphaEffectX{
    constructor(values){
        this.values = values;
    }
    apply(star, size) {
        size = this.values.size || size;
        let delta = star.x / size.width;
        let from = this.values.min;
        let to = this.values.max;

        star.alpha = MathHelper.lerp(from, to, delta);
    }
}

export class MouseBoom{
    constructor(container){
        this.container = container;

        container.interactive = true;
        container.click = this.onMouseUp.bind(this);

    }

    onMouseUp(e){
        console.log(this)
    }


    apply(star, size){

    }
}