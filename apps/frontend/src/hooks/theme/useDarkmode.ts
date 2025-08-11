import { useCallback } from "react";
import type { ThemeProviderState } from "@/types/themes/theme";

export const useDarkmode = ({ theme, setTheme }: ThemeProviderState) => {

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    return { toggleTheme };
}