import Player from "./player";
import Bomb from "./bomb";
import Block from "./block"
import TerrainBlock from "./terrain";
import Explosion from './explosion';
import spriteMap from "./spritemap";
import Sprite from './sprite';

class Grid {

    constructor(options, canvas) {
        this.options = options;
        this.canvas = canvas;
        this.player = new Player(16, 0, spriteMap.player);
        this.blocks = this.createBlocks();
    }

    getClosestBlock(value, divisble) {
        return Math.floor(value / divisble) * divisble;
    }

    addBomb() {
        let x = 8 + this.getClosestBlock(this.player.x, this.options.tileScale);
        let y = 8 + this.getClosestBlock(this.player.y, this.options.tileScale);

        let bomb = new Bomb(x, y, spriteMap.bomb);
        this.player.bombs.push(bomb);
        setTimeout(() => this.destructBomb(bomb), 3000);
    }

    destructBomb(bomb) {
        this.player.explosions = this.createExplosions(bomb);
        this.player.removeBombs();
        setTimeout(() => this.removeExplosions(), 2000);
    }

    createExplosion(x, y) {
        return new Explosion(x + 8, y + 8, spriteMap.explosion);
    }

    createExplosions(bomb) {
        let explosions = [];
        let x = bomb.x - 8;
        let y = bomb.y - 8;

        for (let i = x - 64; i<= x + 64; i+=64) {
            if (this.isExplodableBlock(i, y)) {
                explosions.push(this.createExplosion(i, y));
            }
        }

        for (let j = y - 64; j<= y + 64; j+=64) {
            if (this.isExplodableBlock(x, j)) {
                explosions.push(this.createExplosion(x , j));
            }
        }
        return explosions;
    }

    removeExplosions() {
        this.player.explosions.forEach(explosion => {
            this.blocks.forEach(b => {
                if (b.x == explosion.x - 8 && b.y == explosion.y - 8) {
                    b.sprite = new Sprite(spriteMap.terrain.empty);
                    b.collideable = false;
                    b.explodable = true;
                }
            });
        });
        this.player.removeExplosions();
    }

    updateGrid() {

    }

    isExplodableBlock(x, y) {
        return x >= 0 &&
            x <= this.canvas.width - this.options.tileScale &&
            y >= 0 &&
            y <= this.canvas.height - this.options.tileScale &&
            this.blocks.find(block => this.findGridBlock(block, x, y));
    }

    findGridBlock(block, x, y) {
        return block.explodable && block.x == x && block.y == y;
    }

    createBlocks() {
        let blocks = [];
        let values = [1, 3, 5, 7, 9, 11];

        for (let x = 0; x <= this.canvas.width / this.options.tileScale; x++) {
            for (let y = 0; y <= this.canvas.height/ this.options.tileScale; y++) {
                if (x < 3 && y == 0 || y < 3 && x == 0 ) {
                    blocks.push(this.addTerrainBlock(x, y, this.options.tileScale, this.options.tileScale, false, true, spriteMap.terrain.empty));
                } else if (values.includes(y)  && values.includes(x) ){
                    blocks.push(this.addTerrainBlock(x, y, this.options.tileScale, this.options.tileScale, true, false, spriteMap.terrain.solid));            
                } else {
                     blocks.push(this.addTerrainBlock(x, y, this.options.tileScale, this.options.tileScale, true, true, spriteMap.terrain.soft));
                }
            }
        }
        return blocks;
    }

    addTerrainBlock(x, y, w, h, collideable, explodable, spriteName) {
        return new TerrainBlock(x * w, y * h , w, h, collideable, explodable, spriteName);
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