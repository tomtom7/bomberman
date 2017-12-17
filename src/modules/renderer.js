import Grid from "./grid"

let canvas = document.getElementById("game-canvas");
let scoreBox = document.getElementById("score-box")
let ctx = canvas.getContext("2d");

class Renderer {

	constructor(options) {
		this.grid = new Grid(options);
	}

	_clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	_drawGrid(scale) {
	    ctx.beginPath();
	    ctx.lineWidth = 0.15;
	    ctx.strokeStyle = '#000000';
	    for (let x = 0; x <= canvas.width; x += scale) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
	    }

	    ctx.stroke(); 

	    ctx.beginPath();
	    for (let y = 0; y <= canvas.height; y += scale) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
	    }
	    ctx.stroke(); 
	}


	_renderBlock(block) {
		ctx.beginPath();
		ctx.rect(block.x, block.y, block.scale, block.scale);
		ctx.fillStyle = block.color;
		ctx.fill();

		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.closePath();
	}

	_renderBlocks(blocks) {
		ctx.save();
		blocks.forEach(b => this._renderBlock(b));
		ctx.restore();
	}

	render() {
		this._clearCanvas();
		this._drawGrid(this.grid.options.scale);
	}
}

export default Renderer