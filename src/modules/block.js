import { canvas } from './constants';

class Block {
	constructor(x, y, w, h, collideable) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.collideable = collideable;
	}

	isValid(terrainBlocks) {
		return this.isValidPosition() && !this.collidesWithTerrainBlocks(terrainBlocks);
	}

	isValidPosition() {
		return this.x >= 0 &&
            this.x <= canvas.width - this.w &&
            this.y >= 0 &&
            this.y <= canvas.height - this.h;
	}

	collidesWithTerrainBlocks(terrainBlocks) {
		return terrainBlocks.some(terrainBlock => this.collides(terrainBlock));
	}

	collides(block) {
		return block.collideable &&
			this.x < block.x + block.w &&
			this.x + this.w > block.x &&
			this.y < block.y + block.h &&
			this.y + this.h > block.y;
	}
}

export default Block;
