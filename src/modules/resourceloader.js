const dist = '/dist';

class ResourceLoader {
	static load(sources) {
		const images = {};
		let loadedImages = 0;
		const keys = Object.keys(sources);
		const numImages = keys.length;

		return new Promise((resolve, reject) => {
			keys.forEach(key => {
				images[key] = new Image();
				images[key].src = dist + sources[key];
				images[key].onload = () => {
					loadedImages += 1;
					if (loadedImages >= numImages) {
						resolve(images);
					}
				};
				images[key].onerror = e => {
					reject(e);
				};
			});
		});
	}
}

export default ResourceLoader;
