import { addAllTabs, addCurrentTab } from "./components/addTab.js";
import { deleteGroup } from "./components/deleteGroup.js";
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

    const modal = document.getElementById("modal");
    let groupToDelete = null;

    modal.classList.add("hidden");

    loadGroups().then(setDeleteListeners);

    saveTabsButton.addEventListener("click", saveTabs);
    addCurrentTabButton.addEventListener("click", addCurrentTab);
    addAllTabsButton.addEventListener("click", addAllTabs);
    showTabsButton.addEventListener("click", showCurrentTabs);

    confirmDeleteButton.addEventListener("click", () => {
        if (groupToDelete) {
            deleteGroup(groupToDelete);
            modal.classList.add("hidden");
            loadGroups().then(setDeleteListeners);
        }
    });

    cancelDeleteButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        groupToDelete = null;
    });

    closeTabsPopupButton.addEventListener("click", () => {
        document.getElementById("tabsPopup").classList.add("hidden");
    });

    function setDeleteListeners() {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                groupToDelete = event.target.dataset.groupName;
                modal.classList.remove("hidden");
            });
        });
    }
});
