import { loadGroups } from "./loadGroups.js";

export function saveCurrentTab() {
    const groupName = document.getElementById("groupName").value.trim() || assignDefaultGroupName();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const [currentTab] = tabs;
        if (!currentTab) {
            console.error("No current tab found.");
            return;
        }

        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            tabGroups[groupName] = tabGroups[groupName] || [];
            tabGroups[groupName].push({ title: currentTab.title, url: currentTab.url });

            chrome.storage.local.set({ tabGroups }, () => {
                console.log(`Tab saved to group: ${groupName}`);
                loadGroups();
            });
        });
    });
}

export function saveAllTabs() {
    const groupName = document.getElementById("groupName").value.trim() || assignDefaultGroupName();
    chrome.tabs.query({}, (tabs) => {
        const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));

        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            tabGroups[groupName] = tabInfo;

            chrome.storage.local.set({ tabGroups }, () => {
                console.log(`All tabs saved to group: ${groupName}`);
                loadGroups();
            });
        });
    });
}

function assignDefaultGroupName() {
    const defaultName = `Group-${Date.now()}`;
    document.getElementById("groupName").value = defaultName;
    return defaultName;
}
