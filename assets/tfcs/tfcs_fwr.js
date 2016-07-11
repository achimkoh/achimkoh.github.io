$(function () {

  var RECORDER_APP_ID = "recorderApp";
//  var $level = $('.level .progress');

  var appWidth = 24;
  var appHeight = 24;
  var flashvars = {'upload_image': 'http://michalstocki.github.io/FlashWavRecorder/html/images/upload.png'};
  var params = { allowScriptAccess: 'always', wmode: 'transparent'};
  var attributes = {'id': RECORDER_APP_ID, 'name': RECORDER_APP_ID};
  swfobject.embedSWF("../files/2016/06/recorder.jpg", "flashcontent", appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);

  window.fwr_event_handler = function fwr_event_handler() {
    var name, $controls;
    switch (arguments[0]) {
      case "ready":
        FWRecorder.uploadFormId = "#uploadForm";
        FWRecorder.uploadFieldName = "upload_file[filename]";
        FWRecorder.connect(RECORDER_APP_ID, 0);
        FWRecorder.recorderOriginalWidth = appWidth;
        FWRecorder.recorderOriginalHeight = appHeight;
        break;

      case "microphone_user_request":
        FWRecorder.showPermissionWindow();
        break;

      case "permission_panel_closed":
        FWRecorder.defaultSize();
        break;

      case "recording":
        FWRecorder.hide();
        FWRecorder.resize(1, 1);
        FWRecorder.observeLevel();
        break;

      case "recording_stopped":
        // FWRecorder.show();
        window.duration = arguments[2].toFixed(2) * 1000;

        FWRecorder.stopObservingLevel();
        $(".audiolevel").css({height: 0});
        break;

      case "microphone_level":
      	var curLevel = $(".audiolevel").height();
        $(".audiolevel").css({height: (arguments[1]*90 + curLevel*10/40) + '%'});
        break;

    }
  };

  function recorderEl() {
    return $('#' + RECORDER_APP_ID);
  }
});

$(document).on('click', '.record', function() {
	if (!FWRecorder.isMicrophoneAccessible()) {
		FWRecorder.showPermissionWindow();
	} else {
	    $(this).toggleClass('recording'); 
	}

    if ($(this).hasClass('recording')) {
	    FWRecorder.configure(22, 67, 10, 4000);
        FWRecorder.setUseEchoSuppression(true); 
        $(".progress").css({ width: '0%' });   	
    	setTimeout(function() { FWRecorder.record('audio', 'audio.wav'); }, 1);

    } else {
    	setTimeout(function() { FWRecorder.stopRecording('audio');}, 1);
    }
});

$(document).on('click', '.playback', function() {
	if (!$(".record").hasClass('recording')) {
		$(".progress").css({ width: '0%' });
    	setTimeout(function() { FWRecorder.playBack('audio'); }, 5);
    	$(".progress").animate({width: '100%'}, window.duration+10, function() {} );
	}
});