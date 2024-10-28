export function deleteGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        delete tabGroups[groupName];
        chrome.storage.local.set({ tabGroups });
    });
}
