document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history');
  
    // Function to create a history item with copy and delete buttons
    function createHistoryItem(text) {
      const listItem = document.createElement('li');
      listItem.className = 'history-item';
  
      // Create the text element
      const textElement = document.createElement('span');
      textElement.textContent = text;
      listItem.appendChild(textElement);
  
      // Create the copy button
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.className = 'copy-button';
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
          console.log('Copied to clipboard:', text);
        }).catch(err => {
          console.error('Failed to copy text:', err);
        });
      });
      listItem.appendChild(copyButton);
  
      // Create the delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', () => {
        listItem.remove(); // Remove the item from the UI
        removeFromStorage(text); // Remove from storage
      });
      listItem.appendChild(deleteButton);
  
      return listItem;
    }
  
    // Function to remove an item from storage
    function removeFromStorage(text) {
      chrome.storage.local.get(['clipboardHistory'], (result) => {
        let history = result.clipboardHistory || [];
        history = history.filter(item => item !== text);
        chrome.storage.local.set({ clipboardHistory: history });
      });
    }
  
    // Load history from storage and display it
    chrome.storage.local.get(['clipboardHistory'], (result) => {
      const history = result.clipboardHistory || [];
      historyList.innerHTML = ''; // Clear existing items
      history.forEach(text => {
        historyList.appendChild(createHistoryItem(text));
      });
    });
  
    // Clear all history on button click
    clearHistoryButton.addEventListener('click', () => {
      chrome.storage.local.set({ clipboardHistory: [] });
      historyList.innerHTML = ''; // Clear UI
    });
  });
  
document.addEventListener('DOMContentLoaded', () => {
    const switchButton = document.getElementById('notification-switch');

    // Load switch state from storage
    chrome.storage.local.get(['notificationsEnabled'], (result) => {
        switchButton.checked = result.notificationsEnabled !== false; // Default to true if not set
    });

    // Save switch state when it changes
    switchButton.addEventListener('change', () => {
        chrome.storage.local.set({ notificationsEnabled: switchButton.checked });
    });
});


