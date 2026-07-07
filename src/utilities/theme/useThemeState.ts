import { config, ThemeState, ThemeStateArray, UseThemeState } from './types';

/**
 * Custom React hook for managing and modifying the theme state ('light', 'dark', or 'system') on the web.
 * It interacts with the browser's `localStorage` and `document.body` to persist and apply theme choices.
 *
 * @returns {UseThemeState} An object containing the following theme control methods:
 * - `setThemeState(mode: ThemeState)`: Sets the theme to the specified mode.
 *   - `'light'`: Sets the storage item to `'light'`, removes the dark theme class from the document body, and disables the OS color scheme change listener.
 *   - `'dark'`: Sets the storage item to `'dark'`, adds the dark theme class to the document body, and disables the OS color scheme change listener.
 *   - `'system'`: Sets the storage item to `'system'`, matches the document body class to the current OS color scheme preference, and registers a listener to react to future OS color scheme preference changes.
 * - `getThemeState()`: Retrieves the stored theme value from `localStorage`. Defaults to `'light'` if empty or invalid.
 */
export default function useThemeState(): UseThemeState {
    const { bodyClass, localStorageName } = config;

    const htmlClassProcess = (isDark: boolean) => {
        isDark
            ? document.body.classList.add(bodyClass)
            : document.body.classList.remove(bodyClass);
    };
    const themeCallback = (event: MediaQueryListEvent) =>
        htmlClassProcess(event.matches);

    const setLightTheme = () => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .removeEventListener('change', themeCallback);
        localStorage.setItem(localStorageName, ThemeStateArray[0]);
        document.body.classList.remove(bodyClass);
    };
    const setDarkTheme = () => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .removeEventListener('change', themeCallback);
        localStorage.setItem(localStorageName, ThemeStateArray[1]);
        document.body.classList.add(bodyClass);
    };
    const setSystem = () => {
        localStorage.setItem(localStorageName, ThemeStateArray[2]);
        htmlClassProcess(
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', themeCallback);
    };

    return {
        setThemeState: (mode: ThemeState) => {
            if (mode === 'system') return setSystem();
            if (mode === 'light') return setLightTheme();
            if (mode === 'dark') return setDarkTheme();
        },
        getThemeState: () => {
            const theme = localStorage.getItem(localStorageName);
            if (!theme) return 'light';
            if (!ThemeStateArray.includes(theme as ThemeState)) return 'light';
            return theme as ThemeState;
        },
    };
}
