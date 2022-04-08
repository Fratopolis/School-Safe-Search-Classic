if (
	(document.documentElement.textContent).toLowerCase().indexOf('it looks like there aren\'t many great matches for your search') > -1
) {
	//This removes Everything if no good matches Searched: sun requirements for jobarosa flowers
	var LIST = '.tF2Cxc, .AaVjTc';
}

// in case the content script was injected after the page is partially loaded
onMutation([{addedNodes: [document.documentElement]}]);
observe();

function onMutation(mutations) {
  let stopped;
  for (const {addedNodes} of mutations) {
    for (const n of addedNodes) {
      if (n.tagName) {
        if (n.matches(LIST)) {
          stopped = true;
          mo.disconnect();
          n.remove();
        } else if (n.firstElementChild && n.querySelector(LIST)) {
          stopped = true;
          mo.disconnect();
          for (const el of document.querySelectorAll(LIST)) el.remove();
        }
      }
    }
  }
  if (stopped) observe();
}

function observe() {
  mo.observe(document, {
    subtree: true,
    childList: true,
  });
}