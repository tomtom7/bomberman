import Block from './block';
import AnimatedSprite from './animatedsprite';

class Bomb extends Block {

	constructor(x = 0, y = 0, spriteName) {
		super(x, y, 48, 48, true);
		this.sprite = new AnimatedSprite({}, spriteName, 8, false);
	}
}

export default Bomb;