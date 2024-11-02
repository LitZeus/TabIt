import { loadGroups } from "./loadGroups.js";

let groupToDelete = null;

export function triggerDelete(groupName) {
    groupToDelete = groupName;
    const deleteConfirmationOverlay = document.getElementById("deleteOverlay");
    const confirmButton = document.querySelector(".confirm-delete");

    confirmButton.setAttribute("data-group-name", groupName);
    deleteConfirmationOverlay.classList.remove("hidden");
}

export function confirmDelete() {
    if (groupToDelete) {
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            delete tabGroups[groupToDelete];
            chrome.storage.local.set({ tabGroups }, () => {
                loadGroups();
                hideOverlay();
                groupToDelete = null;
            });
        });
    }
}

export function cancelDelete() {
    hideOverlay();
}

function hideOverlay() {
    const deleteConfirmationOverlay = document.getElementById("deleteOverlay");
    deleteConfirmationOverlay.classList.add("hidden");
}
