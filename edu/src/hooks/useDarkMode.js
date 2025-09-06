import { useState, useEffect } from "react";

/*
useDarkMode:
- Reads saved preference from localStorage (key: edustream:dark)
- Defaults to system preference if no saved value
- Toggles the 'dark' class on the documentElement
*/
export default function useDarkMode() {
    const [dark, setDark] = useState(() => {
        try {
            const saved = localStorage.getItem("edustream:dark");
            if (saved !== null) return saved === "true";
        } catch (e) { }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        try {
            localStorage.setItem("edustream:dark", dark ? "true" : "false");
        } catch (e) { }
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return [dark, setDark];
}
