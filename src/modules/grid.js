import Player from './player';
import Creep from './creep';
import Block from './block';
import PowerUp from './powerup';
import { createTerrainBlocks, shouldSpawnPowerUp, getRandomIndex } from './general';
import { powerUps, explosionDelay, bombDestructionDelay, terrainBlocks, creepSpawnInterval, creepPerTerrainBlocks } from './constants';

class Grid {
	constructor() {
		this.player = new Player(16, 0);
		this.creeps = [];
		this.powerUps = [];
		this.terrainBlocks = createTerrainBlocks();
		setInterval(() => this.addCreep(), creepSpawnInterval);
	}

	addCreep() {
		const emptyTerrainBlocks = this.terrainBlocks.filter(terrainBlock => terrainBlock.isEmpty());

		if ((emptyTerrainBlocks.length / creepPerTerrainBlocks) - this.creeps.length > 1) {
			const index = getRandomIndex(emptyTerrainBlocks.length);
			const block = emptyTerrainBlocks[index];
			this.creeps.push(new Creep(block.x, block.y));
		}
	}

	addBomb() {
		const bomb = this.player.addBomb();
		setTimeout(() => this.destructBomb(bomb), bombDestructionDelay);
	}

	destructBomb(bomb) {
		this.player.addExplosions(bomb, this.terrainBlocks);
		this.checkExplosionCollision();
		this.checkPowerupExplosions();
		this.checkCreepExplosions();
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
		if (explosion.collides(terrainBlock)) {
			terrainBlock.update(terrainBlocks.empty);
			this.spawnPowerUp(terrainBlock);
		}
	}

	checkPowerupExplosions() {
		this.powerUps = this.powerUps.filter(powerup => !this.player.explosions.some(e => e.collides(powerup)));
	}

	checkCreepExplosions() {
		this.creeps = this.creeps.filter(creep => !this.player.explosions.some(e => e.collides(creep)));
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
		return block.isValid(this.terrainBlocks);
	}

	checkCollisions() {
		this.checkPowerUpCollision();
		this.checkCreepCollision();
	}

	checkPowerUpCollision() {
		const filteredPowerUps = this.powerUps.filter(powerup => powerup.collides(this.player));

		if (filteredPowerUps.length > 0) {
			filteredPowerUps.forEach(powerup => this.player.addPowerUp(powerup));
			this.powerUps = this.powerUps.filter(powerup => !powerup.collides(this.player));
		}
	}

	checkCreepCollision() {
		if (this.creeps.some(creep => creep.collides(this.player))) {
			this.player.die();
		}
	}

	checkExplosionCollision() {
		if (this.player.explosions.some(e => e.collides(this.player))) {
			this.player.die();
		}
	}
}

export default Grid;
