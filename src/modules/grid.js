import Player from "./player";
import Bomb from "./bomb";
import Block from "./block/block"
import RockBlock from "./block/rock";
import FreeBlock from "./block/free";
import SoftBlock from "./block/soft";

class Grid {

    constructor(options, canvas) {
        this.options = options;
        this.canvas = canvas;
        this.player = new Player(16, 0);
        this.blocks = this.createBlocks();
        this.bombs = [];
    }

    createBomb() {
        this.bombs.push(new Bomb(64, 0));
    }

    createBlocks() {
        let blocks = [];
        let values = [1, 3, 5, 7, 9, 11];

        for (let x = 0; x <= this.canvas.width / this.options.tileScale; x++) {
            for (let y = 0; y <= this.canvas.height/ this.options.tileScale; y++) {
                if (x < 3 && y == 0 || y < 3 && x == 0 ) {
                    blocks.push(new FreeBlock(x * this.options.tileScale, y * this.options.tileScale, this.options.tileScale, this.options.tileScale));
                } else if (values.includes(y)  && values.includes(x) ){
                    blocks.push(new RockBlock(x * this.options.tileScale, y * this.options.tileScale, this.options.tileScale, this.options.tileScale))            
                } else {
                     blocks.push(new SoftBlock(x * this.options.tileScale, y * this.options.tileScale, this.options.tileScale, this.options.tileScale));
                }
            }
        }
        return blocks;
    }

    canMove(x, y, w, h, collideable) {
        let block = new Block(x, y, w, h, collideable);
        return block.x >= 0 &&
            block.x <= this.canvas.width - block.w &&
            block.y >= 0 &&
            block.y <= this.canvas.height - block.h &&
            (!block.collideable || !this.collidesWithBlocks(block));
    }

    collidesWithBlocks(block) {
        return this.blocks.some(otherBlock => this.collides(block, otherBlock));
    }

    collides(block, otherBlock) {
        return otherBlock.collideable &&
            block.x < otherBlock.x + otherBlock.w &&
            block.x + block.w > otherBlock.x &&
            block.y < otherBlock.y + otherBlock.h &&
            block.y + block.h > otherBlock.y;
    }
}

export default Grid;