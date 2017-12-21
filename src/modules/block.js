import { canvas } from './constants';

class Block {
	constructor(x, y, w, h, collideable) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.collideable = collideable;
	}

	isValidPosition() {
		return this.x >= 0 &&
            this.x <= canvas.width - this.w &&
            this.y >= 0 &&
            this.y <= canvas.height - this.h;
	}

	isSameBlock(x, y) {
		return this.x == x && this.y == y;
	}

	collides(otherBlock) {
		return otherBlock.collideable &&
			this.x < otherBlock.x + otherBlock.w &&
			this.x + this.w > otherBlock.x &&
			this.y < otherBlock.y + otherBlock.h &&
			this.y + this.h > otherBlock.y;
	}
}

export default Block;
