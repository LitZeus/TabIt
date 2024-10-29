export function openGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabs = result.tabGroups[groupName] || [];
        tabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
        console.log(`Opened group: ${groupName}`);
    });
}

export function deleteGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        delete tabGroups[groupName];
        chrome.storage.local.set({ tabGroups }, loadGroups);
        console.log(`Deleted group: ${groupName}`);
    });
}

export function showTabsInGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabs = result.tabGroups[groupName] || [];
        const tabsPopup = document.getElementById("tabsPopup");
        const tabsContent = tabsPopup.querySelector(".tabs-content");

        tabsContent.innerHTML = tabs.length ? tabs.map(tab => `<p>${tab.title}</p>`).join('') : "No tabs found.";
        tabsPopup.classList.remove("hidden");
        console.log(`Displayed tabs for group: ${groupName}`);
    });
}
