import Renderer from "./modules/renderer"
import MoveHandler from "./modules/movehandler"

class Game {
    constructor(options) {
        this.renderer = new Renderer(options);
        this.moveHandler = new MoveHandler(this.renderer);
    }

    main() {
        this.renderer.render();
        //this.update();   
        requestAnimationFrame(() => this.main());
    }

    start() {
        this.main();
    }
}

let options = {
    scale: 60,
}

let game = new Game(options);
game.start();
