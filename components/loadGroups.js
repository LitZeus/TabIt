export function loadGroups() {
    console.log("Loading groups...");
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        const groupList = document.getElementById("groupList");
        groupList.innerHTML = ""; // Clear existing groups

        Object.keys(tabGroups).forEach(groupName => {
            const groupDiv = document.createElement("div");
            groupDiv.className = "group-item";
            groupDiv.innerHTML = `
                <span>${groupName}</span>
                <button class="show-tabs" data-group-name="${groupName}">List Tabs</button>
                <button class="open-group" data-group-name="${groupName}">Open Group</button>
                <button class="delete-group" data-group-name="${groupName}">Delete Group</button>
            `;
            groupList.appendChild(groupDiv);
        });

        console.log("Groups loaded:", Object.keys(tabGroups));
    });
}
