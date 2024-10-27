// src/services/StorageManager.js
export default class StorageManager {
    static getTabGroups(callback) {
        chrome.storage.local.get(["tabGroups"], (result) => callback(result.tabGroups || {}));
    }

    static updateTabGroups(groupName, tabInfo) {
        this.getTabGroups((tabGroups) => {
            tabGroups[groupName] = tabInfo;
            chrome.storage.local.set({ tabGroups });
        });
    }

    static deleteGroup(groupName, callback) {
        this.getTabGroups((tabGroups) => {
            delete tabGroups[groupName];
            chrome.storage.local.set({ tabGroups }, callback);
        });
    }
}
