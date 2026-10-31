// Appearance settings, kept in this browser
const KEY = 'ui-settings';
const defaults = { collapsedSidebar: false };

export const readUiSettings = () => {
    try {
        return { ...defaults, ...JSON.parse(localStorage.getItem(KEY)) };
    } catch {
        return defaults;
    }
};

export const saveUiSettings = (change) => {
    const next = { ...readUiSettings(), ...change };
    try {
        localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
        // storage blocked: nothing to remember
    }
    return next;
};
