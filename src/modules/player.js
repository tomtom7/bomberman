class Player {

	constructor(x, y, scale) {

		this.maxFrames = 7;
		this.frames = {
			down: this._composeFrameNames("Front/b_front_"),
			right: this._composeFrameNames("Right/b_right_"),
			left: this._composeFrameNames("Left/b_left_"),
			up: this._composeFrameNames("Back/b_back_")
		};
		this.activeFrame = {
			index: 0,
			frames: this.frames.down
		};
		this.x = x;
		this.y = y;

		//scaled down 1.6
		this.w = 31;
		this.h = 55;
		this.speed = 16;
	}

	resetFrame() {
		this.activeFrame.index = 0;
	}

	setActiveFrame(dt, name) {
		this.activeFrame.index += this.speed * dt;
		this.activeFrame.frames = this.frames[name];
	}

	_composeFrameNames(name, frameCount) {
		let frameNames = [];

		for (let i = 0; i <= this.maxFrames; i++) {
			frameNames.push(name + i + ".png");
		}

		return frameNames;
	}

	getFrame() {
        return this.activeFrame.frames[Math.floor(this.activeFrame.index) % this.activeFrame.frames.length];
	}
}

export default Player;