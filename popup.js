import { cancelDelete, confirmDelete, triggerDelete } from "./components/deleteGroup.js";
import { openGroup, showTabsInGroup } from "./components/groupActions.js";
import { loadGroups } from "./components/loadGroups.js";
import { saveAllTabs, saveCurrentTab } from "./components/saveTabs.js";

document.addEventListener("DOMContentLoaded", () => {
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const closeTabsPopupButton = document.getElementById("closeTabsPopup");

    // Load saved groups when the popup is opened
    loadGroups();

    // Event listener for saving the current tab to the group
    saveTabsButton.addEventListener("click", saveCurrentTab);

    // Event listener for saving all tabs in the current window to the group
    addAllTabsButton.addEventListener("click", saveAllTabs);

    // Event listener for closing the tabs popup
    closeTabsPopupButton.addEventListener("click", () => {
        document.getElementById("tabsPopup").classList.add("hidden");
    });

    // Event delegation for handling group-specific actions
    document.getElementById("groupList").addEventListener("click", (e) => {
        const groupName = e.target.getAttribute("data-group-name");

        if (e.target.classList.contains("open-group")) {
            openGroup(groupName);
        } else if (e.target.classList.contains("delete-group")) {
            triggerDelete(groupName); // Trigger delete action
        } else if (e.target.classList.contains("show-tabs")) {
            showTabsInGroup(groupName);
        }
    });

    // Confirm delete action
    document.querySelector(".confirm-delete").addEventListener("click", () => {
        const groupName = document.querySelector(".confirm-delete").getAttribute("data-group-name");
        confirmDelete(groupName); // Confirm delete action
    });

    // Cancel delete action
    document.querySelector(".cancel-delete").addEventListener("click", () => {
        cancelDelete(); // Hide the confirmation overlay
    });
});
