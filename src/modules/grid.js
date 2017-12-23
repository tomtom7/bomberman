import Player from './player';
import Creep from './creep';
import Block from './block';
import PowerUp from './powerup';
import { createTerrainBlocks, shouldSpawnPowerUp, getRandomIndex } from './general';
import { powerUps, explosionDelay, bombDestructionDelay, terrainBlocks, respawnDelay } from './constants';

class Grid {
	constructor() {
		this.player = new Player(16, 0);
		this.creep = new Creep(64, 0);
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
		this.checkPowerupExplosions();

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

	checkPowerupExplosions() {
		this.powerUps = this.powerUps.filter(powerup =>
			!this.player.explosions.some(e => e.isSameBlock(powerup.x - powerup.offset.x, powerup.y - powerup.offset.y))
		);
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
		const filteredPowerUps = this.powerUps.filter(powerup => this.player.isSameBlock(powerup));

		if (filteredPowerUps.length > 0) {
			filteredPowerUps.forEach(p => this.player.addPowerUp(p));
			this.powerUps = this.powerUps.filter(powerup => !this.player.isSameBlock(powerup));
		}
	}

	checkExplosions() {
		const closestBlock = this.player.getClosestBlock();
		if (this.player.explosions.some(e => e.isSameBlock(closestBlock[0], closestBlock[1]))) {
			this.player.dead = true;
			setTimeout(() => this.player.respawn(), respawnDelay);
		}
	}
}

export default Grid;
