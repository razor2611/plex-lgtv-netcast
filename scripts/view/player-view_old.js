/**
* Video player with plex integration for progress,subtitles,etc
* @author Nastase Lucian Alexandru, http://www.themovieclips.com
*/

function PlayerView(uri, useViewOffset, returnView) {
    
    var _this = this;
    var autoPlaying;
    var playing;
    var fullScreenMode;
    var leftTopPos;
    var containerDiv;
    var containerWidth = null;
    var containerHeight = null;
    var ratioWidth = null;
    var ratioHeight = null;
    var videoPath = "";
    var video;
    var currentIndex;
    var TIME_FOR_SEEK = 10;
    var minPlayerHeight = 180;
    var minPlayerWidth = 320;
    var interval = null;
    var videoPlayInfo;
    var supportedMimeTypes = [".mp4", ".mpeg", ".wmv", ".asf", ".mkv"];
    var playTimerId;
    var hideTimerId;
    var key_naviObj = null;
    var objectFocussed = null;
    var rowID = 1;
    var dragged = false;
    var bufferWidthRatio = 0;
    var bControlsAdded=false;
    var settingsmenu;
    var player = document.getElementById('lgplayer');
    var processTimer;
    var totalDuration;
    var progressBarWidth = 995;
    
    getVideoPlayInfo = function () {
        var videoPlayInfo = video.mediaPlayInfo();

        if (videoPlayInfo) {
            if ((video.playState != 5) && (video.playState != 0) && (video.playState != 2)) {
                document.getElementById('elapsed').innerHTML = getTimeFromMS(videoPlayInfo.currentPosition);
                totalDuration = Math.floor(video.playTime/1000);
                document.getElementById('totaltime').innerHTML = Time.format(totalDuration);
                var pos = Math.ceil((videoPlayInfo.currentPosition / videoPlayInfo.duration) * progressBarWidth );
                setPosition(pos);
                playTimerId = setTimeout("getVideoPlayInfo()", 100);
            }
        }
    }; 

    playStateChange = function () {
        if (video.playState == 5 || video.playState == 0 ) {
           // resetProgress();
        } else if (video.playState == 1) {
           /* if ($('#progressBall').hasClass("progressBallInitial")) {
                $('#progressBall').attr('class', 'progressBall');
                $(".progressBall").css({
                    "width": ratioWidth * 71,
                        "height": ratioHeight * 44
                });
            }*/
            triggerHide();
          //  getVideoSourceInfo();
            getVideoPlayInfo();
        } else if (video.playState == 6) {
            //notifyError;
        }
    };
 
    getVideo = function () {
        return document.getElementById('video');
    };  
    
    triggerHide = function () {
        console.log("intrare in fucntioe hide");
      //  if (video.playState == 1 || video.playState == 4) {
            clearTimeout(hideTimerId);
            hideTimerId = setTimeout("hideControls()", 5000);
      //  }
    };
    
    function getTimeFromMS(msec) {
        var time = Math.round(msec / 1000);
        var hours = Math.floor(time / 3600);
        var mins = Math.floor((time % 3600) / 60);
        var secs = Math.floor((time % 3600) % 60);

        if (hours < 10) hours = "0" + hours;
        if (mins < 10) mins = "0" + mins;
        if (secs < 10) secs = "0" + secs;
        return hours + ":" + mins + ":" + secs;
    }    
    
    function setPosition(position) {
    	document.getElementById('progressbar').style.width = position + 'px';
     //   $("#progressBarStatus").addClass("progress progressBarStatus");
      //  $("#progressBarStatus").css("width", position + 'px');
      //  if (rowID == 2) {
      //      $('#progressBall').css("left", position - 14 * ratioWidth + 'px');
      //  } else {
       //     $('#progressBall').css("left", position + 'px');
      //  }
    }   
    
   this.buildPlayerMenu = function() {
  //  $(container).append('<object type="application/x-netcast-av" width="100%" height="100%" id="video"></object>');
        var elapsed = document.getElementById('elapsed');
        elapsed.InnerHTML("test");
   } 
        
   function showPlayer () {
        player.style.display = 'block';
        player.style.top = '0';
    }
    
    hideControls = function () {
       document.getElementById('player-controls').style.display = 'none';
    }
    
    
    this.onUp = function () {
    };
    
    this.onDown = function () {

    };
    
    this.onLeft = function () {
      //  doSkip(-60.0);
    };
    
    this.onRew = function () {
      //  doSkip(-300.0);
    };
    
    this.onRight = function () {
     //   doSkip(60.0);
    };
    
    this.onFF = function () {
      //  doSkip(300.0);
    };
    
    this.onEnter = function () {
      //  if(active) {
      //  active.onEnter();
      //  active = null;
      //  }
      //  else
      //  togglePause();
    };   
            
   this.render = function(container) {
	   video = getVideo();
       var media = container.media[0];
       var url = plexAPI.getURL(media.url);
       video.data = url;
       video.onPlayStateChange = playStateChange;
      // video.play(1);
       showPlayer();
       triggerHide();
      // getVideoPlayInfo();
       
   }
   
       //document.getElementById('video-loading').style.display = 'block';
       plexAPI.browse(uri, function(container) {
         _this.render(container);
       });
       
   
    
}