//Removed Google Games
var LIST = '.yp1CPe';
//Searched "Snake" Removed Google Feedback and see results about
LIST = LIST + ', .AuP6le, .VjDLd';
//Searched "Frozen 2" Removed Videos, Trailers, Songs, and Clips
LIST = LIST + ', .uVMCKf, .JNkvid, .LwV4sf, .M8OgIe, .LXqMce, .sfS5Re';
//Searched "Frozen 2" Added options
LIST = LIST + ', .rl_item';
//Searched "Snake" Removed People also Ask
LIST = LIST + ', .AuVD, .cUnQKe';
//Searched "Snake" Removed Related Searches
LIST = LIST + ', #w3bYAd';
//Searched "Snake" Removed Top Stories
LIST = LIST + ', .yG4QQe, .TBC9ub';
//Searched "Games" Removed top scroll bar
LIST = LIST + ', .pGEVQb';
//Searched "blake shelton music videos" Removed Links to Videos
LIST = LIST + ', .dFd2Tb, .mnr-c';
//Searched "cartoons" Removed What to Watch
LIST = LIST + ', .fvRoCd';
//This removes ADs
LIST = LIST + ', #tvcap, #bottomads';
//This removes Side bar
LIST = LIST + ', .hSOk2e';

const mo = new MutationObserver(onMutation);
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
