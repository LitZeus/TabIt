export function openGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabs = result.tabGroups[groupName] || [];
        tabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
    });
}

export function deleteGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        delete tabGroups[groupName];
        chrome.storage.local.set({ tabGroups });
    });
}

export function showTabsInGroup(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabs = result.tabGroups[groupName] || [];
        const tabsPopup = document.getElementById("tabsPopup");
        const tabsContent = tabsPopup.querySelector(".tabs-content");

        tabsContent.innerHTML = tabs.length
            ? tabs.map(tab => `<p>${tab.title}</p>`).join('')
            : "<p>No tabs found.</p>";

        tabsPopup.classList.remove("hidden");
    });
}
