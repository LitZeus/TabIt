// src/background.js

// Event listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("TabIt extension installed successfully.");
    initializeStorage();
});

// Initialize default storage if no tab groups exist
function initializeStorage() {
    chrome.storage.local.get("tabGroups", (result) => {
        if (!result.tabGroups) {
            chrome.storage.local.set({ tabGroups: {} }, () => {
                console.log("Initialized tabGroups storage.");
            });
        }
    });
}
