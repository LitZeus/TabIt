import ErrorMessage from "./components/ErrorMessage.js";
import GroupList from "./components/GroupList.js";
import GroupNameInput from "./components/GroupNameInput.js";
import Modal from "./components/Modal.js";
import TabsPopup from "./components/TabsPopup.js";
import StorageManager from "./services/StorageManager.js";
import TabManager from "./services/TabManager.js";
import assignDefaultGroupName from "./utils/assignDefaultGroupName.js";

document.addEventListener("DOMContentLoaded", () => {
    const groupNameInput = new GroupNameInput("groupNameContainer");
    const errorMessage = new ErrorMessage("groupNameContainer");
    const groupList = new GroupList("groupList", openGroupTabs, showModal);
    const tabsPopup = new TabsPopup("tabsPopup", "closeTabsPopup");
    const modal = new Modal("modal", "confirmDelete", "cancelDelete");

    function loadGroups() {
        StorageManager.getTabGroups((tabGroups) => {
            groupList.renderGroups(tabGroups);
        });
    }

    function saveTabs() {
        let groupName = groupNameInput.getGroupName();
        if (!groupName) {
            groupName = assignDefaultGroupName(tabGroups);
            groupNameInput.setDefaultGroupName(groupName);
        }
        TabManager.saveCurrentTabs((tabInfo) => {
            StorageManager.updateTabGroups(groupName, tabInfo);
            groupNameInput.clearInput();
            loadGroups();
        });
    }

    loadGroups();
});
