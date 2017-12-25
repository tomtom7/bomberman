import Block from './block';
import Sprite from './sprite';
import { tileScale, terrainBlocks } from './constants';

class TerrainBlock extends Block {
	constructor(x, y, block) {
		super(x * tileScale, y * tileScale, tileScale, tileScale, block.collideable);
		this.type = block.type;
		this.sprite = new Sprite(block.spriteName);
	}

	_isType(type) {
		return this.type == type;
	}

	update(block) {
		this.sprite = new Sprite(block.spriteName);
		this.type = block.type;
		this.collideable = block.collideable;
	}

	hasExplodeEffect(explosion) {
		return !this.isSolid() && this.collides(explosion);
	}

	isEmpty() {
		return this._isType(terrainBlocks.empty.type);
	}

	isSolid() {
		return this._isType(terrainBlocks.solid.type);
	}

	isSoft() {
		return this._isType(terrainBlocks.soft.type);
	}
}

export default TerrainBlock;
