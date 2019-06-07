$(document).ready(function () {
    //--------------------------全域變數宣告--------------------------//
    var winw;
    var winh;
    var w;
    var h;
    var gamestart = false;
    var startfall1 = null;

    //--------------------------函數宣告--------------------------//

    //掉落物1
    function setFall1() {
        var fall1 = $("<div>");
        fall1.append("<img class=\"img\" src=\"./fall1.png\" />")
        fall1.addClass("fallObj");
        fall1.addClass("fallObj1");
        $("#gamebase").append(fall1);
        fall1.css({
            "height": $(".fallObj1").width() * 5 / 6,
            "left": Math.floor(Math.random() * (w - $(".fallObj1").width())),
            "top": -$(".fallObj1").width() * 5 / 6
        })
        fall1.stop().animate({ top: h + fall1.height() }, 2500, 'linear', function () { fall1.remove(); });
        /*$(".pause").on("click", function () {
            fall1.stop(true);
        })
        $(".start").on("click", function () {
            fall1.animate({ top: gamebase.height() + object.fallH1 }, 2500, function () { fall1.remove(); });
        })*/
    }

    //--------------------------函數執行--------------------------//

    //初始化
    (function  reset() {
        if ($(window).height() < $(window).width()) {
            winw = $(window).width();
            winh = $(window).height();
        } else {
            winh = $(window).width();
            winw = $(window).height();
        }
        $("#gamepage").css({
            "top": 0,
            "left": 0,
            "width": winw,
            "height": winh
        })
        w = $("#gamebase").width();
        h = $("#gamebase").height();
        if ($(window).height() >= $(window).width()) {
            $("#gamepage").css({
                "left": "100%",
                "transform": "rotate(90deg)",
                "transform-origin": "0 0"
            })
        }

        $("#catcher").css({
            "height": $("#catcher").width() * 397 / 980,
            "top": $("#gamebase").height() - $("#catcher").width() * 397 / 980
        })
    })();    

    //調整大小
    (function () {
        $(window).resize(function () {
            if ($(window).height() < $(window).width()) {
                $("#gamepage").css({
                    "top": 0,
                    "left": 0,
                    "transform": "",
                    "transform-origin": ""
                })
            } else {
                $("#gamepage").css({
                    "left": "100%",
                    "transform": "rotate(90deg)",
                    "transform-origin": "0 0"
                })
            }
            if ($(window).height() < $(window).width()) {
                winw = $(window).width();
                winh = $(window).height();
            } else {
                winh = $(window).width();
                winw = $(window).height();
            }
            $("#gamepage").css({
                "width": winw,
                "height": winh
            })
            w = $("#gamebase").width();
            h = $("#gamebase").height();

            $("#catcher").css({
                "height": $("#catcher").width() * 397 / 980,
                "top": $("#gamebase").height() - $("#catcher").width() * 397 / 980
            })
            $(".fallObj1").css({
                "height": $(".fallObj1").width() * 5 / 6
            })
        });
    })();

    //遊戲進行
    $("#gamepage").on('click', "#startbtn", function () {
        gamestart = true;
        startfall1 = setInterval(setFall1, 1000);
        $("#startbtn > img").attr("src", "./pause.png");
        $(this).attr("id", "pausebtn");
    })
    $("#gamepage").on('click', "#pausebtn", function () {
        gamestart = false;
        clearInterval(startfall1);
        $("#pausebtn > img").attr("src", "./start.png");
        $(this).attr("id", "startbtn");
    })

    $("#gamebase").mousemove(function (e) {
        if (gamestart == true) {
            sx = e.pageX - $("#gamebase").offset().left;
            $("#catcher").css({
                "left": sx - ($("#catcher").width() / 2)
            })
        }
    })
    $("#gamebase").on('touchmove', function (e) {
        if (gamestart == true) {
            var touch = e.originalEvent.targetTouches[0];
            sx = touch.pageX - $("#gamebase").offset().left;
            $("#catcher").css({
                "left": sx - ($("#catcher").width() / 2)
            })
        }
    });
});