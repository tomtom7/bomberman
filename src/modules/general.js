import TerrainBlock from './terrain';
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
				blocks.push(new TerrainBlock(x * tileScale, y * tileScale, tileScale, tileScale, false, true, spriteMap.terrain.empty));
			} else if (values.includes(y) && values.includes(x)) {
				blocks.push(new TerrainBlock(x * tileScale, y * tileScale, tileScale, tileScale, true, false, spriteMap.terrain.solid));
			} else {
				blocks.push(new TerrainBlock(x * tileScale, y * tileScale, tileScale, tileScale, true, true, spriteMap.terrain.soft));
			}
		}
	}
	return blocks;
}

export function distanceTravelled(dt) {
	return speed * dt;
}
