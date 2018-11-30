// Extern libs
require('pixi.js');
import MathHelper from './math.helper';

import animationManager from './animation-manager';
import {Section, Section2} from './element-with-emitter';

let fpsFrequency = 60;

document.addEventListener("DOMContentLoaded", function(event) {
    let target1 = document.querySelector(".demo1");
    let target2 = document.querySelector(".demo2");

    let elementWithEmitter1 = new Section(target1, {
        width: 600,
        height: target1.getBoundingClientRect().height
    }, 4000);

    let elementWithEmitter2 = new Section2(target2, {
        width: target1.getBoundingClientRect().width,
        height: 150
    }, 6000);

    animationManager.addRenderer(elementWithEmitter1);
    animationManager.addRenderer(elementWithEmitter2);

    animationManager.start(fpsFrequency);

});




if (module.hot) {
    module.hot.accept(() => {
        window.location.reload();
    });

    module.hot.dispose(() => {
        window.location.reload();
    });
}