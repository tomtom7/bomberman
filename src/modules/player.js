import Block from './block';
import AnimatedSprite from './animatedsprite';

class Player extends Block {

	constructor(x = 0, y = 0, playerSprite) {
		//w && h scaled down 1.6
		super(x, y, 31, 55, true);
		this.sprite = new AnimatedSprite(playerSprite, playerSprite.down, 16, true);
		this.bombs = [];
		this.explosions = [];
	}

	canPlantBomb() {
		return this.bombs.length == 0;
	}

	removeBombs() {
		this.bombs = [];
	}

	removeExplosions() {
		this.explosions = [];
	}
}

export default Player;