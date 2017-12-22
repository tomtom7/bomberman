import Block from './block';
import Bomb from './bomb';
import AnimatedSprite from './animatedsprite';
import { getClosestDivisible, createExplosions } from './general';
import { tileScale, spriteMap } from './constants';

class Player extends Block {
	constructor(x = 0, y = 0) {
		super(x, y, 31, 55, true);
		this.sprite = new AnimatedSprite(spriteMap.player, spriteMap.player.down, 16);
		this.bombs = [];
		this.explosions = [];
	}

	_removeBombs() {
		this.bombs = [];
	}

	addBomb() {
		const x = getClosestDivisible(this.x, tileScale);
		const y = getClosestDivisible(this.y, tileScale);
		const bomb = new Bomb(x, y);
		this.bombs.push(bomb);

		return bomb;
	}

	canPlantBomb() {
		return this.bombs.length == 0;
	}

	removeExplosions() {
		this.explosions = [];
	}

	addExplosions(bomb, blocks) {
		this.explosions = createExplosions(bomb, blocks);
		this._removeBombs();
	}
}

export default Player;
