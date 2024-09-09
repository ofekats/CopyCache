console.log("Content script loaded");

let previousClipboard = '';
let isMonitoring = false;

// Function to check if the tab is focused
function isTabFocused() {
    return document.hasFocus();
}

// Function to read from clipboard
function readClipboard() {
    if (isTabFocused()) {
        navigator.clipboard.readText().then((text) => {
            if (text && text !== previousClipboard) {
                chrome.runtime.sendMessage({ type: 'clipboard-update', text });
                previousClipboard = text;
                console.log("Clipboard content sent to background:", text);
            }
        }).catch(err => {
            console.error('Failed to read clipboard content:', err);
        });
    } else {
        console.log('Tab is not focused. Skipping clipboard read.');
    }
}

// Automatically start clipboard monitoring when the tab is activated
startClipboardMonitoring();

// Start monitoring clipboard every 2 seconds
function startClipboardMonitoring() {
    if (!isMonitoring) {
        isMonitoring = true;
        console.log("startClipboardMonitoring");
        setInterval(readClipboard, 2000); // Check clipboard content every 2 seconds
        console.log("Started clipboard monitoring");
    }
}