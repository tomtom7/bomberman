import Player from "./player";
import Rock from "./rock";

let canvas = document.getElementById("game-canvas");

class Grid {

	constructor(options) {
        this.options = options
        this.player = new Player(30, 30);
        this.rocks = this.createRocks();
	}

    createRocks() {
        let rocks = [];

        for (let i = 1; i <= canvas.width / 90; i +=2 ) {
            for (let j = 0; j <= canvas.height / 90; j +=2 ) {
                rocks.push(new Rock(i * 90, j * 90));
            }
        }

        return rocks;
    }

    canMove(x, y) {
        return x >= 0 && 
        x <= canvas.width - this.options.playerScale && 
        y >= 0 && 
        y <= canvas.height - this.options.playerScale &&
        !this.collidesWithRocks(x, y);
    }

    collidesWithRocks(x, y) {
        return this.rocks.some(rock => this.collides(rock, x, y));
    }

    collides(rock, x, y) {
        return x < rock.x + this.options.tileScale &&
        x + this.options.playerScale > rock.x &&
        y < rock.y + this.options.tileScale &&
        y + this.options.playerScale > rock.y;
    }
}

export default Grid;
