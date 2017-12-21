import Block from './block';
import AnimatedSprite from './animatedsprite';
import { spriteMap } from './constants';

class Explosion extends Block {
	constructor(x = 0, y = 0) {
		super(x + 8, y + 8, 48, 48, true);
		this.offset = {
			x: 8,
			y: 8,
		};
		this.sprite = new AnimatedSprite({}, spriteMap.explosion, 8);
	}

	isSameBlock(x, y) {
		return this.x - this.offset.x == x && this.y - this.offset.y == y;
	}

	process(block) {
		if (this.isSameBlock(block.x, block.y)) {
			block.update(spriteMap.terrain.empty, false, true);
		}
	}
}

export default Explosion;
