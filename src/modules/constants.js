export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
export const tileScale = 64;
export const playerBaseSpeed = 200;
export const creepBaseSpeed = 125;
export const powerUpChance = 0.2;
export const creepPerTerrainBlocks = 20;
export const creepSpawnInterval = 3000;
export const powerUpTime = 10000;
export const explosionDelay = 1000;
export const bombDestructionDelay = 2000;
export const respawnDelay = 2000;
export const deathBlinkFrequency = 200;
export const directions = ['left', 'right', 'up', 'down'];
export const spriteMap = {
	player: {
		animationSpeed: 16,
		down: {
			name: 'Front/b_front_{index}.png',
			count: 8,
		},
		right: {
			name: 'Right/b_right_{index}.png',
			count: 8,
		},
		left: {
			name: 'Left/b_left_{index}.png',
			count: 8,
		},
		up: {
			name: 'Back/b_back_{index}.png',
			count: 8,
		},
	},
	creep: {
		animationSpeed: 16,
		down: {
			name: 'Front/c_front_{index}.png',
			count: 6,
		},
		right: {
			name: 'Right/c_right_{index}.png',
			count: 7,
		},
		left: {
			name: 'Left/c_left_{index}.png',
			count: 7,
		},
		up: {
			name: 'Back/c_back_{index}.png',
			count: 6,
		},
	},
	terrain: {
		empty: 'empty.png',
		soft: 'soft.png',
		solid: 'solid.png',
	},
	bomb: {
		name: 'bomb_{index}.png',
		count: 3,
		animationSpeed: 8,
	},
	explosion: {
		animationSpeed: 8,
		name: 'flame_{index}.png',
		count: 5,
	},
	powerUp: {
		bomb: 'bomb.png',
		speed: 'speed.png',
		flame: 'flame.png',
	},
};
export const powerUps = [
	{
		type: 'maxBombCount',
		spriteName: spriteMap.powerUp.bomb,
		value: 1,
	},
	{
		type: 'speed',
		spriteName: spriteMap.powerUp.speed,
		value: 1,
	},
	{
		type: 'explosionMagnitude',
		spriteName: spriteMap.powerUp.flame,
		value: 1,
	},
];
export const terrainBlocks = {
	soft: {
		type: 'soft',
		spriteName: spriteMap.terrain.soft,
		collideable: true,
	},
	solid: {
		type: 'solid',
		spriteName: spriteMap.terrain.solid,
		collideable: true,
	},
	empty: {
		type: 'empty',
		spriteName: spriteMap.terrain.empty,
		collideable: false,
	},
};

export const blockTypes = {
	0: terrainBlocks.empty,
	1: terrainBlocks.soft,
	2: terrainBlocks.solid
};