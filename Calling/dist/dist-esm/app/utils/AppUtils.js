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
import { v1 as generateGUID } from 'uuid';
/**
 * Get ACS user token from the Contoso server.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTokenResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/token?scope=voip');
    if (response.ok) {
        const responseAsJson = yield response.json(); //(await response.json())?.value?.token;
        const token = responseAsJson.token;
        if (token) {
            return responseAsJson;
        }
    }
    throw 'Invalid token response';
});
/**
 * Generate a random user name.
 * @return username in the format user####
 */
export const createRandomDisplayName = () => 'user' + Math.ceil(Math.random() * 1000);
/**
 * Get group id from the url's query params.
 */
export const getGroupIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gid = urlParams.get('groupId');
    return gid ? { groupId: gid } : undefined;
};
export const createGroupId = () => ({ groupId: generateGUID() });
/**
 * Get teams meeting link from the url's query params.
 */
export const getTeamsLinkFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamsLink = urlParams.get('teamsLink');
    return teamsLink ? { meetingLink: teamsLink } : undefined;
};
/*
 * TODO:
 *  Remove this method once the SDK improves error handling for unsupported browser.
 */
export const isOnIphoneAndNotSafari = () => {
    const userAgent = navigator.userAgent;
    // Chrome uses 'CriOS' in user agent string and Firefox uses 'FxiOS' in user agent string.
    return userAgent.includes('iPhone') && (userAgent.includes('FxiOS') || userAgent.includes('CriOS'));
};
export const isMobileSession = () => !!window.navigator.userAgent.match(/(iPad|iPhone|iPod|Android|webOS|BlackBerry|Windows Phone)/g);
export const isSmallScreen = () => window.innerWidth < 700 || window.innerHeight < 400;
export const navigateToHomePage = () => {
    window.location.href = window.location.href.split('?')[0];
};
export const buildTime = __BUILDTIME__;
export const callingSDKVersion = __CALLINGVERSION__;
//# sourceMappingURL=AppUtils.js.map