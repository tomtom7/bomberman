import { canvas, ctx, tileScale } from './constants';
import { getDeathBlinkInterval } from './general';

class Renderer {
	constructor(resources, spritesData) {
		this.resources = resources;
		this.spritesData = spritesData;
	}

	_clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
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
		this._drawEntities(grid.terrainBlocks);
		this._drawEntities(grid.player.bombs);

		if (!grid.player.dead || getDeathBlinkInterval()) {
    	this._drawEntity(grid.player);
	  }

		this._drawEntities(grid.creeps);
		this._drawEntities(grid.powerUps);
		this._drawEntities(grid.player.explosions);
	}
}

export default Renderer;
