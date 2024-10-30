# TabIt (Web Extension)

**TabIt** is a browser extension designed to help users save and organize open tabs into named groups for easier access and management. Users can save tabs individually or in bulk, view saved groups, and delete groups as needed. The extension is built with ease of use and organization in mind.

![TabIt Icon](./assets/icons/tabit-icon.png)

## Features

- **Save Current Tab**: Add the currently active tab to a group.
- **Save All Tabs**: Save all open tabs in the current window to a group.
- **View Saved Groups**: View all saved groups and the tabs within each.
- **Open Tabs**: Quickly open all tabs in a saved group.
- **Delete Groups**: Remove a saved group entirely when it's no longer needed.
- **Responsive Design**: Adapts to various screen sizes and enhances user experience.

## Installation

1. Clone or download this repository to your local machine.
2. Open your Chrome browser and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle found in the upper-right corner).
4. Click on **Load unpacked** and select the directory where you saved this project.
5. You should see the TabIt icon appear in your browser’s extensions bar.

## How to Use

1. **Open the TabIt Extension**: Click on the TabIt icon in the Chrome extensions bar to open the extension popup.
2. **Save Tabs**:
   - To save the current tab, enter a name for the group in the input field and click **Add Current Tab**.
   - To save all open tabs in the current window, enter a name for the group and click **Add All**.
3. **View Saved Groups**: All saved groups will be displayed in the **Saved Groups** section.
   - If no groups are saved, you’ll see a message saying **"No groups are stored"**.
4. **Manage Groups**:
   - **List**: View tabs in a saved group by clicking **List**.
   - **Open**: Open all tabs in a group by clicking **Open**.
   - **Delete**: To delete a group, click **Delete** and confirm the action.
   
## Development

### Code Structure

- **popup.js**: Main script to initialize and handle events in the popup.
- **components/**: Folder containing modular scripts like:
  - `deleteGroup.js`: Handles group deletion.
  - `loadGroups.js`: Loads and displays saved groups.
  - `saveTabs.js`: Manages saving of current or all tabs.
- **styles.css**: CSS for styling the popup.

### Fonts and Icon

The extension uses custom fonts and an icon to enhance the UI:
- **Fonts**: [Google Fonts - Libre Baskerville and Nunito](https://fonts.google.com)
- **Icon**: Located in `./assets/icons/tabit-icon.png`

## License

This project is licensed under the MIT License.

## Contact

Developed by **LitZeus**.  
Find more projects on [GitHub](https://github.com/LitZeus).
