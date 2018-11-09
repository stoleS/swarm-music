// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "270",
    width: "480",
    controls: 0,
    events: {
      onReady: onPlayerReady
      // onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      modestbranding: 1,
      disablekb: 1
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(20);
}
