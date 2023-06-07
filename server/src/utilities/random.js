const defaultCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const getRandomString = (length, charset = defaultCharset) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
};

module.exports = { getRandomString };
