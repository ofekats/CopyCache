// console.log("Background script loaded");

const MAX_HISTORY_ITEMS = 50;

let LastNotification = '';

// Save clipboard data to storage
function saveClipboard(text) {
    chrome.storage.local.get(['clipboardHistory'], (result) => {
        const history = result.clipboardHistory || [];
        if (!history.includes(text)) {
            history.unshift(text);  // Add new entry to the beginning of the array
            if (history.length > MAX_HISTORY_ITEMS) {
                history.pop();  // Limit history size
            }
            chrome.storage.local.set({ clipboardHistory: history });
            // console.log("New clipboard text saved:", text);
        }
    });
}

// Receive clipboard data from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'clipboard-update') {
        saveClipboard(message.text);
        
        // Check if notifications are enabled
        chrome.storage.local.get(['notificationsEnabled'], (result) => {
            if (result.notificationsEnabled !== false && LastNotification !== message.text) {
                LastNotification = message.text;
                createNotification(message.text);
            }
        });
    }
});

// Start clipboard monitoring when a tab is active
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.active && !tab.url.startsWith('chrome://')) {
            chrome.scripting.executeScript({
                target: { tabId: activeInfo.tabId },
                files: ['content.js']
            });
        }
    });
});


function createNotification(text) {
    // console.log("createNotification");
    const notificationOptions = {
        type: 'basic',
        iconUrl: 'icons/128.png',
        title: 'CopyCache',
        message: `Copied to CopyCache: ${text}`
    };

    chrome.notifications.create(`my-notification-${Date.now()}`, notificationOptions, (notificationId) => {
        // console.log(`Notification created on chrome`);
        if (chrome.runtime.lastError) {
            console.error("Notification error:", chrome.runtime.lastError.message);
        }

        // delete after 5 second
        setTimeout(() => {
            chrome.notifications.clear(notificationId, () => {
                // console.log("Notification cleared");
            });
        }, 5000);
    });
}