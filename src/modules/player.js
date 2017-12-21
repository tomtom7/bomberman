import Block from './block';
import Bomb from './bomb';
import Explosion from './explosion';
import AnimatedSprite from './animatedsprite';
import { getClosestDivisible } from './general';
import {tileScale, spriteMap} from './constants';

class Player extends Block {

	constructor(x = 0, y = 0) {
		//w && h scaled down 1.6
		super(x, y, 31, 55, true);
		this.sprite = new AnimatedSprite(spriteMap.player, spriteMap.player.down, 16);
		this.bombs = [];
		this.explosions = [];
	}

	_removeBombs() {
		this.bombs = [];
	}

  _createExplosions(bomb, blocks) {
      let explosions = [];
      let x = bomb.x - bomb.offset.x;
      let y = bomb.y - bomb.offset.y;

      for (let i = x - tileScale; i<= x + tileScale; i += tileScale) {
         explosions.push(new Explosion(i, y));
      }

      for (let j = y - tileScale; j<= y + tileScale; j += tileScale) {
         explosions.push(new Explosion(x , j));
      }

      return explosions.filter(e => e.isValidPosition() && blocks.some(block => block.explodable && e.isSameBlock(block.x, block.y)));
  }

	addBomb() {
		const x = getClosestDivisible(this.x, tileScale);
    const y = getClosestDivisible(this.y, tileScale);
    const bomb = new Bomb(x, y, spriteMap.bomb);
		this.bombs.push(bomb);

		return bomb;
	}

	canPlantBomb() {
		return this.bombs.length == 0;
	}

	removeExplosions() {
		this.explosions = [];
	}

	addExplosions(bomb, blocks) {
	  this.explosions = this._createExplosions(bomb, blocks);
	  this._removeBombs();
	}
}

export default Player;