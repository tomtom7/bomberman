import Block from './block';
import StaticSprite from './../staticsprite';

class FreeBlock extends Block {

	constructor(x = 0, y = 0, w = 64, h = 64) {
		super(x, y, w, h, false);
		this.sprite = new StaticSprite("free.png");
	}
}

export default FreeBlock;
