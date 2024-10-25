const groupList = document.getElementById('groupList');
const saveTabsButton = document.getElementById('saveTabsButton');
const addCurrentTabButton = document.getElementById('addCurrentTabButton');
const addAllTabsButton = document.getElementById('addAllTabsButton');
const showTabsButton = document.getElementById('showTabsButton');
const modal = document.getElementById('modal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const tabsPopup = document.getElementById('tabsPopup');
const closeTabsPopup = document.getElementById('closeTabsPopup');
const groupNameInput = document.getElementById('groupName'); // Define the groupNameInput variable
let groupToDelete = null;

// Load groups and display welcome message on popup open
document.addEventListener('DOMContentLoaded', () => {
    loadGroups();
});

// Event Listeners
saveTabsButton.addEventListener('click', saveTabs);
addCurrentTabButton.addEventListener('click', addCurrentTab);
addAllTabsButton.addEventListener('click', addAllTabs);
showTabsButton.addEventListener('click', showCurrentTabs);
confirmDelete.addEventListener('click', deleteGroup);
cancelDelete.addEventListener('click', () => closeModal());
closeTabsPopup.addEventListener('click', () => tabsPopup.classList.add('hidden'));

// Load and display groups
function loadGroups() {
    chrome.storage.local.get(['tabGroups'], (result) => {
        const tabGroups = result.tabGroups || {};
        displayGroups(tabGroups);
    });
}

// Display tab groups in list
function displayGroups(tabGroups) {
    groupList.innerHTML = ''; // Clear list

    if (Object.keys(tabGroups).length === 0) {
        groupList.innerHTML = '<div class="welcome-message">Welcome to TabIt! Save and manage your tab groups easily.</div>';
        return;
    }

    Object.keys(tabGroups).forEach(groupName => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.innerHTML = `
            <span>${groupName} - ${tabGroups[groupName].length} Tabs</span>
            <button class="open-btn">Open</button>
            <button class="delete-btn">Delete</button>
        `;

        // Attach click events for each button
        groupDiv.querySelector('.open-btn').addEventListener('click', () => openGroupTabs(tabGroups[groupName]));
        groupDiv.querySelector('.delete-btn').addEventListener('click', () => showModal(groupName));
        groupList.appendChild(groupDiv);
    });
}

// Save open tabs as a group
function saveTabs() {
    const groupName = groupNameInput.value.trim(); // Use the defined variable
    if (!groupName) return;

    chrome.tabs.query({}, (tabs) => {
        const tabInfo = tabs.map(tab => ({ title: tab.title, url: tab.url }));
        chrome.storage.local.get(['tabGroups'], (result) => {
            const tabGroups = result.tabGroups || {};
            tabGroups[groupName] = tabInfo;
            chrome.storage.local.set({ tabGroups }, () => {
                groupNameInput.value = ''; // Clear the input
                loadGroups(); // Reload groups after saving
            });
        });
    });
}

// Add the current tab to the group
function addCurrentTab() {
    const groupName = groupNameInput.value.trim(); // Use the defined variable
    if (!groupName) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabInfo = tabs.map(tab => ({ title: tab.title, url: tab.url }));
        chrome.storage.local.get(['tabGroups'], (result) => {
            const tabGroups = result.tabGroups || {};
            if (!tabGroups[groupName]) tabGroups[groupName] = [];
            tabGroups[groupName].push(...tabInfo);
            chrome.storage.local.set({ tabGroups }, loadGroups);
        });
    });
}

// Add all tabs in the current window to the group
function addAllTabs() {
    const groupName = groupNameInput.value.trim(); // Use the defined variable
    if (!groupName) return;

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        const tabInfo = tabs.map(tab => ({ title: tab.title, url: tab.url }));
        chrome.storage.local.get(['tabGroups'], (result) => {
            const tabGroups = result.tabGroups || {};
            if (!tabGroups[groupName]) tabGroups[groupName] = [];
            tabGroups[groupName].push(...tabInfo);
            chrome.storage.local.set({ tabGroups }, loadGroups);
        });
    });
}

// Show current tabs in a tree structure
function showCurrentTabs() {
    chrome.windows.getAll({ populate: true }, (windows) => {
        const tabsContent = document.querySelector('.tabs-content');
        tabsContent.innerHTML = '';

        windows.forEach((win, index) => {
            const windowDiv = document.createElement('div');
            windowDiv.className = 'window';
            windowDiv.innerHTML = `<strong>Window ${index + 1}</strong>`;
            win.tabs.forEach(tab => {
                const tabDiv = document.createElement('div');
                tabDiv.className = 'tab';
                tabDiv.innerText = tab.title;
                tabDiv.addEventListener('click', () => chrome.tabs.update(tab.id, { active: true }));
                windowDiv.appendChild(tabDiv);
            });
            tabsContent.appendChild(windowDiv);
        });

        tabsPopup.classList.remove('hidden');
    });
}

// Open saved group tabs
function openGroupTabs(tabs) {
    tabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
}

// Show delete confirmation modal
function showModal(groupName) {
    modal.classList.remove('hidden');
    groupToDelete = groupName;
}

// Close modal without deleting
function closeModal() {
    modal.classList.add('hidden');
    groupToDelete = null;
}

// Confirm and delete group
function deleteGroup() {
    if (groupToDelete) {
        chrome.storage.local.get(['tabGroups'], (result) => {
            const tabGroups = result.tabGroups || {};
            delete tabGroups[groupToDelete];
            chrome.storage.local.set({ tabGroups }, loadGroups);
            closeModal();
        });
    }
}
