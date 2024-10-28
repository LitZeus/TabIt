export function loadGroups() {
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
            <button class="delete-btn" data-group-name="${groupName}">Delete</button>
        `;
        groupDiv.querySelector(".open-btn").addEventListener("click", () => openGroupTabs(tabGroups[groupName]));
        groupList.appendChild(groupDiv);
    });
}
