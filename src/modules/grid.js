import Player from './player';
import Block from './block';
import PowerUp from './powerup';
import { createTerrainBlocks, shouldSpawnPowerUp, getRandomIndex } from './general';
import { spriteMap, powerUps, explosionDelay, bombDestructionDelay, terrainBlocks } from './constants';

class Grid {
	constructor() {
		this.player = new Player(16, 0);
		this.terrainBlocks = createTerrainBlocks();
		this.powerUps = [];
	}

	addBomb() {
		const bomb = this.player.addBomb();
		setTimeout(() => this.destructBomb(bomb), bombDestructionDelay);
	}

	destructBomb(bomb) {
		this.player.addExplosions(bomb, this.terrainBlocks);
		setTimeout(() => this.updateGrid(), explosionDelay);
	}

	updateGrid() {
		const softTerrainBlocks = this.terrainBlocks.filter(terrainBlock => terrainBlock.isSoft());
		softTerrainBlocks.forEach(terrainBlock => {
			this.player.explosions.forEach(explosion => this.processExplosion(explosion, terrainBlock));
		});
		this.player.removeExplosions();
	}

	processExplosion(explosion, terrainBlock) {
		if (explosion.isSameBlock(terrainBlock.x, terrainBlock.y)) {
			terrainBlock.update(terrainBlocks.empty);
			this.spawnPowerUp(terrainBlock);
		}
	}

	spawnPowerUp(terrainBlock) {
		if (shouldSpawnPowerUp()) {
			const index = getRandomIndex(powerUps.length);
			const powerUp = new PowerUp(terrainBlock.x, terrainBlock.y, powerUps[index]);
			this.powerUps.push(powerUp);
		}
	}

	canMove(x, y, w, h) {
		const block = new Block(x, y, w, h);
		return !this.player.dead && block.isValid(this.terrainBlocks);
	}

	checkPowerUps() {
		const powerUps = this.powerUps.filter(powerup => this.player.isSameBlock(powerup));
		
		if (powerUps.length > 0) {
			powerUps.forEach(p => this.player.addPowerUp(p));
			this.powerUps = this.powerUps.filter(powerup => !this.player.isSameBlock(powerup));
		}
	}
}

export default Grid;
