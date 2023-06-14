import ScreenSettings from "./ScreenSettings";

export default interface ScreenData {
    socket: string;
    settings: ScreenSettings | null;
}

export interface ScreenDataNotNull {
    socket: string;
    settings: ScreenSettings;
}
