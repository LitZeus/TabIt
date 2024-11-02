import { cancelDelete, confirmDelete, triggerDelete } from "./deleteGroup.js";

export function loadGroups() {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        const groupList = document.getElementById("groupList");
        groupList.innerHTML = "";

        if (Object.keys(tabGroups).length === 0) {
            groupList.innerHTML = "<p>No groups are stored</p>";
        } else {
            Object.keys(tabGroups).forEach(groupName => {
                const groupDiv = document.createElement("div");
                groupDiv.className = "group-item";
                groupDiv.innerHTML = `
                    <span>${groupName}</span>
                    <button class="show-tabs" data-group-name="${groupName}">List</button>
                    <button class="open-group" data-group-name="${groupName}">Open</button>
                    <button class="delete-group" data-group-name="${groupName}">Delete</button>
                `;
                groupList.appendChild(groupDiv);
            });
        }
        addDeleteEventListeners();
    });
}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-group');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const groupName = e.target.getAttribute('data-group-name');
            triggerDelete(groupName);
        });
    });

    const confirmDeleteButtons = document.querySelectorAll('.confirm-delete');
    confirmDeleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            confirmDelete();
        });
    });

    const cancelDeleteButtons = document.querySelectorAll('.cancel-delete');
    cancelDeleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            cancelDelete();
        });
    });
}
