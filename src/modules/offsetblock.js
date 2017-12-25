import Block from './block';

class OffsetBlock extends Block {
	constructor(x, y, offset, w, h, collideable) {
		super(x + offset.x, y + offset.y, w, h, collideable);
		this.offset = offset;
	}
}

export default OffsetBlock;

