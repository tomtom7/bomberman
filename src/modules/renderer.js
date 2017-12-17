import Grid from "./grid"

let canvas = document.getElementById("game-canvas");
import ResourceLoader from "./resourceloader";

let scoreBox = document.getElementById("score-box")
let ctx = canvas.getContext("2d");

class Renderer {

	constructor(options) {
		this.grid = new Grid(options);
		this.scale = this.grid.options.scale;
		this.resources = new ResourceLoader(['../img/wall.jpg'], this.draw);
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

	draw() {
	  console.log("loaded");
	  ctx.drawImage(this.resources.images[0], 0, 0, this.scale, this.scale);
	}

	render() {
		//this._clearCanvas();
		this._drawGrid(this.grid.options.scale);
		//this.draw();
	}
}

export default Renderer