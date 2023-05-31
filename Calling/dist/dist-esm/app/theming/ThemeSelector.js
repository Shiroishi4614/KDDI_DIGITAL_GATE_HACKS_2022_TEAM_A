// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { ChoiceGroup, concatStyleSets } from '@fluentui/react';
import { useSwitchableFluentTheme } from '../theming/SwitchableFluentThemeProvider';
/**
 * @description ChoiceGroup component for selecting the fluent theme context for SwitchableFluentThemeProvider
 * @param props - ThemeSelectorProps
 * @remarks - this must be a child of a SwitchableFluentThemeProvider
 */
export const ThemeSelector = (props) => {
    const { label, horizontal } = props;
    const { currentTheme, setCurrentTheme, themeStore } = useSwitchableFluentTheme();
    const onChange = (ev, option) => {
        if (option) {
            const themeName = option.key.toString();
            const theme = themeStore[themeName];
            setCurrentTheme(theme);
        }
    };
    return (React.createElement(ChoiceGroup, { label: label, options: Object.keys(themeStore).map((theme) => ({
            key: theme,
            text: theme,
            styles: concatStyleSets({ root: { marginTop: '0' } }, horizontal ? { choiceFieldWrapper: { marginRight: '1rem' } } : undefined)
        })), onChange: onChange, selectedKey: currentTheme.name, styles: concatStyleSets({ label: { padding: '0' } }, horizontal ? { flexContainer: { display: 'flex' } } : undefined) }));
};
//# sourceMappingURL=ThemeSelector.js.map