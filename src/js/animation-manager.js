class AnimationManager{
    constructor(){

        this.fpsInterval = 0;
        this.startTime = 0;
        this.next = 0;
        this.animate = this.animate.bind(this);

        this.canvasRenderers = [];
    }

    addRenderer(canvasRenderer){
        this.canvasRenderers.push(canvasRenderer);
    }

    start(fps){
        this.fpsInterval = 1000 / fps;
        this.next = Date.now();
        this.startTime = this.next;
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);

        let now = Date.now();
        let elapsed = now - this.next;

        if (elapsed > this.fpsInterval) {
            this.next = now - (elapsed % this.fpsInterval);
            this.canvasRenderers.forEach((canvasRenderer)=>{
                canvasRenderer.render();
            })
        }
    }
}

export default new AnimationManager();