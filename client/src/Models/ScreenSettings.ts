import getRandomName from "../Utilities/randomName";
import UnsplashSimpleImg from "./UnsplashSimpleImg";

interface ScreenSettingsInterface {
    fontSize: number;
    showChords: boolean;
    background: UnsplashSimpleImg | string;
    name: string;
    id: string;
    fontColor: string;
}

export default class ScreenSettings implements ScreenSettingsInterface {
    fontSize: number;
    fontColor: string;
    showChords: boolean;
    background: UnsplashSimpleImg | string;
    name: string;
    id: string;

    constructor(id: string) {
        this.id = id;
        this.fontSize = 50;
        this.fontColor = "white";
        this.showChords = false;
        this.background = "";
        this.name = getRandomName();
    }

    copy() {
        const copy = new ScreenSettings(this.id);
        copy.fontSize = this.fontSize;
        copy.showChords = this.showChords;
        copy.fontColor = this.fontColor;
        copy.background = this.background;
        copy.name = this.name;
        return copy;
    }

    static fromObj(data: ScreenSettingsInterface) {
        const copy = new ScreenSettings(data.id);
        copy.fontSize = data.fontSize;
        copy.showChords = data.showChords;
        copy.fontColor = data.fontColor;
        copy.background = data.background;
        copy.name = data.name;
        return copy;
    }
}
