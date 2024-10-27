// src/components/GroupNameInput.js
export default class GroupNameInput {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.input = document.createElement("input");
        this.input.id = "groupName";
        this.container.appendChild(this.input);
    }

    getGroupName() {
        return this.input.value.trim();
    }

    clearInput() {
        this.input.value = "";
    }

    setDefaultGroupName(name) {
        this.input.value = name;
    }
}
