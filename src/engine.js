import Grid from './modules/grid';
import Renderer from './modules/renderer';
import MoveHandler from './modules/movehandler';
import ResourceLoader from './modules/resourceloader';
import spritesPNG from './assets/sprites.png';
import spritesData from './assets/sprites.json';
import bgWAV from './assets/bg.wav';

class Engine {
	constructor(resources) {
		this.grid = new Grid();
		this.renderer = new Renderer(resources, spritesData);
		this.moveHandler = new MoveHandler(this.grid);
		this.lastTime = Date.now();

		resources.audio.play();
		this.run();
	}

	run() {
		const currentTime = Date.now();
		const dt = (currentTime - this.lastTime) / 1000;

		this.moveHandler.handlePlayerInput(dt);
		this.moveHandler.moveCreeps(dt);
		this.moveHandler.updateAnimations(dt);
		this.grid.checkCollisions();
		this.renderer.render(this.grid);
		this.lastTime = currentTime;

		requestAnimationFrame(() => this.run());
	}
}

const sources = [
	{
		type: 'image',
		name: 'sprites',
	  source: spritesPNG,
	},
	{
		type: 'audio',
		name: 'audio',
		source: bgWAV,
		loop: true,
		volume: 0.2,
	}
];

async function start() {
	const resources = await new ResourceLoader(sources).load();
	new Engine(resources);
}

start();
