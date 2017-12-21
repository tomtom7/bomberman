class AnimatedSprite {
	constructor(frames, activeFrame, speed) {
		this.frames = frames;
		this.speed = speed;

		this.frame = {
			index: 0,
			data: activeFrame,
		};
	}

	_getCurrentFrameIndex() {
		return Math.floor(this.frame.index) % this.frame.data.count;
	}

	reset() {
		this.frame.index = 0;
	}

	update(dt, name) {
		this.frame.index += this.speed * dt;

		if (name && Object.keys(this.frames).length > 0) {
			this.frame.data = this.frames[name];
		}
	}

	get frameName() {
		return this.frame.data.name.replace('{index}', this._getCurrentFrameIndex());
	}
}

export default AnimatedSprite;
