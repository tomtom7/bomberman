import TerrainBlock from './terrainblock';
import Explosion from './explosion';
import { canvas, terrainBlocks, tileScale, speed, powerUpChance } from './constants';

export function getClosestDivisible(value, divisble) {
	return Math.floor(value / divisble) * divisble;
}

export function createTerrainBlocks() {
	const blocks = [];
	const values = [1, 3, 5, 7, 9, 11];

	for (let x = 0; x <= canvas.width / tileScale; x += 1) {
		for (let y = 0; y <= canvas.height / tileScale; y += 1) {
			if ((x < 3 && y == 0) || (y < 3 && x == 0)) {
				blocks.push(new TerrainBlock(x, y, terrainBlocks.empty));
			} else if (values.includes(y) && values.includes(x)) {
				blocks.push(new TerrainBlock(x, y, terrainBlocks.solid));
			} else {
				blocks.push(new TerrainBlock(x, y, terrainBlocks.soft));
			}
		}
	}
	return blocks;
}

export function distanceTravelled(dt, playerSpeed) {
	return (speed * dt) + playerSpeed;
}

export function createExplosions(bomb, terrainBlocks, explosionMagnitude) {
	const explosions = [];
	const x = bomb.x - bomb.offset.x;
	const y = bomb.y - bomb.offset.y;
	const explosionRadius = tileScale * explosionMagnitude;

	const filteredTerrainBlocks = terrainBlocks.filter(terrainBlock =>
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
