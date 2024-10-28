export function saveTabs() {
    const groupName = document.getElementById("groupName").value.trim() || assignDefaultGroupName();
    chrome.tabs.query({}, (tabs) => {
        const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            tabGroups[groupName] = tabInfo;
            chrome.storage.local.set({ tabGroups }, loadGroups);
        });
    });
}

function assignDefaultGroupName() {
    const defaultName = `Group-${Date.now()}`;
    document.getElementById("groupName").value = defaultName;
    return defaultName;
}
