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
			39: "right"
		}
		this.directions = [];
	}

	_isTop() {
		return this.directions.includes("up");
	}

	_isDown() {
		return this.directions.includes("down");
	}

	_isLeft() {
		return this.directions.includes("left");
	}

	_isRight() {
		return this.directions.includes("right");
	}

	_saveKey(e) {
		let direction = this.keyMap[e.keyCode];
		if (direction && !this.directions.includes(direction)) {
			this.directions.push(direction);
		}
	}

	_removeKey(e) {
		this.directions = this.directions.filter(d => d !== this.keyMap[e.keyCode]);
		this.grid.player.resetFrame();
	}

	_checkLeftMovement(dt) {
		let newX = this.grid.player.x - this.getDistanceTravelled(dt);

		if (this._isLeft() && this.grid.canMove(newX, this.grid.player.y)) {
			this.grid.player.x = newX;
		}
	}

	getDistanceTravelled(dt) {
		return this.speed * dt;
	}

	_checkRightMovement(dt) {
		let newX = this.grid.player.x + this.getDistanceTravelled(dt);
		if (this._isRight() && this.grid.canMove(newX, this.grid.player.y)) {
			this.grid.player.x = newX;
		}
	}

	_checkTopMovement(dt) {
		let newY = this.grid.player.y - this.getDistanceTravelled(dt);
		if (this._isTop() && this.grid.canMove(this.grid.player.x, newY)) {
			this.grid.player.y = newY;
		}
	}

	_checkDownMovement(dt) {
		let newY = this.grid.player.y + this.getDistanceTravelled(dt);
		if (this._isDown() && this.grid.canMove(this.grid.player.x, newY)) {
			this.grid.player.y = newY;
		}
	}

	setPlayerFrame(dt) {
		if (this.directions.length > 0) {
			this.grid.player.setActiveFrame(dt, this.directions[0]);
		}
	}

	handleInput(dt) {
		this.setPlayerFrame(dt);
		this._checkTopMovement(dt);
		this._checkLeftMovement(dt);
		this._checkRightMovement(dt);
		this._checkDownMovement(dt);
	}
}

export default MoveHandler