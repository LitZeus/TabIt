let groupToDelete = null;

// Function to show the modal with the specific group name
export function showModal(groupName) {
    const modal = document.getElementById("modal");
    const modalMessage = modal.querySelector(".modal-content p");
    modalMessage.textContent = `Are you sure you want to delete the group "${groupName}"?`; // Set the group name in the modal message
    modal.classList.remove("hidden");
}

// Function to close the modal

export function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}

// Function to confirm deletion of the group
export function confirmDelete() {
    if (groupToDelete) {
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            delete tabGroups[groupToDelete]; // Delete the group
            chrome.storage.local.set({ tabGroups }, loadGroups); // Reload groups
            closeModal(); // Close modal
        });
    }
}