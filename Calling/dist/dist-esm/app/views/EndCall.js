// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { DefaultButton, PrimaryButton, Stack, Link, Text } from '@fluentui/react';
import { Video20Filled } from '@fluentui/react-icons';
import { endCallContainerStyle, endCallTitleStyle, buttonStyle, buttonWithIconStyles, mainStackTokens, buttonsStackTokens, upperStackTokens, videoCameraIconStyle, bottomStackFooterStyle } from '../styles/EndCall.styles';
export const EndCall = (props) => {
    const leftCall = 'You left the call';
    const goHomePage = 'Go to homepage';
    const rejoinCall = 'Rejoin call';
    const feedbackLink = 'https://docs.microsoft.com/answers/search.html?c=&includeChildren=&f=&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user&redirect=search%2Fsearch&sort=relevance&q=azure-communication-services';
    return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: mainStackTokens, className: endCallContainerStyle },
        React.createElement(Stack, { tokens: upperStackTokens },
            React.createElement(Text, { role: 'heading', "aria-level": 1, className: endCallTitleStyle }, leftCall),
            React.createElement(Stack, { horizontal: true, wrap: true, tokens: buttonsStackTokens },
                React.createElement(PrimaryButton, { className: buttonStyle, styles: buttonWithIconStyles, text: rejoinCall, onClick: props.rejoinHandler, onRenderIcon: () => React.createElement(Video20Filled, { className: videoCameraIconStyle }) }),
                React.createElement(DefaultButton, { className: buttonStyle, styles: buttonWithIconStyles, text: goHomePage, onClick: props.homeHandler })),
            React.createElement("div", { className: bottomStackFooterStyle },
                React.createElement(Link, { href: feedbackLink }, "Give Feedback"),
                "\u00A0on this sample app at Microsoft Q&A"))));
};
//# sourceMappingURL=EndCall.js.map