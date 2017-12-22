import Block from './block';
import Sprite from './sprite';
import { tileScale } from './constants';

class TerrainBlock extends Block {
	constructor(x, y, collideable, explodable, spriteName) {
		super(x * tileScale, y * tileScale, tileScale, tileScale, collideable);
		this.explodable = explodable;
		this.sprite = new Sprite(spriteName);
	}

	update(spriteName, collideable, explodable) {
		this.sprite = new Sprite(spriteName);
		this.collideable = collideable;
		this.explodable = explodable;
	}

	canExplode(explosion) {
		return this.explodable && explosion.isSameBlock(this.x, this.y);
	}
}

export default TerrainBlock;
