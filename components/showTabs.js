export function showCurrentTabs() {
    chrome.windows.getAll({ populate: true }, (windows) => {
        const tabsContent = document.querySelector(".tabs-content");
        tabsContent.innerHTML = "";
        windows.forEach((win, index) => {
            const windowDiv = document.createElement("div");
            windowDiv.textContent = `Window ${index + 1}:`;
            win.tabs.forEach((tab) => {
                const tabDiv = document.createElement("div");
                tabDiv.textContent = tab.title;
                windowDiv.appendChild(tabDiv);
            });
            tabsContent.appendChild(windowDiv);
        });
        document.getElementById("tabsPopup").classList.remove("hidden");
    });
}
