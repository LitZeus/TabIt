let groupToDelete = null;

// Function to show the modal with the specific group name
export function showModal(groupName) {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.classList.remove("hidden"); // Show modal
        groupToDelete = groupName; // Set the group to delete
    }
}

// Function to close the modal
export function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.classList.add("hidden"); // Hide modal
        groupToDelete = null; // Clear the group to delete
    }
}

// Function to confirm deletion of the group
export function confirmDelete() {
    if (groupToDelete) {
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            delete tabGroups[groupToDelete]; // Delete the group
            chrome.storage.local.set({ tabGroups }, () => {
                loadGroups(); // Reload groups after deletion
                closeModal(); // Hide modal
            });
        });
    }
}
