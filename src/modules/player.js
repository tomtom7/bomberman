import Block from './block/block';
import AnimatedSprite from './animatedsprite';

const frames = {
	down: "Front/b_front_{index}.png",
	right: "Right/b_right_{index}.png",
	left: "Left/b_left_{index}.png",
	up: "Back/b_back_{index}.png"
}

class Player extends Block {

	constructor(x = 0, y = 0) {
		//w && h scaled down 1.6
		super(x, y, 31, 55, true);
		this.sprite = new AnimatedSprite(frames, frames.down, 8, 16);
	}
}

export default Player;