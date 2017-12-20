class MoveHandler {
	constructor(grid, speed) {
		this.grid = grid;
		this.speed = speed;
		document.addEventListener("keyup", (e) => this._removeKey(e));
		document.addEventListener("keydown", (e) => this._saveKey(e));

		this.keyMap = {
			83: "down",
			40: "down",
			87: "up",
			38: "up",
			65: "left",
			37: "left",
			68: "right",
			39: "right",
			32: "bomb"
		}
		this.directions = [];
		this.actions = [];
	}

	_isUp() {
		return this._isDirection("up");
	}

	_isDown() {
		return this._isDirection("down");
	}

	_isLeft() {
		return this._isDirection("left");
	}

	_isRight() {
		return this._isDirection("right");
	}

	_isDirection(direction) {
		return this.directions.includes(direction);
	}

	_isBombPlant() {
		return this.actions.includes("bomb");
	}

	_saveKey(e) {
		let action = this.keyMap[e.keyCode];

		if (action == 'bomb') {
			this.actions.push(action);
		} else if(action && !this._isDirection(action)) {
			this.directions.push(action);
		}
	}

	_removeKey(e) {
		if (this.directions.length > 0) {
			this.directions = this.directions.filter(d => d !== this.keyMap[e.keyCode]);
		}

		if(this.actions.length > 0) {
			this.actions = this.actions.filter(d => d !== this.keyMap[e.keyCode])
		}
		this.grid.player.sprite.reset();
	}

	_checkLeftMovement(dt) {
		let newX = this.grid.player.x - this._getDistanceTravelled(dt);

		if (this._isLeft() && this.grid.canMove(newX, this.grid.player.y, this.grid.player.w, this.grid.player.h, true)) {
			this.grid.player.x = newX;
		}
	}

	_getDistanceTravelled(dt) {
		return this.speed * dt;
	}

	_checkRightMovement(dt) {
		let newX = this.grid.player.x + this._getDistanceTravelled(dt);
		if (this._isRight() && this.grid.canMove(newX, this.grid.player.y, this.grid.player.w, this.grid.player.h, true)) {
			this.grid.player.x = newX;
		}
	}

	_checkUpMovement(dt) {
		let newY = this.grid.player.y - this._getDistanceTravelled(dt);
		if (this._isUp() && this.grid.canMove(this.grid.player.x, newY, this.grid.player.w, this.grid.player.h, true)) {
			this.grid.player.y = newY;
		}
	}

	_checkDownMovement(dt) {
		let newY = this.grid.player.y + this._getDistanceTravelled(dt);
		if (this._isDown() && this.grid.canMove(this.grid.player.x, newY, this.grid.player.w, this.grid.player.h, true)) {
			this.grid.player.y = newY;
		}
	}

	_updatePlayerAnimation(dt) {
		if (this.directions.length > 0) {
			this.grid.player.sprite.update(dt, this.directions[0]);
		}
	}

	_checkBombPlant(dt) {
		if (this._isBombPlant() && this.grid.player.canPlantBomb()) {
			this.grid.addBomb();
		}
	}

	handlePlayerInput(dt) {
		this._checkUpMovement(dt);
		this._checkLeftMovement(dt);
		this._checkRightMovement(dt);
		this._checkDownMovement(dt);
		this._checkBombPlant(dt);
	}

	updateAnimations(dt) {
		if (this.directions.length > 0) {
			this.grid.player.sprite.update(dt, this.directions[0]);
		}

		this.grid.player.bombs.forEach(bomb => bomb.sprite.update(dt));
		this.grid.player.explosions.forEach(explosion => explosion.sprite.update(dt));
	}
}

export default MoveHandler