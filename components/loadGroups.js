import { cancelDelete, confirmDelete, triggerDelete } from "./deleteGroup.js";

export function loadGroups() {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        const groupList = document.getElementById("groupList");
        groupList.innerHTML = ""; // Clear the list before populating

        Object.keys(tabGroups).forEach(groupName => {
            const groupDiv = document.createElement("div");
            groupDiv.className = "group-item";
            groupDiv.innerHTML = `
                <span>${groupName}</span>
                <button class="show-tabs" data-group-name="${groupName}">List</button>
                <button class="open-group" data-group-name="${groupName}">Open</button>
                <button class="delete-group" data-group-name="${groupName}">Delete</button>
                <div id="confirmDelete-${groupName}" class="hidden">
                    Are you sure you want to delete this group?
                    <button class="confirm-delete" data-group-name="${groupName}">Yes</button>
                    <button class="cancel-delete" data-group-name="${groupName}">No</button>
                </div>
            `;
            groupList.appendChild(groupDiv);
        });

        // Add event listeners for delete confirmation buttons
        addDeleteEventListeners();
    });
}

// Function to add event listeners for delete actions
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
            const groupName = e.target.getAttribute('data-group-name');
            confirmDelete(groupName);
        });
    });

    const cancelDeleteButtons = document.querySelectorAll('.cancel-delete');
    cancelDeleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const groupName = e.target.getAttribute('data-group-name');
            cancelDelete(groupName);
        });
    });
}
