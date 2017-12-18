class ResourceLoader {

    static load(sources, callback) {
        let images = {};
        let loadedImages = 0;
        let keys = Object.keys(sources);
        let numImages = keys.length;

        keys.forEach(key => {
            images[key] = new Image();
            images[key].src = sources[key];
            images[key].onload = () => {
                loadedImages++;
                if (loadedImages >= numImages) {
                    callback(images);
                }
            }
            images[key].onerror = () => {
                console.log("Error loading: " + sources[key]);
            }
        });
    }
}

export default ResourceLoader;