//Removed Google Games
var LIST = '[class="g mnr-c g-blk"], [class="g wF4fFd g-blk"]'
//Searched "Snake" Removed Google Feedback and see results about
LIST = LIST + ', .VjDLd';//.AuP6le, 
//Searched "Frozen 2" Removed Videos, Trailers, Songs, and Clips
LIST = LIST + ', .uVMCKf, .JNkvid, .M8OgIe, .LwV4sf';//, .LXqMce, .sfS5Re'
//Searched "Frozen 2" Added options like picutes and sub sections to results
LIST = LIST + ', .NFQFxe';
//Searched "pythons" Removed People also Ask
LIST = LIST + ', .AuVD, .cUnQKe';
//Searched "Snake" Removed Related Searches
LIST = LIST + ', #w3bYAd, .AUiS2';
//Searched "Snake" Removed Top Stories
LIST = LIST + ', [class="yG4QQe TBC9ub"]';
//Searched "Video Games" Removed top scroll bar and popular options and Buying Options
LIST = LIST + ', .baPFxb, .kSMK2, .sPmWM';
//Searched "Video Games" Removed "Refine Video Games" options
LIST = LIST + ', [class="vZFyxc SdYGsb"]';
//Searched "blake shelton music videos" Removed Links to Videos
LIST = LIST + ', .dFd2Tb, [jscontroller="pgCXqb"]';// .mnr-c
//Searched "Frozen 2" This removes right Side bar
LIST = LIST + ', [role="complementary"]'; // .hSOk2e
//This removes ADs
LIST = LIST + ', #tvcap, #bottomads, #bres, [class="TzHB6b cLjAic"]';
//This removes Feedback Line  and TAB LIST on some pages
LIST = LIST + ', [class="rpBMYb kno-ftr"], [role="tablist"], .XqFnDf';
//This removes Google Maps video content "Milk Island"
LIST = LIST + ', .kPvgOb, .widget-scene-imagery-iframe';

//Searched "let it go music" and "Frozen 2 songs" This removes other music/films related content and lists
LIST = LIST + ', [data-attrid="action:listen_recording_cluster"]';
LIST = LIST + ', [data-attrid="kc:/music/recording_cluster:other versions"]';
LIST = LIST + ', [data-attrid="kc:/film/film:songs musicals"]';
LIST = LIST + ', [data-attrid="LooselyRelatedTo"]';
LIST = LIST + ', [data-attrid="list"]';
LIST = LIST + ', [data-attrid="MembersOf"]';

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
