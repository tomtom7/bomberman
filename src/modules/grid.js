import Player from './player';
import Block from './block';
import { createBlocks } from './general';

class Grid {
	constructor() {
		this.player = new Player(16, 0);
		this.blocks = createBlocks();
	}

	addBomb() {
		const bomb = this.player.addBomb();
		setTimeout(() => this.destructBomb(bomb), 3000);
	}

	destructBomb(bomb) {
		this.player.addExplosions(bomb, this.blocks);
		setTimeout(() => this.updateGrid(), 2000);
	}

	updateGrid() {
		this.blocks.forEach(block => {
			this.player.explosions.forEach(explosion => explosion.process(block));
		});

		this.player.removeExplosions();
	}

	canMove(x, y, w, h) {
		const block = new Block(x, y, w, h);
		return block.isValid(this.blocks);
	}
}

export default Grid;
