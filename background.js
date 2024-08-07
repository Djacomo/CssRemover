chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const website = "https://www.ilmattino.it/";

const ON = "ON";
const OFF = "OFF";

chrome.action.onClicked.addListener(async (tab) => {
  console.log("Click", tab.id);

  if (tab.url.startsWith(website)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === ON ? OFF : ON;

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    console.log("setBadget");

    if (nextState === ON) {

       tabId = tab.id;

      chrome.scripting.executeScript({
        target:  {tabId},
        files: ["content-script.js"]
      });


    }
  }
});
