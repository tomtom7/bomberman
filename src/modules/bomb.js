import Block from './block';
import AnimatedSprite from './animatedsprite';

class Bomb extends Block {
	constructor(x = 0, y = 0, spriteName) {
		super(x + 8, y + 8, 48, 48, true);
		this.offset = {
			x: 8,
			y: 8,
		};
		this.sprite = new AnimatedSprite({}, spriteName, 8);
	}
}

export default Bomb;
