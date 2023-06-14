import { useEffect } from "react";

export default function useKey(onKey: (e: any) => void, deps?: any[]) {
    useEffect(() => {
        const _onKeyDown = (e: any) => {
            if (document.activeElement === document.body) {
                onKey(e);
            }
        };

        document.body.addEventListener("keydown", _onKeyDown);
        return () => {
            document.body.removeEventListener("keydown", _onKeyDown);
        };
    }, deps || []);
}
