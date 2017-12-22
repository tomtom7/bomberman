import Block from './block';

class OffsetBlock extends Block {
	constructor(x, y, offset, w, h, collideable) {
		super(x + offset.x, y + offset.y, w, h, collideable);
		this.offset = offset;
	}

	isSameBlock(x, y) {
		return this.x - this.offset.x == x && this.y - this.offset.y == y;
	}
}

export default OffsetBlock;

