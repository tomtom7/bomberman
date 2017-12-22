import OffsetBlock from './offsetblock';
import AnimatedSprite from './animatedsprite';
import { spriteMap } from './constants';

class Explosion extends OffsetBlock {
	constructor(x = 0, y = 0) {
		super(x, y, { x: 8, y: 8 }, 48, 48, true);
		this.sprite = new AnimatedSprite({}, spriteMap.explosion, 8);
	}

	process(block) {
		if (this.isSameBlock(block.x, block.y)) {
			block.update(spriteMap.terrain.empty, false, true);
		}
	}
}

export default Explosion;
