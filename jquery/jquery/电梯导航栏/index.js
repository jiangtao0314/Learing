$(function(){
    nav();
    var flag = true;
    function nav(){
        if($(document).scrollTop() >= $(".diva").offset().top){
            $("nav").fadeIn();
        }else{
            $("nav").fadeOut();
        }//显示隐藏nav导航栏封装函数
    }
    $(window).scroll(function(){
        nav();
        //显示隐藏nav导航栏
       if(flag){            //节流阀
        $("article div").each(function(i,ele){ //遍历四个div
            if($(document).scrollTop() >= $(ele).offset().top){
                $("ul li").eq(i).addClass("current").siblings().removeClass();
                //如果卷动距离大于 元素距离顶部位置  让当前索引号i的li添加current属性 
            }
         })
       }
    })

    $("ul li").click(function(){
        flag = false;             //节流阀
        $(this).addClass("current");
        $(this).siblings().removeClass("current"); //排他思想
        if($(this).index() != 4){ //如果点击的li的索引号不等于4
            var current = $("article div").eq( $(this).index()).offset().top;
            //设置一个变量 存储点击索引号对应的盒子被卷去的距离
            $("body,html").stop().animate({
                scrollTop : current,
                //让body和html页面同时进行动画 卷去current距离
            },function(){
                flag = true;  //节流阀
            })
        }else{
            $("ul li").removeClass("current");
            $("body,html").stop().animate({
                scrollTop : 0,
            })
        }
    })


})