// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Icon, PrimaryButton, Separator, Stack, TextField } from '@fluentui/react';
import { copyIconStyle, copyLinkButtonStyle, buttonWithIconStyles, footerMainTextStyle, paneFooterStyles, paneFooterTokens, textFieldStyles } from '../styles/Footer.styles';
import React from 'react';
const invitePeopleString = 'Invite people to join';
const copyJoinInfoString = 'Copy join info';
const copyJoinLink = () => {
    const inputElement = document.getElementById('inputText');
    inputElement.select();
    document.execCommand('copy');
};
export const Footer = () => {
    return (React.createElement(Stack, { styles: paneFooterStyles, tokens: paneFooterTokens },
        React.createElement(Separator, null),
        React.createElement("div", { className: footerMainTextStyle }, invitePeopleString),
        React.createElement(TextField, { styles: textFieldStyles, id: "inputText", type: "text", value: `${document.baseURI}` }),
        React.createElement(PrimaryButton, { className: copyLinkButtonStyle, styles: buttonWithIconStyles, text: copyJoinInfoString, onClick: copyJoinLink, onRenderIcon: () => React.createElement(Icon, { iconName: "Copy", className: copyIconStyle }) })));
};
//# sourceMappingURL=Footer.js.map