// contentscript.js

// This code will be injected into the web page's context

// Example: Change the background color of every paragraph on the page
const paragraphs = document.querySelectorAll('p');
for (const paragraph of paragraphs) {
  paragraph.style.backgroundColor = 'yellow';
}

// Example: Display an alert when the page loads
window.addEventListener('load', () => {
  console.log('This is a Chrome extension content script!');
});

// You can add more code here to interact with the web page as needed
