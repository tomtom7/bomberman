const dist = '/dist';

class ResourceLoader {

    static load(sources) {
        let images = {};
        let loadedImages = 0;
        let keys = Object.keys(sources);
        let numImages = keys.length;

        return new Promise((resolve, reject) => {
            keys.forEach(key => {
                images[key] = new Image();
                images[key].src = dist + sources[key];
                images[key].onload = () => {
                    loadedImages++;
                    if (loadedImages >= numImages) {
                        resolve(images);
                    }
                }
                images[key].onerror = () => {
                    reject("Error loading: " + dist + sources[key]);
                }
            });
        });
    }
}

export default ResourceLoader;