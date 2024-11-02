import { cancelDelete, confirmDelete, triggerDelete } from "./components/deleteGroup.js";
import { openGroup, showTabsInGroup } from "./components/groupActions.js";
import { loadGroups } from "./components/loadGroups.js";
import { saveAllTabs, saveCurrentTab } from "./components/saveTabs.js";

document.addEventListener("DOMContentLoaded", () => {
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const closeTabsPopupButton = document.getElementById("closeTabsPopup");
    const clearAllButton = document.getElementById("clearAllButton"); // Reference to the clear all button

    // Load saved groups when the popup is opened
    loadGroups();

    saveTabsButton.addEventListener("click", saveCurrentTab);
    addAllTabsButton.addEventListener("click", saveAllTabs);

    closeTabsPopupButton.addEventListener("click", () => {
        document.getElementById("tabsPopup").classList.add("hidden");
    });

    document.getElementById("groupList").addEventListener("click", (e) => {
        const groupName = e.target.getAttribute("data-group-name");

        if (e.target.classList.contains("open-group")) {
            openGroup(groupName);
        } else if (e.target.classList.contains("delete-group")) {
            triggerDelete(groupName);
        } else if (e.target.classList.contains("show-tabs")) {
            showTabsInGroup(groupName);
        }
    });

    // Confirm delete action
    document.querySelector(".confirm-delete").addEventListener("click", () => {
        const groupName = document.querySelector(".confirm-delete").getAttribute("data-group-name");
        confirmDelete(groupName);
    });

    // Cancel delete action
    document.querySelector(".cancel-delete").addEventListener("click", cancelDelete);

    // Clear all groups when the "Clear All" button is clicked
    clearAllButton.addEventListener("click", (e) => {
        e.preventDefault();
        triggerDelete(null); // Passing null to indicate all groups
    });
});
