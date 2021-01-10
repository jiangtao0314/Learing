window.addEventListener('load',function(){

    //自动播放功能
    var focus = document.querySelector('.focus')
    var ul = focus.children[0];
    var focusWidth = focus.offsetWidth;
    var index = 0;
    var flag = false;
    var timer = setInterval(function(){
        index++;
       imgmove(index,focusWidth);
        ul.style.transition = 'all .3s'
    },2000)
    //无缝滚动
   ul.addEventListener('transitionend',function(){
       if(index >= 3){
           console.log(1);
            index = 0;
            ul.style.transition = 'none'
            imgmove(index,focusWidth);
       }else if(index < 0){
            index = 2;
            ul.style.transition = 'none'
            imgmove(index,focusWidth);
       }
        //小圆点
        var lis = document.querySelectorAll('.dot li')
        var current = document.querySelector('.current');
        current.classList.remove('current');
        lis[index].classList.add('current');
   }) 

        //动画移动重复代码函数
        function imgmove(index,focusWidth){
            var translatex =  -index * focusWidth +'px';
            ul.style.transform = 'translateX('+ translatex +')'
        }

        //拖动轮播图
        var startX = 0;
        var moveX = 0;
        ul.addEventListener('touchstart',function(e){
            startX = e.targetTouches[0].pageX;
            clearInterval(timer);
        })
        ul.addEventListener('touchmove',function(e){
            moveX = e.targetTouches[0].pageX - startX;
            var translatex =  -index * focusWidth + moveX +'px';
            ul.style.transform = 'translateX('+ translatex +')'
            flag = true;        //防止多计算
            e.preventDefault();  //取消默认行为
        })
        ul.addEventListener('touchend',function(e){
            if(flag){
                    //手指移动距离大于50px就播放上一张或者下一张
                if(Math.abs(moveX) > 50){ 
                    if(moveX < 0){
                        //手指右滑动 结果为负值 使用初始距离减去移动后距离 200-300
                        index++;
                    }else{
                        //手指左滑动 结果为正值 使用初始距离减去移动后距离 300-200
                        index--;
                    }
                    ul.style.transition = 'all .3s'
                    imgmove(index,focusWidth);
                }else{
                    //小于50像素就回弹
                    ul.style.transition = 'all .3s'
                    imgmove(index,focusWidth);
                }
                clearInterval(timer);
                timer = setInterval(function(){
                    index++;
                   imgmove(index,focusWidth);
                    ul.style.transition = 'all .3s'
                },2000)
                flag = false;
            }
            
        })
}) 