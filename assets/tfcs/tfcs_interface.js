// change layout based on amount of Y scroll
var startProductBarPos=-1;

function moveThings() {
    var vid = document.getElementById('video-frame');

    if(window.innerWidth > 960) {
        var nav = document.getElementById('video-navigation');
        var recbuttons = document.getElementsByClassName('recorder');
        var consonants = document.getElementById('consonants');
        var consonantsTop = findPosY(consonants);

        var contop;
        if(window.innerWidth > 1242){
            contop = 125;
        }else{
            contop = 75;
        }

        if(startProductBarPos<0)startProductBarPos=findPosY(nav);
        if(pageYOffset>startProductBarPos){
            $('#video-navigation').addClass('minimized');
            $('#video-frame').addClass('minimized');
            $('#video').addClass('minimized');
            $('#gotophonemes').removeClass('display-none');
            $('#gotophonemes-original').addClass('display-none');
            vid.style.top=contop+'px';
            if(pageYOffset>consonantsTop){
                vid.style.top=(contop-pageYOffset+consonantsTop)+'px';
            }
            $('.entry-content').addClass('shifted');
            $('#phoneme-explanation').addClass('visibility-hidden');
            $('#video-phoneme-explanation').removeClass('display-none');
            $('button.recorder').addClass('minimized');
            // for (var i=1; i < recbuttons.length; i++) recbuttons[i].style.margin='0 5px';
        }else{
            $('#video-navigation').removeClass('minimized');
            $('#video-frame').removeClass('minimized');
            $('#video').removeClass('minimized');
            $('#gotophonemes').addClass('display-none');
            $('#gotophonemes-original').removeClass('display-none');
            $('.entry-content').removeClass('shifted');

            $('#phoneme-explanation').removeClass('visibility-hidden');
            $('#video-phoneme-explanation').addClass('display-none');
            vid.style.top=0;
            $('button.recorder').removeClass('minimized');
            // for (var i=1; i < recbuttons.length; i++) recbuttons[i].style.margin='25px 5px';
        }
    }else{
        if(pageYOffset>vid.offsetTop){
            $('.video-navigation-mobile').addClass('minimized');
        }else{
            $('.video-navigation-mobile').removeClass('minimized');
        }

        $('#video-navigation').removeClass('minimized');
        $('#video-frame').removeClass('minimized');
        $('#video').removeClass('minimized');
        $('#gotophonemes').addClass('display-none');
        $('#gotophonemes-original').removeClass('display-none');
        $('.entry-content').removeClass('shifted');
        $('#phoneme-explanation').removeClass('visibility-hidden');
        $('#video-phoneme-explanation').addClass('display-none');
        $('button.recorder').removeClass('minimized');
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
