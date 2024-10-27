// src/services/TabManager.js
export default class TabManager {
    static saveCurrentTabs(callback) {
        chrome.tabs.query({}, (tabs) => {
            const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
            callback(tabInfo);
        });
    }
}
