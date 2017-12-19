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

	drawRocks() {
		this.grid.rocks.forEach(rock => this.drawRock(rock));
	}

	drawRock(rock) {
		let frame = this.getFrame("hard.png");
		ctx.drawImage(this.resources.sprites, frame.x, frame.y, frame.w, frame.h, rock.x, rock.y, this.grid.options.tileScale, this.grid.options.tileScale);
	}

	drawPlayer() {
		let frame = this.getFrame(this.grid.player.getFrame());
		ctx.drawImage(this.resources.sprites, frame.x, frame.y, frame.w, frame.h, this.grid.player.x, this.grid.player.y, this.grid.player.w, this.grid.player.h);
	}

	getFrame(frameName) {
		return spritesJSON.frames[frameName].frame;
	}

	render() {
		this._clearCanvas();
		this._drawGrid();
		this.drawPlayer();
		this.drawRocks();
	}
}

export default Renderer