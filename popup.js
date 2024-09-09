console.log("popup.js loaded");

// Function to load clipboard history and display it in the popup
function loadClipboardHistory() {
    chrome.storage.local.get(['clipboardHistory'], (result) => {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = ''; // Clear the list first
        const history = result.clipboardHistory || [];

        history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            historyList.appendChild(listItem);
        });
    });
}

// Wait for DOM to load and attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded");

    // Load clipboard history when the popup is opened
    loadClipboardHistory();

    const startMonitoringBtn = document.getElementById('start-monitoring-btn');
    
    // When the button is clicked, start clipboard monitoring
    startMonitoringBtn.addEventListener('click', () => {
        console.log("Start Clipboard Monitoring button clicked");
        chrome.runtime.sendMessage({ type: 'start-monitoring' });
    });

    // Clear history when button is clicked
    document.getElementById('clear-history').addEventListener('click', () => {
        chrome.storage.local.set({ clipboardHistory: [] }, () => {
            loadClipboardHistory(); // Reload history after clearing
        });
    });
});
