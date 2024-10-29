export function saveTabs() {
    const groupName = document.getElementById("groupName").value.trim() || assignDefaultGroupName();
    console.log(`Saving current tab to group: ${groupName}`);

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
                console.log(`Tab saved to group ${groupName}`);
                loadGroups();
            });
        });
    });
}

export function addAllTabs() {
    const groupName = document.getElementById("groupName").value.trim() || assignDefaultGroupName();
    console.log(`Saving all tabs to group: ${groupName}`);

    chrome.tabs.query({}, (tabs) => {
        const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));

        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            tabGroups[groupName] = tabInfo;

            chrome.storage.local.set({ tabGroups }, () => {
                console.log(`All tabs saved to group ${groupName}`);
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
