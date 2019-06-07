$(document).ready(function () {
    //--------------------------全域變數宣告--------------------------//
    var winw;
    var winh;
    var w;
    var h;
    var gamestart = false;
    var score = 0;
    var time = 10;
    var fallDir = new Array;
    var playerDir = new Array;
    var startfall1 = null;
    var startcheck = null;

    //--------------------------函數宣告--------------------------//

    //掉落物1
    function setFall1() {
        var fall1 = $("<div>");
        fall1.append("<img class=\"img\" src=\"./fall1.png\" />")
        fall1.addClass("fallObj");
        fall1.addClass("fallObj1");
        $("#gamebase").append(fall1);
        /*fall1.css({
            "width": "10%"
        })*/
        //console.log(fall1.width());
        //console.log($(".fallObj1").width() * 5 / 6);
        fall1.css({
            "height": fall1.width() * 5 / 6,
            "left": Math.floor(Math.random() * (w - $(".fallObj1").width())),
            "top": -fall1.width() * 5 / 6
        })
        fall1.stop().animate({ top: h + fall1.height() }, 2500, 'linear', function () { fall1.remove(); });
        $("#gamepage").on('click', "#startbtn", function () {
            fall1.animate({ top: h + fall1.height() * 2 + parseFloat(fall1.css("top")) }, 2500, 'linear', function () { fall1.remove(); });
        })
        $("#gamepage").on('click', "#pausebtn", function () {
            fall1.stop(true);
        })
    }

    //碰撞偵測
    function touch() {
        $.each($(".fallObj"), function () {
            /*fallDir[0] = $(this).position().top;  //上
            fallDir[1] = $(this).position().left;  //左
            fallDir[2] = $(this).position().top + $(this).height();  //下
            fallDir[3] = $(this).position().left + $(this).width();  //右

            playerDir[0] = $("#catcher").position().top;
            playerDir[1] = $("#catcher").position().left;
            playerDir[2] = $("#catcher").position().top + $("#catcher").height();
            playerDir[3] = $("#catcher").position().left + $("#catcher").width();*/

            fallDir[0] = parseFloat($(this).css("top"));  //上
            fallDir[1] = parseFloat($(this).css("left"));  //左
            fallDir[2] = parseFloat($(this).css("top")) + $(this).height();  //下
            fallDir[3] = parseFloat($(this).css("left")) + $(this).width();  //右

            playerDir[0] = parseFloat($("#catcher").css("top"));
            playerDir[1] = parseFloat($("#catcher").css("left"));
            playerDir[2] = parseFloat($("#catcher").css("top")) + $("#catcher").height();
            playerDir[3] = parseFloat($("#catcher").css("left")) + $("#catcher").width();

            //console.log(playerDir[0]);

            if (playerDir[3] > fallDir[1] && playerDir[1] < fallDir[1] || playerDir[1] > fallDir[1] && playerDir[3] < fallDir[3] || playerDir[1] < fallDir[3] && playerDir[3] > fallDir[3]) {
                if (playerDir[0] < fallDir[2] && playerDir[2] > fallDir[2] || playerDir[0] < fallDir[0] && playerDir[2] > fallDir[0] || playerDir[2] < fallDir[2] && playerDir[0] > fallDir[0]) {
                    $(this).removeClass("fallObj");
                    $(this).addClass("catchObj");
                    $(this).stop().animate({ top: playerDir[0], left: playerDir[1] + $("#catcher").width() / 2, width: 0, height: 0 }, 100, function () { $(this).remove(); });
                    score = score + 1;
                    /*$(".score > span").html(score);*/
                }
            }
        });
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
            "top": h - $("#catcher").width() * 397 / 980,
            "left": "40%"
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
                "top": h - $("#catcher").width() * 397 / 980
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
        startcheck = setInterval(touch, 0);
        $("#startbtn > img").attr("src", "./pause.png");
        $(this).attr("id", "pausebtn");
    })
    $("#gamepage").on('click', "#pausebtn", function () {
        gamestart = false;
        clearInterval(startfall1);
        clearInterval(startcheck);
        $("#pausebtn > img").attr("src", "./start.png");
        $(this).attr("id", "startbtn");
    })

    $("#gamebase").mousemove(function (event) {
        if (gamestart == true) {
            sx = event.pageX - $("#gamebase").offset().left;
            $("#catcher").css({
                "left": sx - ($("#catcher").width() / 2)
            })
        }
    })
    $("#gamebase").on('touchmove', function (event) {
        event.preventDefault();
        if (gamestart == true) {
            var touch = event.originalEvent.targetTouches[0];
            sx = touch.pageX - $("#gamebase").offset().left;
            if (sx - ($("#catcher").width() / 2) >= -($("#catcher").width() / 2) && sx - ($("#catcher").width() / 2) <= w - ($("#catcher").width() / 2)) {
                $("#catcher").css({
                    "left": sx - ($("#catcher").width() / 2)
                })
            }           
        }
    })
});