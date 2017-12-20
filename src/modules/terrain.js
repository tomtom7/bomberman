import Block from './block';
import Sprite from './sprite';

class TerrainBlock extends Block {

	constructor(x = 0, y = 0, w = 64, h = 64, collideable, explodable, spriteName) {
		super(x, y, w, h, collideable);
		this.explodable = explodable;
		this.sprite = new Sprite(spriteName);
	}
}

export default TerrainBlock;
