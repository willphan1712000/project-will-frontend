export const ThemeStateArray = ['light', 'dark', 'system'] as const;
export type ThemeState = (typeof ThemeStateArray)[number];

export interface UseThemeState {
    setThemeState: (mode: ThemeState) => void;
    getThemeState: () => ThemeState;
}

export const config = {
    localStorageName: 'will-theme',
    bodyClass: 'will-dark',
};
