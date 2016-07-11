$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

            var paddingtop = 0;
            if(window.innerWidth > 1242) paddingtop = 75;

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': ($target.offset().top - paddingtop)
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});
    var flashobject = document.getElementById('recorderApp');
    flashobject.style.position = "fixed";

});

var startProductBarPos=-1;

window.onscroll=function(){
    if(window.innerWidth > 960) {
        var nav = document.getElementById('video-navigation');
        var con = document.getElementById('video-frame');
        var gotovideo = document.getElementById('gotovideo');
        var phonemesO = document.getElementById('gotophonemes-original');
        var phonemes = document.getElementById('gotophonemes');
        var recbuttons = document.getElementsByClassName('recorder');
        var navtop;
        var contop;
        if(window.innerWidth > 1242){
            navtop = '75px';
            contop = '125px';
        }else{
            navtop = 0;
            contop = '75px';
        }

        if(startProductBarPos<0)startProductBarPos=findPosY(nav);
        if(pageYOffset>startProductBarPos){
            nav.style.position='fixed';
            nav.style.top=navtop;
            nav.style.display='flex';
            nav.style.width='100%';
            nav.style.height='2em';
            nav.style.lineHeight='1em';
            gotovideo.style.display='inherit';
            phonemes.style.display='inherit';
            phonemesO.style.display='none';
            con.style.position='fixed';
            con.style.top=contop;
            con.style.right='50px';
            con.style.width='10%';
            for (var i =0; i < recbuttons.length; i++) recbuttons[i].style.margin='0 5px';
        }else{
            nav.style.position='relative';
            nav.style.top=0;
            nav.style.display='inline-block';
            nav.style.width='30%';
            nav.style.height='inherit';
            nav.style.lineHeight='inherit';
            gotovideo.style.display='none';
            phonemes.style.display='none';
            phonemesO.style.display='inherit';
            con.style.position='relative';
            con.style.top=0;
            con.style.right=0;
            con.style.width='70%';
            for (var i =0; i < recbuttons.length; i++) recbuttons[i].style.margin='25px 5px';
        }
    }else{
        var vid = document.getElementById('video-frame');
        var nav = document.getElementById('video-navigation-mobile');
        if(startProductBarPos<0)startProductBarPos=findPosY(vid);
        if(pageYOffset>startProductBarPos){
            nav.style.display='inherit';
        }else{
            nav.style.display='none';
        }
    }

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
