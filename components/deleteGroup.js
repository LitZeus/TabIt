import { loadGroups } from "./loadGroups.js";

export function triggerDelete(groupName) {
    const deleteConfirmation = document.getElementById(`confirmDelete-${groupName}`);
    
    if (deleteConfirmation) {
        deleteConfirmation.classList.remove("hidden"); // Show the inline delete confirmation
    }
}

// Function to confirm deletion of the group and remove it entirely
export function confirmDelete(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        delete tabGroups[groupName]; // Remove the entire group from storage
        chrome.storage.local.set({ tabGroups }, () => {
            loadGroups(); // Reload groups to refresh UI
        });
    });
}

// Function to cancel delete confirmation and hide the inline prompt
export function cancelDelete(groupName) {
    hideInlineConfirmation(groupName);
}

// Helper function to hide inline confirmation prompt
function hideInlineConfirmation(groupName) {
    const deleteConfirmation = document.getElementById(`confirmDelete-${groupName}`);
    if (deleteConfirmation) {
        deleteConfirmation.classList.add("hidden");
    }
}
