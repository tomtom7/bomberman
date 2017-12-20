class AnimatedSprite {

	constructor(frames, activeFrameName, frameCount, speed) {
		this.frames = frames;
		this.frameCount = frameCount;
		this.speed = speed;

		this.activeFrame = {
			index: 0,
			name: activeFrameName
		};
	}

	_getCurrentFrameIndex() {
		return Math.floor(this.activeFrame.index) % this.frameCount;
	}

	reset() {
		this.activeFrame.index = 0;
	}

	update(dt, name) {
		console.log(name);
		this.activeFrame.index += this.speed * dt;

		if (name) {
			this.activeFrame.name = this.frames[name];
		}
	}

	get frameName() {
		return this.activeFrame.name.replace("{index}", this._getCurrentFrameIndex());
	}

}

export default AnimatedSprite;