console.log("Content script loaded");

let previousClipboard = '';

// Function to read clipboard
function readClipboard() {
    navigator.clipboard.readText().then((text) => {
        if (text && text !== previousClipboard) {
            chrome.runtime.sendMessage({ type: 'clipboard-update', text });
            previousClipboard = text;
            console.log("Clipboard content sent to background:", text);
        }
    }).catch(err => {
        console.error('Failed to read clipboard content:', err);
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'start-clipboard-monitoring') {
        console.log("Clipboard monitoring started in content script");
        setInterval(readClipboard, 2000); // Check clipboard content every 2 seconds
    }
});
