import Grid from "./grid"
import spritesJSON from './../images/sprites.json';

let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");

class Renderer {

	constructor(options, resources) {
		this.grid = new Grid(options, canvas);
		this.resources = resources;
	}

	_clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	_drawGrid() {
		ctx.beginPath();
		ctx.lineWidth = 0.15;
		ctx.strokeStyle = '#000000';
		for (let x = 0; x <= canvas.width; x += this.grid.options.tileScale) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
		}

		ctx.stroke();

		ctx.beginPath();
		for (let y = 0; y <= canvas.height; y += this.grid.options.tileScale) {
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
		}
		ctx.stroke();
	}

	_drawEntity(entity) {
		let sprite = this._getFrame(entity.sprite.frameName);
		ctx.drawImage(this.resources.sprites, sprite.x, sprite.y, sprite.w, sprite.h, entity.x, entity.y, entity.w, entity.h);
	}

	_drawEntities(entities) {
		entities.forEach(entity => this._drawEntity(entity));
	}

	_getFrame(frameName) {
		return spritesJSON.frames[frameName].frame;
	}

	render() {
		this._clearCanvas();
		this._drawGrid();
		this._drawEntities(this.grid.blocks);
		this._drawEntities(this.grid.bombs);
		this._drawEntity(this.grid.player);
	}
}

export default Renderer