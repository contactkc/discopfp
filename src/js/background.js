let isActive = false;

chrome.action.onClicked.addListener(async (tab) => {
  if (isActive) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.dispatchEvent(new CustomEvent('DISCOPFP_EXIT')),
    });
  } else {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['./src/css/styles.css'],
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['./src/js/content.js'],
    });
  }
  isActive = !isActive;
});
