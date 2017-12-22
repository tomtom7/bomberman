import TerrainBlock from './terrainblock';
import Explosion from './explosion';
import { canvas, spriteMap, tileScale, speed } from './constants';

export function getClosestDivisible(value, divisble) {
	return Math.floor(value / divisble) * divisble;
}

export function createBlocks() {
	const blocks = [];
	const values = [1, 3, 5, 7, 9, 11];

	for (let x = 0; x <= canvas.width / tileScale; x += 1) {
		for (let y = 0; y <= canvas.height / tileScale; y += 1) {
			if ((x < 3 && y == 0) || (y < 3 && x == 0)) {
				blocks.push(new TerrainBlock(x, y, false, true, spriteMap.terrain.empty));
			} else if (values.includes(y) && values.includes(x)) {
				blocks.push(new TerrainBlock(x, y, true, false, spriteMap.terrain.solid));
			} else {
				blocks.push(new TerrainBlock(x, y, true, true, spriteMap.terrain.soft));
			}
		}
	}
	return blocks;
}

export function distanceTravelled(dt) {
	return speed * dt;
}

export function createExplosions(bomb, blocks) {
	const explosions = [];
	const x = bomb.x - bomb.offset.x;
	const y = bomb.y - bomb.offset.y;

	for (let i = x - tileScale; i <= x + tileScale; i += tileScale) {
		explosions.push(new Explosion(i, y));
	}

	for (let j = y - tileScale; j <= y + tileScale; j += tileScale) {
		explosions.push(new Explosion(x, j));
	}

	return explosions.filter(e => e.isValidPosition() && blocks.some(terrainBlock => terrainBlock.canExplode(e)));
}
