import Player from "./player";
import Rock from "./rock";

class Grid {

    constructor(options, canvas) {
        this.options = options;
        this.canvas = canvas;
        this.player = new Player(16, 0, this.options.playerScale);
        this.rocks = this.createRocks();
    }

    createRocks() {
        let rocks = [];

        for (let i = 1; i <= this.canvas.width / this.options.tileScale; i += 2) {
            for (let j = 1; j <= this.canvas.height / this.options.tileScale; j += 2) {
                rocks.push(new Rock(i * this.options.tileScale, j * this.options.tileScale));
            }
        }

        return rocks;
    }

    canMove(x, y) {
        return x >= 0 &&
            x <= this.canvas.width - this.player.w &&
            y >= 0 &&
            y <= this.canvas.height - this.player.h &&
            !this.collidesWithRocks(x, y);
    }

    collidesWithRocks(x, y) {
        return this.rocks.some(rock => this.collides(rock, x, y));
    }

    collides(rock, x, y) {
        return x < rock.x + this.options.tileScale &&
            x + this.player.w > rock.x &&
            y < rock.y + this.options.tileScale &&
            y + this.player.h > rock.y;
    }
}

export default Grid;