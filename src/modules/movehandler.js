import { distanceTravelled, playerDistanceTravelled } from './general';

class MoveHandler {
	constructor(grid) {
		this.grid = grid;
		this.player = grid.player;
		document.addEventListener('keyup', e => this._removeKey(e));
		document.addEventListener('keydown', e => this._saveKey(e));

		this.keyMap = {
			83: 'down',
			40: 'down',
			87: 'up',
			38: 'up',
			65: 'left',
			37: 'left',
			68: 'right',
			39: 'right',
			32: 'bomb',
		};
		this.directions = [];
	}

	_isUp() {
		return this._isDirection('up');
	}

	_isDown() {
		return this._isDirection('down');
	}

	_isLeft() {
		return this._isDirection('left');
	}

	_isRight() {
		return this._isDirection('right');
	}

	_isDirection(direction) {
		return this.directions.includes(direction);
	}

	_saveKey(e) {
		const action = this.keyMap[e.keyCode];

		if (action == 'bomb' && this.player.canPlantBomb()) {
			this.grid.addBomb();
		} else if (action != 'bomb' && !this._isDirection(action)) {
			this.directions.push(action);
		}
	}

	_removeKey(e) {
		if (this.directions.length > 0) {
			this.directions = this.directions.filter(d => d !== this.keyMap[e.keyCode]);
		}
		this.grid.player.sprite.reset();
	}

	_checkLeftMovement(dt) {
		const newX = this.player.x - playerDistanceTravelled(dt, this.player.speed);

		if (this._isLeft() && this.grid.canMove(newX, this.player.y, this.player.w, this.player.h)) {
			this.player.x = newX;
		}
	}

	_checkRightMovement(dt) {
		const newX = this.player.x + playerDistanceTravelled(dt, this.player.speed);
		if (this._isRight() && this.grid.canMove(newX, this.player.y, this.player.w, this.player.h)) {
			this.player.x = newX;
		}
	}

	_checkUpMovement(dt) {
		const newY = this.player.y - playerDistanceTravelled(dt, this.player.speed);
		if (this._isUp() && this.grid.canMove(this.player.x, newY, this.player.w, this.player.h)) {
			this.player.y = newY;
		}
	}

	_checkDownMovement(dt) {
		const newY = this.player.y + playerDistanceTravelled(dt, this.player.speed);
		if (this._isDown() && this.grid.canMove(this.player.x, newY, this.player.w, this.player.h)) {
			this.player.y = newY;
		}
	}

	_updatePlayerAnimation(dt) {
		if (this.directions.length > 0) {
			this.player.sprite.update(dt, this.directions[0]);
		}
	}

	handlePlayerInput(dt) {
		if (this.grid.player.dead) {
			return;
		}
		this._checkUpMovement(dt);
		this._checkLeftMovement(dt);
		this._checkRightMovement(dt);
		this._checkDownMovement(dt);
	}

	updateAnimations(dt) {
		if (this.directions.length > 0 && !this.player.dead) {
			this.player.sprite.update(dt, this.directions[0]);
		}

		this.player.bombs.forEach(bomb => bomb.sprite.update(dt));
		this.player.explosions.forEach(explosion => explosion.sprite.update(dt));
	}

	moveCreeps(dt) {
		this.grid.creeps.forEach(creep => {
			if (creep.direction == 'left') {
				this.moveCreep(creep.x - distanceTravelled(dt), creep.y, creep);
			}
			if (creep.direction == 'right') {
				this.moveCreep(creep.x + distanceTravelled(dt), creep.y, creep);
			}
			if (creep.direction == 'up') {
				this.moveCreep(creep.x, creep.y - distanceTravelled(dt), creep);
			}
			if (creep.direction == 'down') {
				this.moveCreep(creep.x, creep.y + distanceTravelled(dt), creep);
			}
			creep.sprite.update(dt, creep.direction);
		});
	}

	moveCreep(x, y, creep) {
		if (this.grid.canMove(x, y, creep.w, creep.h)) {
			creep.x = x;
			creep.y = y;
		} else {
			creep.setNewDirection();
		}
	}
}

export default MoveHandler;
