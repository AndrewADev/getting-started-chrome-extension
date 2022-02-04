let page = document.getElementById('buttonDiv');
let selectedClassName = 'current';
const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function handleButtonClick(event) {
  // Remove previous color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName)
  }

  // mart the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

function constructOptions(buttonColors) {
  chrome.storage.sync.get('color', (data) => {
    let currentColor = data.color;
    for (let buttonColor of buttonColors) {
      let button = document.createElement('button');
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      button.addEventListener('click', handleButtonClick);
      page.appendChild(button);
    }
  });
}

// init page by constructing the color options
constructOptions(presetButtonColors);