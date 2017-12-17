class ResourceLoader {

    constructor(sources, callback) {
        this.sources = sources;
        this.images = [];
        this.callback = callback;
        this.loadedImageCount = 0;
        this._load();
    }

    _load() {
        this.sources.forEach(source => {
            let img = new Image();
            img.onload = this._imageLoaded;
            img.src = source;
            this.images.push(img);
        });
        console.log(this.images);
    }


    _imageLoaded() {
        this.loadedImageCount++;
        if (this.loadedImageCount >= this.sources.length) {
            this.callback();
        }
    }

}

export default ResourceLoader;