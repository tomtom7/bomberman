const dist = '/dist';

class ResourceLoader {

	constructor(sources) {
		this.sources = sources;
		this.totalCount = sources.length;
		this.loadedCount = 0;
		this.resources = {};
	}

	load() {
		return new Promise((resolve, reject) => {
			this.sources.forEach(element => {
				let resource; 

				if (element.type == 'image') {
					resource = this.loadImage(resolve);
				} else if (element.type == 'audio') {
					resource = this.loadAudio(element, resolve);
				}
				resource.src = dist + element.source;

				resource.onerror = e => reject(e);

				this.resources[element.name] = resource;
			});
		});
	}

	onLoad(resolve) {
		this.loadedCount += 1;
		if (this.loadedCount >= this.totalCount) {
			resolve(this.resources);
		}
	}

	loadImage(resolve) {
		const resource = new Image();
		resource.onload = () => this.onLoad(resolve);

		return resource;
	}

	loadAudio(element, resolve) {
		const resource = new Audio();
		resource.loop = element.loop;
		resource.volume = element.volume;
		resource.oncanplaythrough = () => this.onLoad(resolve);

		return resource;
	}
}

export default ResourceLoader;
