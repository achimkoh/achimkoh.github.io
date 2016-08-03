// adapted from Jim W's code: http://stackoverflow.com/a/17494943
// change layout based on amount of Y scroll
var minimizeTriggerPosition=-1;

function moveThings() {
    // video position is used as reference point
    var vid = document.getElementById('video-frame');

    // desktop view involves moving around lots of things
    if(window.innerWidth > 960) {
        var minimizeTrigger = document.getElementById('phoneme-explanation');
        var videoLimitElement = document.getElementById('whats-next');
        var videoLimit = findPosY(videoLimitElement);

        // adjust top margin to TfCS header position (header stops being fixed at 1242px)
        var marginTop;
        if(window.innerWidth > 1242){
            marginTop = 125;
        }else{
            marginTop = 75;
        }

        if(minimizeTriggerPosition<0)minimizeTriggerPosition=findPosY(minimizeTrigger);

        if(pageYOffset>minimizeTriggerPosition-300){
            $('#video-navigation').addClass('minimized');
            $('#video-frame').addClass('minimized');
            $('#video').addClass('minimized');
            $('.entry-content').addClass('shifted');
            vid.style.top=marginTop+'px';
            if(pageYOffset>videoLimit){
                vid.style.top=(marginTop-pageYOffset+videoLimit)+'px';
            }
        }else{
            $('#video-navigation').removeClass('minimized');
            $('#video-frame').removeClass('minimized');
            $('#video').removeClass('minimized');
            $('.entry-content').removeClass('shifted');
            vid.style.top=0;
        }
    }else{
        // mobile view is much simpler
        if(pageYOffset>vid.offsetTop){
            $('.video-navigation-mobile').addClass('minimized');
        }else{
            $('.video-navigation-mobile').removeClass('minimized');
        }

        // things need to be reset when window shrinks from desktop view to mobile view
        $('#video-navigation').removeClass('minimized');
        $('#video-frame').removeClass('minimized');
        $('#video').removeClass('minimized');
        $('.entry-content').removeClass('shifted');
        vid.style.top=0;

    }
}

window.onscroll=function(){
    moveThings();
};

window.onresize=function(){
    moveThings();
};

function findPosY(obj) {
    var curtop = 0;
    if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        curtop += obj.offsetTop;
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

// add current page's title (which should be the phoneme) to navigation menu
$(document).ready(function() {
    $('#phoneme').html(document.title);
    $('a[href$="#in-words"]').html(document.title + ' ' + $('a[href$="#in-words"]').html())
    $('a[href$="#in-sentences"]').html(document.title + ' ' + $('a[href$="#in-sentences"]').html())
});