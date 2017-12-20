import Block from './block/block';
import AnimatedSprite from './animatedsprite';

const frames = {
	bomb: "bomb_{index}.png"
};

class Player extends Block {

	constructor(x = 0, y = 0) {
		//w && h scaled down 1.6
		super(x, y, 48, 48, true);
		this.sprite = new AnimatedSprite(frames, frames.bomb, 3, 16);
	}
}

export default Player;