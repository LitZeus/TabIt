// Access the HTML elements
const groupList = document.getElementById('groupList');
const saveTabsButton = document.getElementById('saveTabsButton');
const groupNameInput = document.getElementById('groupName');

// Load saved groups on popup open
async function loadGroups() {
    chrome.storage.local.get(['tabGroups'], (result) => {
    const tabGroups = result.tabGroups || {};
    displayGroups(tabGroups);
    });
}

// Display saved groups in the popup
function displayGroups(tabGroups) {
  groupList.innerHTML = ''; // Clear previous list
    Object.keys(tabGroups).forEach(groupName => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'group';
    groupDiv.innerHTML = `<span class="group-title">${groupName}</span>`;
    groupDiv.addEventListener('click', () => openGroupTabs(tabGroups[groupName]));
    groupList.appendChild(groupDiv);
    });
}

// Save current open tabs to a new group
saveTabsButton.addEventListener('click', async () => {
    const groupName = groupNameInput.value.trim();
    if (!groupName) return;

  // Get all open tabs
    chrome.tabs.query({}, (tabs) => {
        const tabInfo = tabs.map(tab => ({ title: tab.title, url: tab.url }));
        chrome.storage.local.get(['tabGroups'], (result) => {
            const tabGroups = result.tabGroups || {};
            tabGroups[groupName] = tabInfo;
            chrome.storage.local.set({ tabGroups }, () => {
            groupNameInput.value = ''; // Clear input
            loadGroups(); // Refresh group list
            });
        });
    });
});

// Open tabs from a saved group
function openGroupTabs(tabs) {
    tabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
}

// Load groups on popup open
document.addEventListener('DOMContentLoaded', loadGroups);
