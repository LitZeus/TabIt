export function showModal(groupName) {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("confirmDelete").onclick = () => confirmDelete(groupName);
}

export function confirmDelete(groupName) {
    chrome.storage.local.get(["tabGroups"], (result) => {
        const tabGroups = result.tabGroups || {};
        delete tabGroups[groupName];
        chrome.storage.local.set({ tabGroups });
        closeModal();
        loadGroups();
    });
}

export function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}
