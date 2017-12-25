import OffsetBlock from './offsetblock';
import Sprite from './sprite';

class PowerUp extends OffsetBlock {
	constructor(x = 0, y = 0, block) {
		super(x, y, { x: 16, y: 16 }, 32, 32, true);
		this.type = block.type;
		this.value = block.value;
		this.sprite = new Sprite(block.spriteName);
	}
}

export default PowerUp;
