import { deleteGroup, openGroup, showTabsInGroup } from "./components/groupActions.js";
import { loadGroups } from "./components/loadGroups.js";
import { saveAllTabs, saveCurrentTab } from "./components/saveTabs.js";

document.addEventListener("DOMContentLoaded", () => {
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const closeTabsPopupButton = document.getElementById("closeTabsPopup");

    loadGroups();

    // Button actions
    saveTabsButton.addEventListener("click", () => {
        console.log("Adding current tab to group.");
        saveCurrentTab();
    });

    addAllTabsButton.addEventListener("click", () => {
        console.log("Adding all tabs to group.");
        saveAllTabs();
    });

    closeTabsPopupButton.addEventListener("click", () => {
        document.getElementById("tabsPopup").classList.add("hidden");
    });

    // Group actions
    document.getElementById("groupList").addEventListener("click", (e) => {
        const groupName = e.target.getAttribute("data-group-name");

        if (e.target.classList.contains("open-group")) {
            openGroup(groupName);
        } else if (e.target.classList.contains("delete-group")) {
            deleteGroup(groupName);
        } else if (e.target.classList.contains("show-tabs")) {
            showTabsInGroup(groupName);
        }
    });
});
