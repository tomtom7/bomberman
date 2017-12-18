
class MoveHandler {
	constructor(grid, speed) {
		this.grid = grid;
		this.speed = speed;
		this.keys = [];
		document.addEventListener("keyup", (e) => this._removeKey(e)); 
		document.addEventListener("keydown", (e) => this._saveKey(e));
	}

	_isTop() {
	    return this.keys[87] || this.keys[38];
	}

	_isDown() {
	    return this.keys[83] || this.keys[40];
	}

	_isLeft() {
	    return this.keys[65] || this.keys[37];
	}

	_isRight() {
	    return this.keys[68] || this.keys[39];
	}

	_saveKey(e) {
		this.keys[e.keyCode] = true;
	}

	_removeKey(e) {
		this.keys[e.keyCode] = false;
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

	handleInput(dt) {
		this._checkTopMovement(dt);
		this._checkLeftMovement(dt);
		this._checkRightMovement(dt);
		this._checkDownMovement(dt);
    }
}

export default MoveHandler
