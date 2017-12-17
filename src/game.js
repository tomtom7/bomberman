import Renderer from "./modules/renderer";
import MoveHandler from "./modules/movehandler";

class Game {
    constructor(options) {
        this.renderer = new Renderer(options);
        this.moveHandler = new MoveHandler(this.renderer);
    }

    main() {
        console.log(this.resources);
        let currentTime = Date.now();
        let dt = (currentTime - this.lastTime) / 1000;

        //this.update(dt);  
        this.renderer.render();
        this.lastTime = currentTime;
        requestAnimationFrame(() => this.main());
    }

    start() {
        this.lastTime = Date.now();
        this.main();
    }
}

let options = {
    scale: 90,
}

let game = new Game(options);
game.start();
