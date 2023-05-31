/// <reference types="react" />
/**
 * Props for ThemeSelector component
 */
export interface ThemeSelectorProps {
    /** Optional label for selector component */
    label?: string;
    /** Optional boolean to arrange choices horizontally */
    horizontal?: boolean;
}
/**
 * @description ChoiceGroup component for selecting the fluent theme context for SwitchableFluentThemeProvider
 * @param props - ThemeSelectorProps
 * @remarks - this must be a child of a SwitchableFluentThemeProvider
 */
export declare const ThemeSelector: (props: ThemeSelectorProps) => JSX.Element;
//# sourceMappingURL=ThemeSelector.d.ts.map