/// <reference types="react" />
import { TeamsMeetingLinkLocator } from '@azure/communication-calling';
export interface HomeScreenProps {
    startCallHandler(callDetails: {
        displayName: string;
        teamsLink?: TeamsMeetingLinkLocator;
    }): void;
    joiningExistingCall: boolean;
}
export declare const HomeScreen: (props: HomeScreenProps) => JSX.Element;
//# sourceMappingURL=HomeScreen.d.ts.map