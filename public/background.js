chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.audioSources) {
      const audioSources = message.audioSources;
      console.log('Audio Sources:', audioSources);
  
      // Perform further processing as needed
    }
  });