
class MoveHandler {
	constructor(renderer) {
		this.renderer = renderer;
		this.grid = renderer.grid;
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
		this._checkMovement();
	}

	_removeKey(e) {
		this.keys[e.keyCode] = false;
	}

	_checkLeftMovement() {
		if (this._isLeft()) {
            //this.grid.currentShape.move(LEFT);
        } 
	}

	_checkRightMovement() {
        if (this._isRight()) {
            //this.grid.currentShape.move(RIGHT);
        }
	}

	_checkTopMovement() {
        if (this._isTop()) {
            //this.grid.currentShape.rotate();
        }
	}

	_checkDownMovement() {
		if (this._isDown()) {
			//this.tickDown();
        }
	}


    _checkGameOver() {
		if (!this._canMoveDown()) {
			//this.grid.reset();
		}
	}

	_canMoveDown() {
		//return this.grid.currentShape.canMove(DOWN, this.grid.blocks)
	}

	_checkMovement() {
		this._checkTopMovement();
		this._checkLeftMovement();
		this._checkRightMovement();
		this._checkDownMovement();
		this.renderer.render();
    }
}

export default MoveHandler
