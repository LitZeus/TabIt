import { addAllTabs, addCurrentTab } from "./components/addTab.js";
import { closeModal, confirmDelete, showModal } from "./components/deleteGroup.js";
import { loadGroups } from "./components/loadGroups.js";
import { saveTabs } from "./components/saveTabs.js";
import { showCurrentTabs } from "./components/showTabs.js";

document.addEventListener("DOMContentLoaded", () => {
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addCurrentTabButton = document.getElementById("addCurrentTabButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const showTabsButton = document.getElementById("showTabsButton");
    const cancelDeleteButton = document.getElementById("cancelDelete");
    const confirmDeleteButton = document.getElementById("confirmDelete");
    const closeTabsPopupButton = document.getElementById("closeTabsPopup");

    // Load groups initially
    loadGroups();

    // Add event listeners for the buttons
    saveTabsButton.addEventListener("click", saveTabs);
    addCurrentTabButton.addEventListener("click", addCurrentTab);
    addAllTabsButton.addEventListener("click", addAllTabs);
    showTabsButton.addEventListener("click", showCurrentTabs);
    confirmDeleteButton.addEventListener("click", confirmDelete);
    cancelDeleteButton.addEventListener("click", closeModal);

    closeTabsPopupButton.addEventListener("click", () => {
        document.getElementById("tabsPopup").classList.add("hidden");
    });

    // Attach delete functionality to dynamically loaded groups
    document.getElementById("groupList").addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const groupName = e.target.getAttribute("data-group-name");
            showModal(groupName);
        }
    });
});
