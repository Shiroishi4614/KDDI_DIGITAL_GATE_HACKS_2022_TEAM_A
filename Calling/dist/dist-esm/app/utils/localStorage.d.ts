export declare const localStorageAvailable: boolean;
export declare enum LocalStorageKeys {
    DisplayName = "DisplayName",
    Theme = "AzureCommunicationUI_Theme"
}
/**
 * Get display name from local storage.
 */
export declare const getDisplayNameFromLocalStorage: () => string | null;
/**
 * Save display name into local storage.
 */
export declare const saveDisplayNameToLocalStorage: (displayName: string) => void;
/**
 * Get theme from local storage.
 */
export declare const getThemeFromLocalStorage: (scopeId: string) => string | null;
/**
 * Save theme into local storage.
 */
export declare const saveThemeToLocalStorage: (theme: string, scopeId: string) => void;
//# sourceMappingURL=localStorage.d.ts.map