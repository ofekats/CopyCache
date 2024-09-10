console.log("Content script loaded");

// Check if `previousClipboard` is already defined in the global scope
if (typeof window.previousClipboard === 'undefined') {
    window.previousClipboard = ''; // Initialize only if not defined
}


// Check if `isMonitoring` is already defined in the global scope
if (typeof window.isMonitoring === 'undefined') {
    window.isMonitoring = false; // Initialize only if not defined
}
// Function to check if the tab is focused
function isTabFocused() {
    return document.hasFocus();
}

// Function to read from clipboard
function readClipboard() {
    if (isTabFocused()) {
        navigator.clipboard.readText().then((text) => {
            if (text && text !== window.previousClipboard) {
                chrome.runtime.sendMessage({ type: 'clipboard-update', text });
                window.previousClipboard = text;
                console.log("Clipboard content sent to background:", text);
            }
        }).catch(err => {
            console.log('Failed to read clipboard content');
        });
    } else {
        console.log('Tab is not focused. Skipping clipboard read.');
    }
}

// Automatically start clipboard monitoring when the tab is activated
startClipboardMonitoring();

// Start monitoring clipboard every 2 seconds
function startClipboardMonitoring() {
    if (!window.isMonitoring) {
        window.isMonitoring = true;
        console.log("startClipboardMonitoring");
        setInterval(readClipboard, 2000); // Check clipboard content every 2 seconds
        console.log("Started clipboard monitoring");
    }
}

