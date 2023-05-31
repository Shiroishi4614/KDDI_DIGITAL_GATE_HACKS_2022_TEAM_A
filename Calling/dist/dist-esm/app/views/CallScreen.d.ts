/// <reference types="react" />
import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import "./style_a.css";
export interface CallScreenProps {
    token: string;
    userId: CommunicationUserIdentifier;
    callLocator: GroupCallLocator | TeamsMeetingLinkLocator;
    displayName: string;
    webAppTitle: string;
    onCallEnded: () => void;
}
export declare const CallScreen: (props: CallScreenProps) => JSX.Element;
//# sourceMappingURL=CallScreen.d.ts.map