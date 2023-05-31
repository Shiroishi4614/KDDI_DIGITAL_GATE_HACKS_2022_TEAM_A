// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeIcons, Spinner } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { buildTime, callingSDKVersion, createGroupId, fetchTokenResponse, getGroupIdFromUrl, getTeamsLinkFromUrl, isMobileSession, isOnIphoneAndNotSafari, isSmallScreen, navigateToHomePage } from './utils/AppUtils';
import { CallError } from './views/CallError';
import { CallScreen } from './views/CallScreen';
import { EndCall } from './views/EndCall';
import { HomeScreen } from './views/HomeScreen';
import { UnsupportedBrowserPage } from './views/UnsupportedBrowserPage';
console.log(`ACS sample calling app. Last Updated ${buildTime} Using @azure/communication-calling:${callingSDKVersion}`);
initializeIcons();
const webAppTitle = document.title;
const App = () => {
    const [page, setPage] = useState('home');
    // User credentials to join a call with - these are retrieved from the server
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [userCredentialFetchError, setUserCredentialFetchError] = useState(false);
    // Call details to join a call - these are collected from the user on the home screen
    const [callLocator, setCallLocator] = useState(createGroupId());
    const [displayName, setDisplayName] = useState('');
    // Get Azure Communications Service token from the server
    useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { token, user } = yield fetchTokenResponse();
                setToken(token);
                setUserId(user);
            }
            catch (e) {
                console.error(e);
                setUserCredentialFetchError(true);
            }
        }))();
    }, []);
    const supportedBrowser = !isOnIphoneAndNotSafari();
    if (!supportedBrowser) {
        return React.createElement(UnsupportedBrowserPage, null);
    }
    if (isMobileSession() || isSmallScreen()) {
        console.log('ACS Calling sample: This is experimental behaviour');
    }
    switch (page) {
        case 'home': {
            document.title = `home - ${webAppTitle}`;
            // Show a simplified join home screen if joining an existing call
            const joiningExistingCall = !!getGroupIdFromUrl() || !!getTeamsLinkFromUrl();
            return (React.createElement(HomeScreen, { joiningExistingCall: joiningExistingCall, startCallHandler: (callDetails) => {
                    setDisplayName(callDetails.displayName);
                    const isTeamsCall = !!callDetails.teamsLink;
                    const callLocator = callDetails.teamsLink || getTeamsLinkFromUrl() || getGroupIdFromUrl() || createGroupId();
                    setCallLocator(callLocator);
                    // Update window URL to have a joinable link
                    if (!joiningExistingCall) {
                        const joinParam = isTeamsCall
                            ? '?teamsLink=' + encodeURIComponent(callLocator.meetingLink)
                            : '?groupId=' + callLocator.groupId;
                        window.history.pushState({}, document.title, window.location.origin + joinParam);
                    }
                    setPage('call');
                } }));
        }
        case 'endCall': {
            document.title = `end call - ${webAppTitle}`;
            return React.createElement(EndCall, { rejoinHandler: () => setPage('call'), homeHandler: navigateToHomePage });
        }
        case 'call': {
            if (userCredentialFetchError) {
                document.title = `error - ${webAppTitle}`;
                return (React.createElement(CallError, { title: "Error getting user credentials from server", reason: "Ensure the sample server is running.", rejoinHandler: () => setPage('call'), homeHandler: navigateToHomePage }));
            }
            if (!token || !userId || !displayName || !callLocator) {
                document.title = `credentials - ${webAppTitle}`;
                return React.createElement(Spinner, { label: 'Getting user credentials from server', ariaLive: "assertive", labelPosition: "top" });
            }
            return (React.createElement(CallScreen, { token: token, userId: userId, displayName: displayName, callLocator: callLocator, onCallEnded: () => setPage('endCall'), webAppTitle: webAppTitle }));
        }
        default:
            document.title = `error - ${webAppTitle}`;
            return React.createElement(React.Fragment, null, "Invalid page");
    }
};
export default App;
//# sourceMappingURL=App.js.map