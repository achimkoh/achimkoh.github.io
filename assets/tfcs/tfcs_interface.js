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
        var videoLimit = findPosY(videoLimitElement) - 700;

        // adjust top margin to TfCS header position (header stops being fixed at 1242px)
        var marginTop;
        if(window.innerWidth > 1242){
            marginTop = 125;
        }else{
            marginTop = 75;
        }

        if(minimizeTriggerPosition<0)minimizeTriggerPosition=findPosY(minimizeTrigger);

        if(pageYOffset>minimizeTriggerPosition-300){
            jQuery('#video-navigation').addClass('minimized');
            jQuery('#video-frame').addClass('minimized');
            jQuery('#video').addClass('minimized');
            jQuery('.entry-content').addClass('shifted');
            vid.style.top=marginTop+'px';
            if(pageYOffset>videoLimit){
                vid.style.top=(marginTop-pageYOffset+videoLimit)+'px';
            }
        }else{
            jQuery('#video-navigation').removeClass('minimized');
            jQuery('#video-frame').removeClass('minimized');
            jQuery('#video').removeClass('minimized');
            jQuery('.entry-content').removeClass('shifted');
            vid.style.top=0;
        }
    }else{
        // mobile view is much simpler
        if(pageYOffset>vid.offsetTop){
            jQuery('.video-navigation-mobile').addClass('minimized');
        }else{
            jQuery('.video-navigation-mobile').removeClass('minimized');
        }

        // things need to be reset when window shrinks from desktop view to mobile view
        jQuery('#video-navigation').removeClass('minimized');
        jQuery('#video-frame').removeClass('minimized');
        jQuery('#video').removeClass('minimized');
        jQuery('.entry-content').removeClass('shifted');
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
jQuery(document).ready(function($) {
    $('#phoneme').html(document.title);
    $('a[href$="#in-words"]').html(document.title + ' ' + $('a[href$="#in-words"]').html())
    $('a[href$="#in-sentences"]').html(document.title + ' ' + $('a[href$="#in-sentences"]').html())
    // $(".help-text").toggleClass('display-none');
    // setTimeout(function() {
    //     $(".help-text").toggleClass('display-none');
    // }, 2000);

    $('.playback-slow').on('click', function(e) {
        document.getElementById('video').playbackRate = 0.5;
        document.getElementById('video').play();
        $('.playback-slow').css("font-weight", "bold")
        $('.playback-normal').css("font-weight", "normal")
        return false;
    });
    $('.playback-normal').on('click', function() {
        document.getElementById('video').playbackRate = 1;
        document.getElementById('video').play();
        $('.playback-slow').css("font-weight", "normal")
        $('.playback-normal').css("font-weight", "bold")
        return false;
    });
    $('.playback-normal').css("font-weight", "bold")

    $('.trigger-hover').on('click mouseover', function() {
        $('button.recorder').css("background-color", "#ffc438");
        $('button.recorder').addClass("button-hover-effect");
        setTimeout(function() {
            $('button.recorder').removeClass("button-hover-effect");
            $('button.recorder').css("background-color", "#f0f0f0");
        }, 300);
    });

    // smooth scroll to inner links instead of jumps
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': ($target.offset().top)
        }, 500, 'swing', function () {
            window.location.hash = target;
        });
    });
});

