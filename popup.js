import { addAllTabs, addCurrentTab } from "./components/addTab.js";
import { closeModal, confirmDelete } from "./components/deleteGroup.js";
import { loadGroups } from "./components/loadGroups.js";
import { saveTabs } from "./components/saveTabs.js";
import { showCurrentTabs } from "./components/showTabs.js";

document.addEventListener("DOMContentLoaded", () => {
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addCurrentTabButton = document.getElementById("addCurrentTabButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const showTabsButton = document.getElementById("showTabsButton");
    const confirmDeleteButton = document.getElementById("confirmDelete");
    const cancelDeleteButton = document.getElementById("cancelDelete");
    const closeTabsPopupButton = document.getElementById("closeTabsPopup");

    // Ensure modal is hidden on load
    document.getElementById("modal").classList.add("hidden");

    loadGroups();

    saveTabsButton.addEventListener("click", saveTabs);
    addCurrentTabButton.addEventListener("click", addCurrentTab);
    addAllTabsButton.addEventListener("click", addAllTabs);
    showTabsButton.addEventListener("click", showCurrentTabs);
    confirmDeleteButton.addEventListener("click", confirmDelete);
    cancelDeleteButton.addEventListener("click", closeModal);
    closeTabsPopupButton.addEventListener("click", () => {
        document.getElementById("tabsPopup").classList.add("hidden");
    });
});
