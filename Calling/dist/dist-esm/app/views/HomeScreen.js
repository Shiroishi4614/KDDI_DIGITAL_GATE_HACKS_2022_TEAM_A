// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useState } from 'react';
import { Stack, PrimaryButton, Image, ChoiceGroup, Text, TextField } from '@fluentui/react';
import heroSVG from '../../assets/hero.svg';
import { imgStyle, infoContainerStyle, callContainerStackTokens, callOptionsGroupStyles, configContainerStyle, configContainerStackTokens, containerStyle, containerTokens, headerStyle, teamsItemStyle, buttonStyle } from '../styles/HomeScreen.styles';
import { ThemeSelector } from '../theming/ThemeSelector';
import { localStorageAvailable } from '../utils/localStorage';
import { getDisplayNameFromLocalStorage, saveDisplayNameToLocalStorage } from '../utils/localStorage';
import { DisplayNameField } from './DisplayNameField';
//追加音声
import useSound from 'use-sound';
export const HomeScreen = (props) => {
    const imageProps = { src: heroSVG.toString() };
    const headerTitle = props.joiningExistingCall ? 'Join Call' : 'Start or join a call';
    const callOptionsGroupLabel = 'Select a call option';
    const buttonText = 'Next';
    const buttonText2 = 'Image';
    const buttonText3 = 'Sound';
    const callOptions = [
        { key: 'ACSCall', text: 'Start a call' },
        { key: 'TeamsMeeting', text: 'Join a Teams meeting' }
    ];
    // Get display name from local storage if available
    const defaultDisplayName = localStorageAvailable ? getDisplayNameFromLocalStorage() : null;
    const [displayName, setDisplayName] = useState(defaultDisplayName !== null && defaultDisplayName !== void 0 ? defaultDisplayName : undefined);
    const [chosenCallOption, setChosenCallOption] = useState(callOptions[0]);
    const [teamsLink, setTeamsLink] = useState();
    const teamsCallChosen = chosenCallOption.key === 'TeamsMeeting';
    const buttonEnabled = displayName && (!teamsCallChosen || teamsLink);
    //追加 flag
    const [flag, setflag] = useState(0);
    function FlagReset() {
        setflag(0);
    }
    //追加 画像
    const imageProps2 = {
        src: 'images/onepiece01_luffy.png',
        // Show a border around the image (just for demonstration purposes)
        styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
    };
    //追加 音声
    const [play] = useSound("sounds/夜に聞こえる鈴虫さんの鳴き声.mp3");
    return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: containerTokens, className: containerStyle },
        React.createElement(Image, Object.assign({ alt: "Welcome to the ACS Calling sample app", className: imgStyle }, imageProps)),
        React.createElement(Stack, { className: infoContainerStyle },
            React.createElement(Text, { role: 'heading', "aria-level": 1, className: headerStyle }, headerTitle),
            React.createElement(Stack, { className: configContainerStyle, tokens: configContainerStackTokens },
                React.createElement(Stack, { tokens: callContainerStackTokens },
                    !props.joiningExistingCall && (React.createElement(ChoiceGroup, { styles: callOptionsGroupStyles, label: callOptionsGroupLabel, defaultSelectedKey: "ACSCall", options: callOptions, required: true, onChange: (_, option) => option && setChosenCallOption(option) })),
                    teamsCallChosen && (React.createElement(TextField, { className: teamsItemStyle, iconProps: { iconName: 'Link' }, placeholder: 'Enter a Teams meeting link', onChange: (_, newValue) => newValue && setTeamsLink({ meetingLink: newValue }) }))),
                React.createElement(DisplayNameField, { defaultName: displayName, setName: setDisplayName }),
                React.createElement(PrimaryButton, { disabled: !buttonEnabled, className: buttonStyle, text: buttonText, onClick: () => {
                        if (displayName) {
                            saveDisplayNameToLocalStorage(displayName);
                            props.startCallHandler({ displayName, teamsLink });
                        }
                    } }),
                React.createElement(PrimaryButton, { disabled: !buttonEnabled, className: buttonStyle, text: buttonText2, onClick: () => {
                        setflag(1);
                        window.setTimeout(FlagReset, 2000);
                    } }),
                flag && React.createElement(Image, Object.assign({}, imageProps2, { alt: "Example with no image fit value and only width is specified." })),
                React.createElement(PrimaryButton, { disabled: !buttonEnabled, className: buttonStyle, text: buttonText3, onClick: () => {
                        play();
                    } }),
                React.createElement("div", null,
                    React.createElement(ThemeSelector, { label: "Theme", horizontal: true }))))));
};
//# sourceMappingURL=HomeScreen.js.map