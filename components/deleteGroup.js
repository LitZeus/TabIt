let groupToDelete = null;

// Function to set the group to delete and trigger inline confirmation
export function triggerDelete(groupName) {
    groupToDelete = groupName;
    const deleteConfirmation = document.getElementById(`confirmDelete-${groupName}`);
    
    if (deleteConfirmation) {
        deleteConfirmation.classList.remove("hidden"); // Show the inline delete confirmation
    }
}

// Function to confirm deletion of the group
export function confirmDelete() {
    if (groupToDelete) {
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            delete tabGroups[groupToDelete]; // Delete the selected group
            chrome.storage.local.set({ tabGroups }, loadGroups); // Reload groups after deletion

            hideInlineConfirmation(groupToDelete); // Hide the inline confirmation
            groupToDelete = null; // Clear the variable
        });
    }
}

// Function to cancel the delete confirmation and hide inline prompt
export function cancelDelete() {
    hideInlineConfirmation(groupToDelete);
    groupToDelete = null;
}

// Helper function to hide inline confirmation
function hideInlineConfirmation(groupName) {
    const deleteConfirmation = document.getElementById(`confirmDelete-${groupName}`);
    if (deleteConfirmation) {
        deleteConfirmation.classList.add("hidden");
    }
}
