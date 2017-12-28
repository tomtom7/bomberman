import Block from './block';
import Bomb from './bomb';
import AnimatedSprite from './animatedsprite';
import { getClosestDivisible, createExplosions } from './general';
import { tileScale, spriteMap, powerUpTime, respawnDelay } from './constants';

class Player extends Block {
	constructor(x = 0, y = 0) {
		super(x, y, 31, 55, true);
		this.sprite = new AnimatedSprite(spriteMap.player, spriteMap.player.down, spriteMap.player.animationSpeed);
		this.bombs = [];
		this.explosions = [];
		this.speed = 0;
		this.explosionMagnitude = 1;
		this.maxBombCount = 1;
	}

	_removeBombs() {
		this.bombs = [];
	}

	addPowerUp(powerUp) {
		this[powerUp.type] += powerUp.value;
		setTimeout(() => this.removePowerUp(powerUp), powerUpTime);
	}

	removePowerUp(powerUp) {
		this[powerUp.type] -= powerUp.value;
	}

	addBomb() {
		const closestBlock = this.getClosestBlock();
		const bomb = new Bomb(closestBlock[0], closestBlock[1]);
		this.bombs.push(bomb);

		return bomb;
	}

	getClosestBlock() {
		const x = getClosestDivisible(this.x, tileScale);
		const y = getClosestDivisible(this.y, tileScale);
		return [x, y];
	}

	canPlantBomb() {
		return !this.dead && this.bombs.length < this.maxBombCount;
	}

	removeExplosions() {
		this.explosions = [];
	}

	addExplosions(bomb, terrainBlocks) {
		this.explosions = createExplosions(bomb, terrainBlocks, this.explosionMagnitude);
		this.bombs = this.bombs.filter(b => !Object.is(bomb, b));
	}

	die() {
		this.dead = true;
		setTimeout(() => this.respawn(), respawnDelay);
	}

	respawn() {
		this.x = 16;
		this.y = 0;
		this.dead = false;
	}
}

export default Player;
