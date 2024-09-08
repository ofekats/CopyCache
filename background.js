console.log("Background script loaded");

let clipboardHistory = [];

// Limit the history to 50 items
const MAX_HISTORY_ITEMS = 50;

// Initialize clipboard history
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] });
  console.log("Clipboard history initialized!");
});

// Handle incoming messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'read-clipboard') {
    navigator.clipboard.readText().then((text) => {
      console.log("Clipboard content read:", text);
      saveClipboard(text);
    }).catch(err => {
      console.error('Failed to read clipboard content:', err);
    });
  }
});

function saveClipboard(text) {
  // Add the new text to history if it's not already the latest entry
  if (text && (clipboardHistory.length === 0 || clipboardHistory[0] !== text)) {
    clipboardHistory.unshift(text);
    
    if (clipboardHistory.length > MAX_HISTORY_ITEMS) {
      clipboardHistory.pop();
    }
    
    chrome.storage.local.set({ clipboardHistory });
  }
  console.log("Clipboard saved:", text);
}
