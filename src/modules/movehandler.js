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
		this.actions = [];
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

	_isBombPlant() {
		return this.actions.includes('bomb');
	}

	_saveKey(e) {
		const action = this.keyMap[e.keyCode];

		if (action == 'bomb') {
			this.actions.push(action);
		} else if (action && !this._isDirection(action)) {
			this.directions.push(action);
		}
	}

	_removeKey(e) {
		if (this.directions.length > 0) {
			this.directions = this.directions.filter(d => d !== this.keyMap[e.keyCode]);
		}

		if (this.actions.length > 0) {
			this.actions = this.actions.filter(d => d !== this.keyMap[e.keyCode]);
		}
		this.grid.player.sprite.reset();
	}

	_checkLeftMovement(dt) {
		const newX = this.player.x - playerDistanceTravelled(dt, this.player.speed);

		if (this._isLeft() && !this.grid.player.dead && this.grid.canMove(newX, this.player.y, this.player.w, this.player.h)) {
			this.player.x = newX;
		}
	}

	_checkRightMovement(dt) {
		const newX = this.player.x + playerDistanceTravelled(dt, this.player.speed);
		if (this._isRight() && !this.grid.player.dead && this.grid.canMove(newX, this.player.y, this.player.w, this.player.h)) {
			this.player.x = newX;
		}
	}

	_checkUpMovement(dt) {
		const newY = this.player.y - playerDistanceTravelled(dt, this.player.speed);
		if (this._isUp() && !this.grid.player.dead && this.grid.canMove(this.player.x, newY, this.player.w, this.player.h)) {
			this.player.y = newY;
		}
	}

	_checkDownMovement(dt) {
		const newY = this.player.y + playerDistanceTravelled(dt, this.player.speed);
		if (this._isDown() && !this.grid.player.dead && this.grid.canMove(this.player.x, newY, this.player.w, this.player.h)) {
			this.player.y = newY;
		}
	}

	_updatePlayerAnimation(dt) {
		if (this.directions.length > 0) {
			this.player.sprite.update(dt, this.directions[0]);
		}
	}

	_checkBombPlant() {
		if (this._isBombPlant() && this.player.canPlantBomb()) {
			this.actions = [];
			this.grid.addBomb();
		}
	}

	handlePlayerInput(dt) {
		this._checkUpMovement(dt);
		this._checkLeftMovement(dt);
		this._checkRightMovement(dt);
		this._checkDownMovement(dt);
		this._checkBombPlant();
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
				const newX = creep.x - distanceTravelled(dt);
				if (this.grid.canMove(newX, creep.y, creep.w, creep.h)) {
					creep.x = newX;
				} else {
					creep.setNewDirection();
				}
			}
			if (creep.direction == 'right') {
				const newX = creep.x + distanceTravelled(dt);
				if (this.grid.canMove(newX, creep.y, creep.w, creep.h)) {
					creep.x = newX;
				} else {
					creep.setNewDirection();
				}
			}
			if (creep.direction == 'up') {
				const newY = creep.y - distanceTravelled(dt);
				if (this.grid.canMove(creep.x, newY, creep.w, creep.h)) {
					creep.y = newY;
				} else {
					creep.setNewDirection();
				}
			}
			if (creep.direction == 'down') {
				const newY = creep.y + distanceTravelled(dt);
				if (this.grid.canMove(creep.x, newY, creep.w, creep.h)) {
					creep.y = newY;
				} else {
					creep.setNewDirection();
				}
			}
			creep.sprite.update(dt, creep.direction);
		});
	}
}

export default MoveHandler;
