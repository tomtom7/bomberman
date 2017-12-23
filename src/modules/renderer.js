import { canvas, ctx, tileScale } from './constants';

class Renderer {
	constructor(resources, spritesData) {
		this.resources = resources;
		this.spritesData = spritesData;
	}

	_clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	_drawGrid() {
		ctx.beginPath();
		ctx.lineWidth = 0.15;
		ctx.strokeStyle = '#000000';
		for (let x = 0; x <= canvas.width; x += tileScale) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
		}

		ctx.stroke();

		ctx.beginPath();
		for (let y = 0; y <= canvas.height; y += tileScale) {
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
		}
		ctx.stroke();
	}

	_drawEntity(entity) {
		const sprite = this._getFrame(entity.sprite.frameName);
		ctx.drawImage(this.resources.sprites, sprite.x, sprite.y, sprite.w, sprite.h, entity.x, entity.y, entity.w, entity.h);
	}

	_drawEntities(entities) {
		entities.forEach(entity => this._drawEntity(entity));
	}

	_getFrame(frameName) {
		return this.spritesData.frames[frameName].frame;
	}

	render(grid) {
		this._clearCanvas();
		this._drawGrid();
		this._drawEntities(grid.terrainBlocks);
		this._drawEntities(grid.player.bombs);
		this._drawEntity(grid.player);
		this._drawEntities(grid.powerUps);
		this._drawEntities(grid.player.explosions);
	}
}

export default Renderer;
