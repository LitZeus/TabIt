export function addCurrentTab() {
    const groupName = document.getElementById("groupName").value.trim();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        saveToGroup(groupName, tabs);
    });
}

export function addAllTabs() {
    const groupName = document.getElementById("groupName").value.trim();
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        saveToGroup(groupName, tabs);
    });
}

function saveToGroup(groupName, tabs) {
    const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        if (!tabGroups[groupName]) tabGroups[groupName] = [];
        tabGroups[groupName].push(...tabInfo);
        chrome.storage.local.set({ tabGroups });
    });
}
