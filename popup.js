document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history');
  
    // Fetch the clipboard history from storage
    chrome.storage.local.get(['clipboardHistory'], (result) => {
      const clipboardHistory = result.clipboardHistory || [];
  
      // Display each item in the history
      clipboardHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.addEventListener('click', () => {
          navigator.clipboard.writeText(item);
          alert('Copied: ' + item);
        });
        historyList.appendChild(listItem);
      });
    });
  
    // Clear history when the button is clicked
    clearHistoryButton.addEventListener('click', () => {
      chrome.storage.local.set({ clipboardHistory: [] }, () => {
        historyList.innerHTML = '';  // Clear the UI
        alert('Clipboard history cleared');
      });
    });
  });
  