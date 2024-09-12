# CopyCache - Chrome Extension

**CopyCache** is a simple and efficient Chrome extension that allows users to monitor their clipboard history, manage copied items, and receive notifications whenever new content is copied. The extension stores clipboard data locally and enables users to copy or delete saved items quickly.  

![image](https://github.com/user-attachments/assets/b5fe5ff5-32fa-446c-86c0-729b14565f98)


## Features

- **Clipboard Monitoring**: Automatically detects and stores copied text from the clipboard.
- **Clipboard History**: Displays a list of recently copied items, allowing you to copy or delete them.
- **Notifications**: Receive a notification every time new text is copied (optional).
- **Local Storage**: Clipboard history is saved locally, even after closing the browser.
- **Configurable Notifications**: Easily enable or disable notifications via the popup.

## Usage

1. **Clipboard Monitoring**:
   - Once installed, **CopyCache** automatically starts monitoring your clipboard.
   - When you copy any text, the extension will save it to your clipboard history.

2. **Viewing Clipboard History**:
   - Click on the **CopyCache** extension icon in the Chrome toolbar.
   - The popup will display a list of your recent copied items.
  
![image](https://github.com/user-attachments/assets/a0b20bf6-8957-4b47-bfac-0651c8dcdee3)

3. **Managing Clipboard History**:
   - **Copy**: Click the "Copy" button next to any item to copy it back to the clipboard.
   - **Delete**: Click the "X" button to remove an item from the clipboard history.
   - **Clear History**: Press the "Clear History" button to delete all clipboard entries.

4. **Notifications**:
   - You can enable or disable clipboard notifications by toggling the "Enable Notifications" checkbox in the popup.
   - When enabled, you'll receive a notification every time new text is copied to your clipboard.

## Permissions

To ensure the proper functionality of the CopyCache extension, the following permissions are required:

- **`clipboardRead` and `clipboardWrite`**: Allows the extension to access and read clipboard data, which is essential for monitoring and managing the content copied to the clipboard.

- **`storage`**: Enables the extension to store clipboard history locally. This allows for saving and retrieving previously copied items from the browser's local storage.

- **`scripting`**: Grants the extension the ability to execute scripts within web pages. This is used to inject the content script (`content.js`) into active tabs to monitor clipboard changes.

- **`activeTab`**: Allows the extension to access the currently active tab. This permission is used to interact with the active tab for script injection and clipboard monitoring.

- **`notifications`**: Required to display notifications when new clipboard text is detected. This enables the extension to inform the user about copied content through pop-up notifications.


## Code Overview

### `manifest.json`

Defines the extension's metadata, including required permissions, icons, background scripts, and content scripts.

### `background.js`

Handles clipboard data storage, notifications, and interactions between the content script and Chrome's APIs.

### `content.js`

Monitors the clipboard on active tabs and sends updates to the background script.

### `popup.html`, `popup.js`, `popup.css`

The popup interface allows users to view and manage clipboard history, clear history, and enable/disable notifications.


## Known Issues

- **Notifications may not appear**: Ensure that Chrome notifications are enabled in your system settings.
- **Clipboard monitoring may not work on Chrome internal pages** (`chrome://` URLs).
