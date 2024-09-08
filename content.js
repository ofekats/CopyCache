
console.log("Content script loaded");

// Button click event to trigger clipboard read
document.addEventListener('DOMContentLoaded', () => {
    const button = document.createElement('button');
    button.textContent = 'Read Clipboard';
    button.style.position = 'fixed'; // Make sure the button is visible
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    button.addEventListener('click', () => {
        console.log("Button clicked, sending message to background script...");
        // Send a message to the background script to handle clipboard reading
        chrome.runtime.sendMessage({ type: 'read-clipboard' });
    });
    document.body.appendChild(button);
});

