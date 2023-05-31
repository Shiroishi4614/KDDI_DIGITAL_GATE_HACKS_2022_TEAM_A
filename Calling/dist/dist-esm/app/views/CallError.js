// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { DefaultButton, PrimaryButton, Stack, Text } from '@fluentui/react';
import { Video20Filled } from '@fluentui/react-icons';
import { endCallContainerStyle, endCallTitleStyle, buttonStyle, buttonWithIconStyles, mainStackTokens, buttonsStackTokens, upperStackTokens, videoCameraIconStyle, bottomStackFooterStyle } from '../styles/EndCall.styles';
export const CallError = (props) => {
    const goHomePage = 'Go to Homepage';
    const rejoinCall = 'Retry Call';
    return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: mainStackTokens, className: endCallContainerStyle },
        React.createElement(Stack, { tokens: upperStackTokens },
            React.createElement(Text, { role: 'heading', "aria-level": 1, className: endCallTitleStyle }, props.title),
            React.createElement(Stack, { horizontal: true, tokens: buttonsStackTokens },
                React.createElement(PrimaryButton, { className: buttonStyle, styles: buttonWithIconStyles, text: rejoinCall, onClick: props.rejoinHandler, onRenderIcon: () => React.createElement(Video20Filled, { className: videoCameraIconStyle, primaryFill: "currentColor" }) }),
                React.createElement(DefaultButton, { className: buttonStyle, styles: buttonWithIconStyles, text: goHomePage, onClick: props.homeHandler })),
            React.createElement("div", { className: bottomStackFooterStyle }, props.reason))));
};
//# sourceMappingURL=CallError.js.map