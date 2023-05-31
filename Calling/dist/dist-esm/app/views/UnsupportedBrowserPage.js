// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Link } from '@fluentui/react';
import React from 'react';
export const UnsupportedBrowserPage = () => {
    window.document.title = 'Unsupported browser';
    return (React.createElement(React.Fragment, null,
        React.createElement(Link, { href: "https://docs.microsoft.com/azure/communication-services/concepts/voice-video-calling/calling-sdk-features#calling-client-library-browser-support" }, "Learn more"),
        "\u00A0about browsers and platforms supported by the web calling sdk"));
};
//# sourceMappingURL=UnsupportedBrowserPage.js.map