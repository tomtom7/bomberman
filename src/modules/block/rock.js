import Block from './block';
import StaticSprite from './../staticsprite';

class RockBlock extends Block {

	constructor(x = 0, y = 0, w = 64, h = 64) {
		super(x, y, w, h, true);
		this.sprite = new StaticSprite("hard.png");
	}
}

export default RockBlock;
