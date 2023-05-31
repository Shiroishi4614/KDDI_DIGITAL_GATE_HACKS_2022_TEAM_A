// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { SwitchableFluentThemeProvider } from './app/theming/SwitchableFluentThemeProvider';
ReactDOM.render(React.createElement(SwitchableFluentThemeProvider, { scopeId: "SampleCallingApp" },
    React.createElement("div", { className: "wrapper" },
        React.createElement(App, null))), document.getElementById('root'));
//# sourceMappingURL=index.js.map