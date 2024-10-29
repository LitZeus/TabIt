import { deleteGroup, openGroup, showTabsInGroup } from "./components/groupActions.js";
import { loadGroups } from "./components/loadGroups.js";
import { addAllTabs, saveTabs } from "./components/saveTabs.js";

document.addEventListener("DOMContentLoaded", () => {
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const closeTabsPopupButton = document.getElementById("closeTabsPopup");

    // Load groups when the DOM content is loaded
    loadGroups();

    // Add event listeners for the main action buttons
    saveTabsButton.addEventListener("click", () => {
        console.log("Save Current Tab button clicked");
        saveTabs();
    });

    addAllTabsButton.addEventListener("click", () => {
        console.log("Add All Tabs to Group button clicked");
        addAllTabs();
    });

    closeTabsPopupButton.addEventListener("click", () => {
        console.log("Closing tabs popup");
        document.getElementById("tabsPopup").classList.add("hidden");
    });

    // Delegate click events for group actions within the group list
    document.getElementById("groupList").addEventListener("click", (e) => {
        const groupName = e.target.getAttribute("data-group-name");

        if (e.target.classList.contains("open-group")) {
            console.log(`Opening group: ${groupName}`);
            openGroup(groupName);
        } else if (e.target.classList.contains("delete-group")) {
            console.log(`Deleting group: ${groupName}`);
            deleteGroup(groupName);
        } else if (e.target.classList.contains("show-tabs")) {
            console.log(`Showing tabs for group: ${groupName}`);
            showTabsInGroup(groupName);
        }
    });
});
