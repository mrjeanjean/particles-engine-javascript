// Extern libs
require('pixi.js');

import animationManager from './animation-manager';
import {Section} from './element-with-emitter';

let fpsFrequency = 60;

let target1 = document.querySelector(".demo1");
let target2 = document.querySelector(".demo2");

let elementWithEmitter1 = new Section(target1, {
    width: 600,
    height: 350
});

let elementWithEmitter2 = new Section(target2, {
    width: 2000,
    height: 350
});

animationManager.addRenderer(elementWithEmitter1);
animationManager.addRenderer(elementWithEmitter2);

animationManager.start(fpsFrequency);


if (module.hot) {
    module.hot.accept(() => {
        window.location.reload();
    });

    module.hot.dispose(() => {
        window.location.reload();
    });
}