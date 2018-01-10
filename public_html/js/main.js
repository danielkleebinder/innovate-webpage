/* 
 Created on : 22.10.2016
 Author     : Daniel Kleebinder
 
 (c) Please do not copy or redistribute this source!
 */



/**
 * The internet explorers smooth scrolling functionalltiy sometimes
 * causes "jumpy page" - effects in cooperation with bootstrap. This
 * simplistic JavaScript/JQuery function checks for the browser and,
 * in case of the IE, disables smooth scrolling!
 */
$(document).ready(function () {
    // Disable smooth scrolling on internet explorer to
    // prevent "jumpy" page effects
    if (!!document.documentMode) {
        $("html").on("mousewheel", function () {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            var wd = event.wheelDelta;
            var csp = window.pageYOffset;
            window.scrollTo(0, csp - wd);
        });
    }

    var video = document.getElementById("what-is-html5");
    video.addEventListener("loadedmetadata", function () {
        var duration = formatTime(video.duration);

        // Initialize the timer
        $("#seek-bar-time").html("0:00 / " + duration);

        $("#what-is-html5").on("timeupdate", function () {
            $("#seek-bar").val((100 / video.duration) * video.currentTime * 10.0);

            $("#seek-bar-time").html(formatTime(video.currentTime) + " / " + duration);
        });

        $("#seek-bar")
                .on("change", function () {
                    seekVideo(video.duration * ($("#seek-bar").val() / 1000));
                })
                .on("mousedown", function () {
                    pauseVideo();
                })
                .on("mouseup", function () {
                    playVideo();
                });
    });


    // Root gallery container
    var galleryContainer = document.getElementById("gallery-container");

    // Array which contains all image descriptions
    var descriptions = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum, erat nec rutrum sollicitudin, elit nibh blandit magna, ut maximus justo metus vitae nisi. Vestibulum ligula ipsum, venenatis ut blandit quis, iaculis nec lorem. Etiam.",
        "Curabitur sit amet sapien felis. Cras volutpat ante magna, ut elementum lacus mollis vitae. Maecenas neque libero, varius sit amet arcu a, faucibus venenatis leo. Ut tempus ac purus ut mattis. Pellentesque molestie viverra sapien.",
        "Nullam eget ante felis. Sed euismod auctor massa id convallis. Vestibulum molestie gravida est, eu malesuada lectus vestibulum ac. Ut suscipit placerat lacinia. Integer pellentesque pellentesque augue, eget sagittis nisl rhoncus id. Integer maximus finibus.",
        "Sed lacinia libero neque, eu ultricies nisi porttitor sit amet. Integer neque lorem, porttitor non lacus non, malesuada luctus ex. Duis luctus eros eget odio tincidunt vehicula. Phasellus aliquet euismod augue quis elementum. Nam elementum.",
        "Sed aliquet ultricies velit, id scelerisque leo rutrum non. Proin mattis volutpat purus, sed porttitor justo consequat in. Aliquam ac imperdiet neque. Fusce cursus orci vitae cursus porta. Suspendisse venenatis dui in interdum tincidunt. Proin.",
        "Nulla sed augue arcu. Nam in lorem ut mauris facilisis tristique. Proin in tempor justo, sit amet tincidunt eros. Aenean ut sapien ut lorem porttitor euismod. Quisque nec leo a risus sodales sollicitudin a nec.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum, erat nec rutrum sollicitudin, elit nibh blandit magna, ut maximus justo metus vitae nisi. Vestibulum ligula ipsum, venenatis ut blandit quis, iaculis nec lorem. Etiam.",
        "Curabitur sit amet sapien felis. Cras volutpat ante magna, ut elementum lacus mollis vitae. Maecenas neque libero, varius sit amet arcu a, faucibus venenatis leo. Ut tempus ac purus ut mattis. Pellentesque molestie viverra sapien.",
        "Nullam eget ante felis. Sed euismod auctor massa id convallis. Vestibulum molestie gravida est, eu malesuada lectus vestibulum ac. Ut suscipit placerat lacinia. Integer pellentesque pellentesque augue, eget sagittis nisl rhoncus id. Integer maximus finibus.",
        "Sed lacinia libero neque, eu ultricies nisi porttitor sit amet. Integer neque lorem, porttitor non lacus non, malesuada luctus ex. Duis luctus eros eget odio tincidunt vehicula. Phasellus aliquet euismod augue quis elementum. Nam elementum.",
        "Sed aliquet ultricies velit, id scelerisque leo rutrum non. Proin mattis volutpat purus, sed porttitor justo consequat in. Aliquam ac imperdiet neque. Fusce cursus orci vitae cursus porta. Suspendisse venenatis dui in interdum tincidunt. Proin.",
        "Nulla sed augue arcu. Nam in lorem ut mauris facilisis tristique. Proin in tempor justo, sit amet tincidunt eros. Aenean ut sapien ut lorem porttitor euismod. Quisque nec leo a risus sodales sollicitudin a nec."
    ];

    // Create the gallery dynamically
    for (var i = 0; i < 12; i++) {
        var src = "res/gallery/" + (i + 1) + ".jpg";

        // Create root reference node
        var root = document.createElement("a");
        root.setAttribute("class", "gallery-img col-xs-6 col-sm-4 col-md-3 col-lg-3");
        root.setAttribute("rel", "gallery");
        root.setAttribute("href", src);
        root.setAttribute("title", descriptions[i]);

        // Create container
        var container = document.createElement("div");
        container.setAttribute("class", "gallery-img-container");

        // Create image
        var img = document.createElement("img");
        img.setAttribute("class", "img-responsive");
        img.setAttribute("src", src);
        img.setAttribute("alt", "Cannot load image");

        // Put everything together
        container.appendChild(img);
        root.appendChild(container);
        galleryContainer.appendChild(root);
    }

    // Initialize FancyBox
    $(".gallery-img").fancybox({
        openEffect: "elastic",
        closeEffect: "elastic",
        helpers: {
            title: {
                type: "over"
            }
        }
    });

    // Enable the "scroll to top" function
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#scrolltop").fadeIn();
        } else {
            $("#scrolltop").fadeOut();
        }
    });
    $("#scrolltop").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo");
        return false;
    });
});

