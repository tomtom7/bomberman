const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const spriteMap = {
	player: {
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
	terrain: {
		empty: 'empty.png',
		soft: 'soft.png',
		solid: 'solid.png',
	},
	bomb: {
		name: 'bomb_{index}.png',
		count: 3,
	},
	explosion: {
		name: 'flame_{index}.png',
		count: 5,
	},
};

const tileScale = 64;
const speed = 300;

export { canvas, ctx, spriteMap, tileScale, speed };
