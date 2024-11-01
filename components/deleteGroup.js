import { loadGroups } from "./loadGroups.js";

let groupToDelete = null;
let isClearAll = false; // New variable to handle "Clear All"

// Function to set the group to delete and show the overlay
export function triggerDelete(groupName, clearAll = false) {
    groupToDelete = groupName;
    isClearAll = clearAll; // Set isClearAll based on the action
    const deleteConfirmationOverlay = document.getElementById("deleteOverlay");
    const confirmButton = document.querySelector(".confirm-delete");
    
    confirmButton.setAttribute("data-group-name", groupName); // Set group name for confirmation
    deleteConfirmationOverlay.classList.remove("hidden"); // Show the overlay
}

// Function to confirm deletion of the group and remove it entirely
export function confirmDelete() {
    if (isClearAll) {
        // Clear all groups if isClearAll is true
        chrome.storage.local.set({ tabGroups: {} }, () => {
            loadGroups(); // Reload groups to refresh UI
            hideOverlay(); // Hide the overlay after deletion
            groupToDelete = null;
            isClearAll = false; // Reset the variable
        });
    } else if (groupToDelete) {
        // Delete a single group
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            delete tabGroups[groupToDelete]; // Remove the specific group from storage
            chrome.storage.local.set({ tabGroups }, () => {
                loadGroups(); // Reload groups to refresh UI
                hideOverlay(); // Hide the overlay after deletion
                groupToDelete = null; // Clear the groupToDelete variable
            });
        });
    }
}

// Function to cancel delete confirmation and hide the overlay
export function cancelDelete() {
    hideOverlay();
    isClearAll = false; // Reset the variable on cancel
}

// Helper function to hide the overlay
function hideOverlay() {
    const deleteConfirmationOverlay = document.getElementById("deleteOverlay");
    deleteConfirmationOverlay.classList.add("hidden");
}
