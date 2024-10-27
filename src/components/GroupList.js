// src/components/GroupList.js
export default class GroupList {
    constructor(listId, onOpen, onDelete) {
        this.list = document.getElementById(listId);
        this.onOpen = onOpen;
        this.onDelete = onDelete;
    }

    renderGroups(tabGroups) {
        this.list.innerHTML = "";
        if (Object.keys(tabGroups).length === 0) {
            this.list.innerHTML = '<div class="welcome-message">Welcome to TabIt! Save and manage your tab groups easily.</div>';
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

            groupDiv.querySelector(".open-btn").addEventListener("click", () => this.onOpen(tabGroups[groupName]));
            groupDiv.querySelector(".delete-btn").addEventListener("click", () => this.onDelete(groupName));
            this.list.appendChild(groupDiv);
        });
    }
}
