module.exports = class Model {
    constructor(data) {
        for (let key in data) {
            if (this["validate_" + key]) {
                this["validate_" + key](data[key]);
            } else {
                this[key] = data[key];
            }
        }
    }

    static toJson(obj) {
        if (obj !== undefined) {
            return JSON.stringify(obj);
        }
        return JSON.stringify(this);
    }
}
