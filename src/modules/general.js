import TerrainBlock from './terrainblock';
import Explosion from './explosion';
import { canvas, blockTypes, tileScale, playerBaseSpeed, creepBaseSpeed, powerUpChance, deathBlinkFrequency } from './constants';

export function getClosestDivisible(value, divisble) {
	return Math.floor(value / divisble) * divisble;
}

export function getDeathBlinkInterval() {
	return Math.floor(Date.now() / deathBlinkFrequency) % 2;
}

export function createTerrainBlocks() {
	const blocks = [];

	const gridBlocks = [
		[0, 0, 0, 1, 1, 2, 1, 1 ,1, 1, 1],
		[0, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1],
		[0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
		[1, 2, 0, 1, 1, 1, 1, 1, 0, 2, 1],
		[1, 1, 0, 2, 1, 1, 1, 2, 0, 1, 1],
		[1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1],
		[2, 2, 0, 1, 2, 2, 2, 1, 0, 2, 2],
		[1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1],
		[1, 1, 0, 2, 1, 1, 1, 2, 0, 1, 1],
		[1, 2, 0, 1, 1, 1, 1, 1, 0, 2, 1],
		[1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1],
		[1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1],
		[1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
	]

	for (let x = 0; x < gridBlocks.length; x+= 1) {
		for (let y = 0; y < gridBlocks[x].length; y += 1) {
			const blockType = gridBlocks[x][y];
			blocks.push(new TerrainBlock(x, y, blockTypes[blockType]));
		}
	}
	return blocks;
}

export function playerDistanceTravelled(dt, playerSpeed) {
	return (playerBaseSpeed * dt) + playerSpeed;
}

export function distanceTravelled(dt) {
	return creepBaseSpeed * dt;
}

export function createExplosions(bomb, blocks, explosionMagnitude) {
	const explosions = [];
	const x = bomb.x - bomb.offset.x;
	const y = bomb.y - bomb.offset.y;
	const explosionRadius = tileScale * explosionMagnitude;

	const filteredTerrainBlocks = blocks.filter(terrainBlock =>
		!terrainBlock.isSolid() &&
		terrainBlock.x >= x - explosionRadius &&
		terrainBlock.x <= x + explosionRadius &&
		terrainBlock.y >= y - explosionRadius &&
		terrainBlock.y <= y + explosionRadius
	);

	//Adds explosions to every direction, stops the explosion if solid block is in the way.
	//add explosions center to right;
	for (let i = x; i <= x + explosionRadius; i += tileScale) {
		const e = new Explosion(i, y);

		if (e.isValidPosition() && filteredTerrainBlocks.some(terrainBlock => terrainBlock.hasExplodeEffect(e))) {
			explosions.push(e);
		} else {
			break;
		}
	}

	//add explosions center to left
	for (let i = x; i >= x - explosionRadius; i -= tileScale) {
		const e = new Explosion(i, y);

		if (e.isValidPosition() && filteredTerrainBlocks.some(terrainBlock => terrainBlock.hasExplodeEffect(e))) {
			explosions.push(e);
		} else {
			break;
		}
	}

	//add explosions center to down
	for (let j = y; j <= y + explosionRadius; j += tileScale) {
		const e = new Explosion(x, j);

		if (e.isValidPosition() && filteredTerrainBlocks.some(terrainBlock => terrainBlock.hasExplodeEffect(e))) {
			explosions.push(e);
		} else {
			break;
		}
	}

	//add explosions center to up;
	for (let j = y; j >= y - explosionRadius; j -= tileScale) {
		const e = new Explosion(x, j);

		if (e.isValidPosition() && filteredTerrainBlocks.some(terrainBlock => terrainBlock.hasExplodeEffect(e))) {
			explosions.push(e);
		} else {
			break;
		}
	}

	return explosions;
}

export function shouldSpawnPowerUp() {
	return Math.random() <= powerUpChance;
}

export function getRandomIndex(max) {
	return Math.floor(Math.random() * max);
}
