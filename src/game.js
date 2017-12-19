import Renderer from "./modules/renderer";
import MoveHandler from "./modules/movehandler";
import ResourceLoader from "./modules/resourceloader";
import rockPNG from './images/rock.png';

class Game {
    constructor(options, resources) {
        this.renderer = new Renderer(options, resources);
        this.moveHandler = new MoveHandler(this.renderer.grid, options.speed);
        this.start();
    }

    main() {
        let currentTime = Date.now();
        let dt = (currentTime - this.lastTime) / 1000;

        this.moveHandler.handleInput(dt);  
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
    tileScale: 90,
    playerScale: 30,
    speed: 600
}

let sources = {
    rock: '/dist' + rockPNG
}

ResourceLoader.load(sources, start);

function start(resources) {
    new Game(options, resources);
}
