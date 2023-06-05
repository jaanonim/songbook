import { useEffect, useState } from "react";

function useWindowFocus(onFocus?: () => void, onBlur?: () => void) {
    const [isFocused, setIsFocused] = useState(true);

    useEffect(() => {
        const _onFocus = () => {
            setIsFocused(true);
            if (onFocus) onFocus();
        };
        const _onBlur = () => {
            setIsFocused(false);
            if (onBlur) onBlur();
        };

        window.addEventListener("focus", _onFocus);
        window.addEventListener("blur", _onBlur);

        _onFocus();

        return () => {
            window.removeEventListener("focus", _onFocus);
            window.removeEventListener("blur", _onBlur);
        };
    }, []);

    return isFocused;
}

export default useWindowFocus;
