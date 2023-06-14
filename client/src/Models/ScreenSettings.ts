import getRandomName from "../Utilities/randomName";

export default class ScreenSettings {
    fontSize: number;
    showChords: boolean;
    name: string;
    id: string;

    constructor(id: string) {
        this.id = id;
        this.fontSize = 50;
        this.showChords = false;
        this.name = getRandomName();
    }
}
