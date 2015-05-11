/*
*Name: videoHelpers 
*Description: Provides various helper functions for incorporating HTML5 video into the app
*/
var dependencies = ['app', 'leaflet'];

define(dependencies,

function(app, L){

  return app.factory("videoHelpers", function () {

  //Use this class to instantiate video events at a specified time. 
  //Meant to be passed to 'runAtTime' function. 
  videoUpdateHandler = function(handler, time){
    this.handler = handler;
    this.time = time;
  };

  //Use this as the callback in a video's "on time update" function. 
  //'This' refers to the video. 
  runAtTime = function(handler, time) {
    var wrapped = function() {
      if(this.currentTime >= time) {
        $(this).off('timeupdate', wrapped);
        return handler.apply(this, arguments);
      }
    }
    return wrapped;
  };

  detectHtml5Support = function(){
    function supports_video() {
      return !!document.createElement('video').canPlayType;
    };
    function supports_html5_video() {
      var v = document.createElement("video");
        if (!supports_video() || v.canPlayType('video/webm; codecs="vp8, vorbis"') !== "probably" || v.canPlayType('video/ogg; codecs="theora, vorbis"') !== "probably"){
          return false;
        }
    };
    return supports_html5_video();
  };
  
  //Use this to serve animated GIFs hosted on S3.
  returnVideoString = function(video){
    if (detectHtml5Support() !== false){
      var videoString = '<video muted style="width:100%;" autoplay="autoplay" loop=""><source src="https://s3-us-west-2.amazonaws.com/darinacostamediafiles/video/'+video+'.webm" type="video/webm"><source src="https://s3-us-west-2.amazonaws.com/darinacostamediafiles/video/'+video+'.ogv" type="video/ogg">Your browser does not support the video tag.</video>';
      return videoString
    }else{
      var videoString = 'The application has detected that your browser does not support ogg or webm video formats. Please visit this application in a Google Chrome or Firefox browser for full support.'
    }
      return videoString
  };

  //A popup for displaying video/gif content.
  videoEventPopup = L.popup({
    maxHeight:200,
    minWidth:250,
    //closeButton:false,
    closeOnClick:false
  });

  return {videoUpdateHandler: videoUpdateHandler,
          runAtTime: runAtTime,
          returnVideoString: returnVideoString,
          videoEventPopup: videoEventPopup}
  });
  
});