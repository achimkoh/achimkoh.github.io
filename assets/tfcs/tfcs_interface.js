// change layout based on amount of Y scroll
var startProductBarPos=-1;

function moveThings() {
    if(window.innerWidth > 960) {
        // var nav = document.getElementById('video-navigation');
        var con = document.getElementById('video-frame');
        // var phonemesO = document.getElementById('gotophonemes-original');
        // var phonemes = document.getElementById('gotophonemes');
        var recbuttons = document.getElementsByClassName('recorder');
        // var entryContent = document.getElementsByClassName('entry-content')[0];
        var clusters = document.getElementById('clusters');
        var clustersTop = findPosY(clusters);
        var navtop;
        var contop;
        var explanation = document.getElementById('phoneme-explanation');
        var explanationVideo = document.getElementById('phoneme-explanation-video');
        if(window.innerWidth > 1242){
            // navtop = '75px';
            contop = 125;
        }else{
            // navtop = 0;
            contop = 75;
        }

        if(startProductBarPos<0)startProductBarPos=findPosY(nav);
        if(pageYOffset>startProductBarPos){
            $('#video-navigation').addClass('minimized');
            $('#video-frame').addClass('minimized');
            // nav.style.position='fixed';
            // nav.style.top=navtop;
            // nav.style.display='flex';
            // nav.style.width='100%';
            // nav.style.height='2em';
            // nav.style.lineHeight='1em';
            // gotovideo.style.display='inherit';
            $('#gotophonemes').removeClass('display-none');
            $('#gotophonemes-original').addClass('display-none');
            // phonemes.style.display='inherit';
            // phonemesO.style.display='none';
            // con.style.position='fixed';
            con.style.top=contop+'px';
            if(pageYOffset>clustersTop){
                con.style.top=(contop-pageYOffset+clustersTop)+'px';
            }
            // con.style.right='5px';
            // con.style.width='30%';
            $('.entry-content').addClass('shifted');
            // entryContent.style.position='relative';
            // entryContent.style.left='-20%';
            if(window.innerWidth < 1100) {
                // con.style.width='20%';
                // entryContent.style.left='-12%';
            }
            explanationVideo.style.display='initial';
            explanation.style.visibility='hidden';
            for (var i=1; i < recbuttons.length; i++) recbuttons[i].style.margin='0 5px';
        }else{
            $('#video-navigation').removeClass('minimized');
            $('#video-frame').removeClass('minimized');
            $('#gotophonemes').addClass('display-none');
            $('#gotophonemes-original').removeClass('display-none');
            $('.entry-content').removeClass('shifted');
            // nav.style.position='relative';
            // nav.style.top=0;
            // nav.style.display='inline-block';
            // nav.style.width='30%';
            // nav.style.height='inherit';
            // nav.style.lineHeight='inherit';
            // gotovideo.style.display='none';
            // phonemes.style.display='none';
            // phonemesO.style.display='inherit';
            // con.style.position='relative';
            // con.style.top=0;
            // con.style.right=0;
            // con.style.width='70%';
            entryContent.style.position='inherit';
            entryContent.style.left=0;
            explanationVideo.style.display='none';
            explanation.style.visibility='initial';
            for (var i=1; i < recbuttons.length; i++) recbuttons[i].style.margin='25px 5px';
        }
    }else{
        var vid = document.getElementById('video-frame');
        var navmobile = document.getElementById('video-navigation-mobile');
        if(pageYOffset>vid.offsetTop){
            navmobile.style.display='flex';
        }else{
            navmobile.style.display='none';
        }
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
