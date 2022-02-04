let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
});


function setPageBackoundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}


// Inject func to set background color on click
changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackoundColor,
  });
});

