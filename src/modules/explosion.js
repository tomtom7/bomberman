import OffsetBlock from './offsetblock';
import AnimatedSprite from './animatedsprite';
import { spriteMap } from './constants';

class Explosion extends OffsetBlock {
	constructor(x = 0, y = 0) {
		super(x, y, { x: 8, y: 8 }, 48, 48, true);
		this.sprite = new AnimatedSprite({}, spriteMap.explosion, spriteMap.explosion.animationSpeed);
	}
}

export default Explosion;
