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
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
const postRefreshTokenParameters = {
    method: 'POST'
};
/**
 * Create credentials that auto-refresh asynchronously.
 */
export const createAutoRefreshingCredential = (userId, token) => {
    const options = {
        token: token,
        tokenRefresher: refreshTokenAsync(userId),
        refreshProactively: true
    };
    return new AzureCommunicationTokenCredential(options);
};
const refreshTokenAsync = (userIdentity) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(`/refreshToken/${userIdentity}`, postRefreshTokenParameters);
        if (response.ok) {
            return (yield response.json()).token;
        }
        else {
            throw new Error('could not refresh token');
        }
    });
};
//# sourceMappingURL=credential.js.map