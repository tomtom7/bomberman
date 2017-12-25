import OffsetBlock from './offsetblock';
import AnimatedSprite from './animatedsprite';
import { spriteMap, directions } from './constants';
import { getRandomIndex } from './general';

class Creep extends OffsetBlock {
	constructor(x = 0, y = 0) {
		super(x, y, { x: 7, y: 7 }, 51, 50, true);
		this.sprite = new AnimatedSprite(spriteMap.creep, spriteMap.creep.down, 16);
		this.setNewDirection();
	}

	setNewDirection() {
		const index = getRandomIndex(directions.length);
		this.direction = directions[index];
	}
}

export default Creep;
