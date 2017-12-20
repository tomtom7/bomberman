import Renderer from "./modules/renderer";
import MoveHandler from "./modules/movehandler";
import ResourceLoader from "./modules/resourceloader";
import spritesPNG from './images/sprites.png';

class Game {
    constructor(options, resources) {
        this.renderer = new Renderer(options, resources);
        this.moveHandler = new MoveHandler(this.renderer.grid, options.speed);
        this.start();
    }

    main() {
        let currentTime = Date.now();
        let dt = (currentTime - this.lastTime) / 1000;

        this.moveHandler.handlePlayerInput(dt);
        this.moveHandler.updateAnimations(dt);
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
    tileScale: 64,
    speed: 300
}

let sources = {
    sprites: spritesPNG
}

ResourceLoader.load(sources).then(resources => {
    new Game(options, resources);
});