import Grid from './modules/grid';
import Renderer from './modules/renderer';
import MoveHandler from './modules/movehandler';
import ResourceLoader from './modules/resourceloader';
import spritesPNG from './images/sprites.png';
import spritesData from './images/sprites.json';

class Engine {
  constructor(resources) {
    this.grid = new Grid();
    this.renderer = new Renderer(resources, spritesData);
    this.moveHandler = new MoveHandler(this.grid);
    this.lastTime = Date.now();
    this.run();
  }

  run() {
    const currentTime = Date.now();
    const dt = (currentTime - this.lastTime) / 1000;

    this.moveHandler.handlePlayerInput(dt, this.grid.player);
    this.moveHandler.updateAnimations(dt);
    this.renderer.render(this.grid);
    this.lastTime = currentTime;

    requestAnimationFrame(() => this.run());
  }
}

const sources = {
  sprites: spritesPNG,
};

async function start() {
  const resources = await ResourceLoader.load(sources);
  new Engine(resources);
}

start();
