import React from 'react';
import { Theme, PartialTheme } from '@fluentui/react';
/**
 * A theme with an associated name.
 */
declare type NamedTheme = {
    /** assigned name of theme */
    name: string;
    /** theme used for applying to components */
    theme: PartialTheme | Theme;
};
/**
 * Collection of NamedThemes
 */
declare type ThemeCollection = Record<string, NamedTheme>;
/**
 * Interface for React useContext hook containing the FluentTheme and a setter to switch themes
 */
interface SwitchableFluentThemeContext {
    /**
     * Currently chosen theme.
     * @defaultValue lightTheme
     */
    currentTheme: NamedTheme;
    /**
     * Whether to display components right-to-left
     * @defaultValue false
     */
    currentRtl: boolean;
    /**
     * Setter for the current theme.
     * If this the doesn't already exist in the theme context this will
     * add that theme to the store.
     */
    setCurrentTheme: (namedTheme: NamedTheme) => void;
    /**
     * Setter for the current rtl.
     */
    setCurrentRtl: (rtl: boolean) => void;
    /**
     * All stored themes within the context
     * @defaultValue defaultThemes
     */
    themeStore: ThemeCollection;
}
/**
 * React useContext for FluentTheme state of SwitchableFluentThemeProvider
 */
declare const SwitchableFluentThemeContext: React.Context<SwitchableFluentThemeContext>;
/**
 * Props for SwitchableFluentThemeProvider
 */
export interface SwitchableFluentThemeProviderProps {
    /** Children to be themed */
    children: React.ReactNode;
    /** Scope ID for context */
    scopeId: string;
    /**
     * Initial set of themes to switch between.
     * @defaultValue defaultThemes
     */
    themes?: ThemeCollection;
}
/**
 * @description Provider wrapped around FluentThemeProvider that stores themes in local storage
 * to be switched via useContext hook.
 * @param props - SwitchableFluentThemeProviderProps
 * @remarks This makes use of the browser's local storage if available
 */
export declare const SwitchableFluentThemeProvider: (props: SwitchableFluentThemeProviderProps) => JSX.Element;
/**
 * React hook for programmatically accessing the switchable fluent theme.
 */
export declare const useSwitchableFluentTheme: () => SwitchableFluentThemeContext;
export {};
//# sourceMappingURL=SwitchableFluentThemeProvider.d.ts.map