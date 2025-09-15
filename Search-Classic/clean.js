//Removed Google Games
var LIST = '.wF4fFd' 
//This removes "People also Ask"
	LIST = LIST + ', [class="cUnQKe"]';
//This removes "From the Web" and "Short Videos" - Search "Video Games" or "let it go music" or "blake shelton music videos"
	LIST = LIST + ', [class="Ww4FFb vt6azd"]';
//This removes "Buying guide: Video Games" - Search "Video Games"
	LIST = LIST + ', [class="mnr-c sPmWM"]';
//This removes "ADs" and "People also search for"
	LIST = LIST + ', #tvcap, #bottomads, #bres, [class="oIk2Cb"]';
//This removes Google Maps video content "Milk Island"
	LIST = LIST + ', .widget-scene-imagery-iframe';
//Searched "Video Games" This removes "Deals on Video Games","More products","In stores nearby","Popular products"
	LIST = LIST + ', .T98FId';
//Searched "blake shelton music videos" Removed Links to Videos
	LIST = LIST + ', [jsname="pKB8Bc"]';
//Searched "Snake" This removes "Top Stories"
	LIST = LIST + ', [class="yG4QQe TBC9ub NbhJ1c"]';
//Searched "Video Games" This removes top scroll bar
	LIST = LIST + ', #appbar';
//Searched "Video Games" This removes "Videos"
	LIST = LIST + ', [class="vtSz8d"]';
//This removes "AI Overview"
	LIST = LIST + ', [id="eKIzJc"]'; 
//This removes "AI Mode"
	LIST = LIST + ', [class="olrp5b"]'; // [class="XVMlrc C6AK7c"]


////Searched "let it go music" and "Frozen 2 songs" This removes other music/films related content and lists
//	LIST = LIST + ', [data-attrid="MembersOf"]';

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
