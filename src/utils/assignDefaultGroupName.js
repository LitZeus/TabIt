// src/utils/assignDefaultGroupName.js
export default function assignDefaultGroupName(tabGroups) {
    let groupNumber = 1;
    let defaultGroupName = `Group-${groupNumber}`;
    while (tabGroups[defaultGroupName]) {
        groupNumber++;
        defaultGroupName = `Group-${groupNumber}`;
    }
    return defaultGroupName;
}
