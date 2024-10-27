// src/components/ErrorMessage.js
export default class ErrorMessage {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        this.errorMessage.style.display = "none"; // Hide initially
        this.container.appendChild(this.errorMessage);
    }

    show(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = "block";
    }

    hide() {
        this.errorMessage.style.display = "none";
    }
}
