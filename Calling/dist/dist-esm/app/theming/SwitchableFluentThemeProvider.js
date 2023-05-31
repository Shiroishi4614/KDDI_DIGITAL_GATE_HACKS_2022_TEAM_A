// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useState, useMemo, createContext, useContext } from 'react';
import { FluentThemeProvider, lightTheme, darkTheme } from '@azure/communication-react';
import { getThemeFromLocalStorage, saveThemeToLocalStorage } from '../utils/localStorage';
const defaultThemes = {
    Light: {
        name: 'Light',
        theme: lightTheme
    },
    Dark: {
        name: 'Dark',
        theme: darkTheme
    }
};
const defaultTheme = defaultThemes.Light;
/**
 * React useContext for FluentTheme state of SwitchableFluentThemeProvider
 */
const SwitchableFluentThemeContext = createContext({
    currentTheme: defaultTheme,
    currentRtl: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setCurrentTheme: (theme) => { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setCurrentRtl: (rtl) => { },
    themeStore: defaultThemes
});
/**
 * @description Provider wrapped around FluentThemeProvider that stores themes in local storage
 * to be switched via useContext hook.
 * @param props - SwitchableFluentThemeProviderProps
 * @remarks This makes use of the browser's local storage if available
 */
export const SwitchableFluentThemeProvider = (props) => {
    var _a, _b;
    const { children, scopeId } = props;
    const [themeStore, setThemeCollection] = useState((_a = props.themes) !== null && _a !== void 0 ? _a : defaultThemes);
    const themeFromStorage = getThemeFromLocalStorage(scopeId);
    const initialTheme = (_b = themeStore[themeFromStorage || defaultTheme.name]) !== null && _b !== void 0 ? _b : defaultTheme;
    const [currentTheme, _setCurrentTheme] = useState(initialTheme);
    const [currentRtl, _setCurrentRtl] = useState(false);
    const state = useMemo(() => ({
        currentTheme,
        setCurrentTheme: (namedTheme) => {
            _setCurrentTheme(namedTheme);
            // If this is a new theme, add to the theme store
            if (!themeStore[namedTheme.name]) {
                setThemeCollection(Object.assign(Object.assign({}, themeStore), { namedTheme }));
            }
            // Save current selection to local storage. Note the theme itself
            // is not saved to local storage, only the name.
            if (typeof Storage !== 'undefined') {
                saveThemeToLocalStorage(namedTheme.name, scopeId);
            }
        },
        currentRtl,
        setCurrentRtl: (rtl) => {
            _setCurrentRtl(rtl);
        },
        themeStore
    }), [currentTheme, currentRtl, scopeId, themeStore]);
    return (React.createElement(SwitchableFluentThemeContext.Provider, { value: state },
        React.createElement(FluentThemeProvider, { fluentTheme: currentTheme.theme, rtl: currentRtl }, children)));
};
/**
 * React hook for programmatically accessing the switchable fluent theme.
 */
export const useSwitchableFluentTheme = () => useContext(SwitchableFluentThemeContext);
//# sourceMappingURL=SwitchableFluentThemeProvider.js.map