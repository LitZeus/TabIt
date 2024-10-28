export async function loadGroups() {
    const groupList = document.getElementById("groupList");
    const result = await chrome.storage.local.get(["tabGroups"]);
    const tabGroups = result.tabGroups || {};

    groupList.innerHTML = "";
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
        groupList.appendChild(groupDiv);
    });
}
