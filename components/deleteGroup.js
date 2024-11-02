import { loadGroups } from "./loadGroups.js";

let groupToDelete = null;

export function triggerDelete(groupName) {
    groupToDelete = groupName;
    const deleteConfirmationOverlay = document.getElementById("deleteOverlay");
    const confirmButton = document.querySelector(".confirm-delete");

    // Update confirmation overlay for either single or all groups
    confirmButton.setAttribute("data-group-name", groupName || "all");
    document.querySelector(".delete-confirmation p").textContent =
        groupName ? `Are you sure you want to delete the group "${groupName}"?` : "Are you sure you want to delete all groups?";

    deleteConfirmationOverlay.classList.remove("hidden");
}

export function confirmDelete() {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};

        if (groupToDelete) {
            delete tabGroups[groupToDelete]; // Delete the selected group
        } else {
            // Clear all groups if `groupToDelete` is `null`
            Object.keys(tabGroups).forEach(group => delete tabGroups[group]);
        }

        chrome.storage.local.set({ tabGroups }, () => {
            loadGroups();
            hideOverlay();
            groupToDelete = null;
        });
    });
}

export function cancelDelete() {
    hideOverlay();
}

function hideOverlay() {
    document.getElementById("deleteOverlay").classList.add("hidden");
}
