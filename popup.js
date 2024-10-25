const groupList = document.getElementById('groupList');
const saveTabsButton = document.getElementById('saveTabsButton');
const groupNameInput = document.getElementById('groupName');
const modal = document.getElementById('modal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
let groupToDelete = null;

// Load groups and display welcome message on popup open
document.addEventListener('DOMContentLoaded', () => {
  loadGroups();
  showWelcomeMessage();
});

saveTabsButton.addEventListener('click', saveTabs);
confirmDelete.addEventListener('click', deleteGroup);
cancelDelete.addEventListener('click', () => closeModal());

// Function to display welcome message
function showWelcomeMessage() {
  const welcomeMessage = document.createElement('div');
  welcomeMessage.className = 'welcome-message';
  welcomeMessage.textContent = 'Welcome to TabIt! Save and manage your tab groups easily.';
  groupList.appendChild(welcomeMessage);
}

// Function to load and display groups
function loadGroups() {
  chrome.storage.local.get(['tabGroups'], (result) => {
    const tabGroups = result.tabGroups || {};
    displayGroups(tabGroups);
  });
}

// Display tab groups in list
function displayGroups(tabGroups) {
  groupList.innerHTML = ''; // Clear list

  // Display a message if no groups are saved
  if (Object.keys(tabGroups).length === 0) {
    showWelcomeMessage();
    return;
  }

  Object.keys(tabGroups).forEach(groupName => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'group';
    groupDiv.innerHTML = `
      <span>${groupName}</span>
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
  const groupName = groupNameInput.value.trim();
  if (!groupName) return;

  chrome.tabs.query({}, (tabs) => {
    const tabInfo = tabs.map(tab => ({ title: tab.title, url: tab.url }));
    chrome.storage.local.get(['tabGroups'], (result) => {
      const tabGroups = result.tabGroups || {};
      tabGroups[groupName] = tabInfo;
      chrome.storage.local.set({ tabGroups }, () => {
        groupNameInput.value = '';
        loadGroups();
      });
    });
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
