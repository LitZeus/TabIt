// src/components/Modal.js
export default class Modal {
    constructor(modalId, confirmBtnId, cancelBtnId) {
        this.modal = document.getElementById(modalId);
        this.confirmButton = document.getElementById(confirmBtnId);
        this.cancelButton = document.getElementById(cancelBtnId);

        this.cancelButton.addEventListener("click", () => this.hide());
    }

    show(onConfirm) {
        this.modal.classList.remove("hidden");
        this.confirmButton.onclick = () => {
            onConfirm();
            this.hide();
        };
    }

    hide() {
        this.modal.classList.add("hidden");
    }
}
