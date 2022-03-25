function lexer(text) {
    let data = [];
    let current = "";
    let i = 0;
    while (true) {
        if (text[i] === "{") {
            if (current.length > 0) {
                data.push(current);
                current = "";
            }
            while (text[i] !== "}") {
                current += text[i];
                i++;
            }
            current += text[i];
            i++;
            data.push(current);
            current = "";
        }
        if (i >= text.length) {
            if (current != undefined && current.length > 0) {
                data.push(current);
            }
            break;
        }
        current += text[i];
        i++;
    }
    return data;
}


let x = lexer("{gfg}ghj {jhjg} gfd");
['{gfg}', 'ghj', '{jhjg}']
x