function formatTime(seconds) {
    seconds = parseInt(seconds);

    var result = "";
    result += Math.floor(seconds / 60);
    result += ":";

    var secs = Math.round(seconds % 60);
    if (secs < 10) {
        result += "0" + secs;
    } else {
        result += secs;
    }

    return result;
}

function seekVideo(value) {
    document.getElementById("what-is-html5").currentTime = value;
}

function stepVideoForward() {
    var video = document.getElementById("what-is-html5");
    video.currentTime = video.duration;
    pauseVideo();
}

function playPauseVideo() {
    var video = document.getElementById("what-is-html5");
    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
}

function pauseVideo() {
    document.getElementById("what-is-html5").pause();
    $("#play-pause").switchClass("glyphicon-pause", "glyphicon-play");
}

function playVideo() {
    document.getElementById("what-is-html5").play();
    $("#play-pause").switchClass("glyphicon-play", "glyphicon-pause");
}

function muteUnmuteVideo() {
    var video = document.getElementById("what-is-html5");
    if (video.muted) {
        unmuteVideo();
    } else {
        muteVideo();
    }
}

function muteVideo() {
    document.getElementById("what-is-html5").muted = true;
    $("#mute-unmute").switchClass("glyphicon-volume-up", "glyphicon-volume-off");
}

function unmuteVideo() {
    document.getElementById("what-is-html5").muted = false;
    $("#mute-unmute").switchClass("glyphicon-volume-off", "glyphicon-volume-up");
}

function fullscreenVideo() {
    var video = document.getElementById("what-is-html5");
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

$(function () {
    $("a.page-scroll").bind("click", function (evt) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, "easeInOutExpo");
        evt.preventDefault();
    });
});