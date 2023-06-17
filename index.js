var titleTopLine = document.getElementById("title");
var titleH1 = document.getElementById("titleH1");
var titleCard = document.getElementById("titleCard");
titleTopLine.style.setProperty("--scrollbar-left", "0");
titleTopLine.style.setProperty("--scrollbar-right", "0");
var scrolledDownCompletely = false;

var step = 0;

$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        if(step == 0) {
            titleH1.style.setProperty("font-size", "100px");
            scrolledDownCompletely = false;
            titleTopLine.style.setProperty("--scrollbar-left", "0px");
            titleTopLine.style.setProperty("--scrollbar-right", "0px");
        }
        if(step > 0 && !scrolledDownCompletely){
            titleTopLine.style.setProperty("--scrollbar-left", window.scrollY/2 + "px");
            titleTopLine.style.setProperty("--scrollbar-right", window.scrollY/2 + "px");
        } 
    }
    else {
        if (!scrolledDownCompletely) {
            console.log(window.scrollY);
            titleTopLine.style.setProperty("--scrollbar-left", 50 + window.scrollY + "px");
            titleTopLine.style.setProperty("--scrollbar-right", 50 + window.scrollY + "px");
        }
        if(window.scrollY > 140 && !scrolledDownCompletely){
            for (let i = 0; i < 20000; i++) {
                setTimeout(() => {
                    titleTopLine.style.setProperty("--scrollbar-left", (i/10) + "px");
                    titleTopLine.style.setProperty("--scrollbar-right", (i/10) + "px");
                },1 );  
            }    
            titleCard.style.setProperty("transform", "translateY(15vh)");

            titleH1.style.setProperty("font-size", "30px");
            scrolledDownCompletely = true;
        }
    }
});
