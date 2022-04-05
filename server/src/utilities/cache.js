const fs = require('fs');

const cachePath = `./static/cache`

function cleanCache() {
    fs.readdirSync(cachePath).forEach(file => {
        fs.unlinkSync(`${cachePath}/${file}`);
    });
}

module.exports = {
    cleanCache,
    cachePath
};
