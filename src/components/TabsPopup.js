// src/components/TabsPopup.js
export default class TabsPopup {
    constructor(popupId, closeBtnId) {
        this.popup = document.getElementById(popupId);
        this.closeBtn = document.getElementById(closeBtnId);
        this.closeBtn.addEventListener("click", () => this.hide());
    }

    show() {
        this.popup.classList.remove("hidden");
    }

    hide() {
        this.popup.classList.add("hidden");
    }

    renderTabs(windows) {
        const tabsContent = this.popup.querySelector(".tabs-content");
        tabsContent.innerHTML = "";
        
        windows.forEach((win, index) => {
            const windowDiv = document.createElement("div");
            windowDiv.className = "window";
            windowDiv.innerHTML = `<strong>Window ${index + 1}</strong>`;
            win.tabs.forEach((tab) => {
                const tabDiv = document.createElement("div");
                tabDiv.className = "tab";
                tabDiv.innerText = tab.title;
                tabDiv.addEventListener("click", () => chrome.tabs.update(tab.id, { active: true }));
                windowDiv.appendChild(tabDiv);
            });
            tabsContent.appendChild(windowDiv);
        });
    }
}
