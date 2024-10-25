document.addEventListener("DOMContentLoaded", () => {
    const groupNameContainer = document.getElementById("groupNameContainer");
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = "Please enter a name for the group.";
    
    // Check if the groupNameContainer exists and append the error message above the input field if necessary
    if (groupNameContainer) {
        groupNameContainer.appendChild(errorMessage); 
        errorMessage.style.display = "none"; // Hide initially
    } else {
        console.error('Element with ID "groupNameContainer" not found.');
    }

    const groupList = document.getElementById("groupList");
    const saveTabsButton = document.getElementById("saveTabsButton");
    const addCurrentTabButton = document.getElementById("addCurrentTabButton");
    const addAllTabsButton = document.getElementById("addAllTabsButton");
    const showTabsButton = document.getElementById("showTabsButton");
    const modal = document.getElementById("modal");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");
    const tabsPopup = document.getElementById("tabsPopup");
    const closeTabsPopup = document.getElementById("closeTabsPopup");
    let groupToDelete = null;
  
    loadGroups();
  
    // Event Listeners
    saveTabsButton.addEventListener("click", saveTabs);
    addCurrentTabButton.addEventListener("click", addCurrentTab);
    addAllTabsButton.addEventListener("click", addAllTabs);
    showTabsButton.addEventListener("click", showCurrentTabs);
    confirmDelete.addEventListener("click", deleteGroup);
    cancelDelete.addEventListener("click", () => closeModal());
    closeTabsPopup.addEventListener("click", () => tabsPopup.classList.add("hidden"));
  
    function loadGroups() {
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            displayGroups(tabGroups);
        });
    }
  
    function displayGroups(tabGroups) {
        groupList.innerHTML = ""; // Clear list
        if (Object.keys(tabGroups).length === 0) {
            groupList.innerHTML = '<div class="welcome-message">Welcome to TabIt! Save and manage your tab groups easily.</div>';
            return;
        }
        Object.keys(tabGroups).forEach((groupName) => {
            const groupDiv = document.createElement("div");
            groupDiv.className = "group";
            groupDiv.innerHTML = `
                <span>${groupName} - ${tabGroups[groupName].length} Tabs</span>
                <button class="open-btn">Open</button>
                <button class="delete-btn">Delete</button>
            `;
            groupDiv.querySelector(".open-btn").addEventListener("click", () => openGroupTabs(tabGroups[groupName]));
            groupDiv.querySelector(".delete-btn").addEventListener("click", () => showModal(groupName));
            groupList.appendChild(groupDiv);
        });
    }
  
    function saveTabs() {
        let groupName = document.getElementById("groupName").value.trim();
        if (!groupName) {
            assignDefaultGroupName();
            groupName = document.getElementById("groupName").value;
        }
        chrome.tabs.query({}, (tabs) => {
            const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
            chrome.storage.local.get(["tabGroups"], (result) => {
                const tabGroups = result.tabGroups || {};
                tabGroups[groupName] = tabInfo;
                chrome.storage.local.set({ tabGroups }, () => {
                    document.getElementById("groupName").value = "";
                    loadGroups();
                });
            });
        });
    }
  
    function assignDefaultGroupName() {
        errorMessage.style.display = "none"; // Hide any previous error messages
        chrome.storage.local.get(["tabGroups"], (result) => {
            const tabGroups = result.tabGroups || {};
            let groupNumber = 1;
            let defaultGroupName = `Group-${groupNumber}`;
            while (tabGroups[defaultGroupName]) {
                groupNumber++;
                defaultGroupName = `Group-${groupNumber}`;
            }
            document.getElementById("groupName").value = defaultGroupName;
        });
    }
  
    function addCurrentTab() {
        let groupName = document.getElementById("groupName").value.trim();
        if (!groupName) {
            assignDefaultGroupName();
            groupName = document.getElementById("groupName").value;
        }
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
            chrome.storage.local.get(["tabGroups"], (result) => {
                const tabGroups = result.tabGroups || {};
                if (!tabGroups[groupName]) tabGroups[groupName] = [];
                tabGroups[groupName].push(...tabInfo);
                chrome.storage.local.set({ tabGroups }, loadGroups);
            });
        });
    }
  
    function addAllTabs() {
        let groupName = document.getElementById("groupName").value.trim();
        if (!groupName) {
            assignDefaultGroupName();
            groupName = document.getElementById("groupName").value;
        }
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            const tabInfo = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
            chrome.storage.local.get(["tabGroups"], (result) => {
                const tabGroups = result.tabGroups || {};
                if (!tabGroups[groupName]) tabGroups[groupName] = [];
                tabGroups[groupName].push(...tabInfo);
                chrome.storage.local.set({ tabGroups }, loadGroups);
            });
        });
    }
  
    function showCurrentTabs() {
        chrome.windows.getAll({ populate: true }, (windows) => {
            const tabsContent = document.querySelector(".tabs-content");
            tabsContent.innerHTML = "";
            windows.forEach((win, index) => {
                const windowDiv = document.createElement("div");
                windowDiv.className = "window";
                windowDiv.innerHTML = `<strong>Window ${index + 1}</strong>`;
                win.tabs.forEach((tab) => {
                    const tabDiv = document.createElement("div");
                    tabDiv.className = "tab";
                    tabDiv.innerText = tab.title;
                    tabDiv.addEventListener("click", () => chrome.tabs.update(tab.id, { active: true }));
                    windowDiv.appendChild(tabDiv);
                });
                tabsContent.appendChild(windowDiv);
            });
            tabsPopup.classList.remove("hidden");
        });
    }
  
    function openGroupTabs(tabs) {
        tabs.forEach((tab) => chrome.tabs.create({ url: tab.url }));
    }
  
    function showModal(groupName) {
        modal.classList.remove("hidden");
        groupToDelete = groupName;
    }
  
    function closeModal() {
        modal.classList.add("hidden");
        groupToDelete = null;
    }
  
    function deleteGroup() {
        if (groupToDelete) {
            chrome.storage.local.get(["tabGroups"], (result) => {
                const tabGroups = result.tabGroups || {};
                delete tabGroups[groupToDelete];
                chrome.storage.local.set({ tabGroups }, loadGroups);
                closeModal();
            });
        }
    }
});
