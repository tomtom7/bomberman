import { distanceTravelled } from './general';

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
		const newX = this.player.x - distanceTravelled(dt);

		if (this._isLeft() && this.grid.canMove(newX, this.player.y, this.player.w, this.player.h)) {
			this.player.x = newX;
		}
	}

	_checkRightMovement(dt) {
		const newX = this.player.x + distanceTravelled(dt);
		if (this._isRight() && this.grid.canMove(newX, this.player.y, this.player.w, this.player.h)) {
			this.player.x = newX;
		}
	}

	_checkUpMovement(dt) {
		const newY = this.player.y - distanceTravelled(dt);
		if (this._isUp() && this.grid.canMove(this.player.x, newY, this.player.w, this.player.h)) {
			this.player.y = newY;
		}
	}

	_checkDownMovement(dt) {
		const newY = this.player.y + distanceTravelled(dt);
		if (this._isDown() && this.grid.canMove(this.player.x, newY, this.player.w, this.player.h)) {
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
		if (this.directions.length > 0) {
			this.player.sprite.update(dt, this.directions[0]);
		}

		this.player.bombs.forEach(bomb => bomb.sprite.update(dt));
		this.player.explosions.forEach(explosion => explosion.sprite.update(dt));
	}
}

export default MoveHandler;
