window.addEventListener('load',function(){
   var arrow_l = document.querySelector('.left-btn ');
   var arrow_r = document.querySelector('.right-btn');
   var focus = document.querySelector('.top-img');
   var focusWidth = focus.offsetWidth;
   focus.addEventListener('mouseenter',function(){
       arrow_l.style.display = 'block';
       arrow_r.style.display = 'block';
       clearInterval(timer);  //清除timer定时器并让timer等于null
       timre = null;
   });
   focus.addEventListener('mouseleave',function(){
        arrow_r.style.display = 'none';
        arrow_l.style.display = 'none';
        timer = setInterval(function(){
            arrow_r.click();
        },3000);
   });
    //-------------------------------------------------
    //鼠标移动隐藏显示箭头
    var lbt = document.querySelector('.lbt');
    var btn_ul = document.querySelector('.btn-ul');
    for(var i = 0; i < lbt.children.length ; i++){
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = 'javascript:;'
        a.style.color = 'white';
        btn_ul.appendChild(li);
        a.setAttribute('index',i);//设置自定义属性
        li.appendChild(a);
        a.innerHTML = '●'; 
    //-------------------------------------------------
    //自动生成轮播图小圆点

       var alla = btn_ul.querySelectorAll('a');
       alla[0].style.color = 'red';
    //    alla[i].addEventListener('mouseenter',function(){
    //    this.style.color = 'red';
    //});
    //    alla[i].addEventListener('mouseleave',function(){
    //    this.style.color = 'white';
    //});
        //------------------------------------------
        //普通设置a标签样式
        alla[i].addEventListener('click',function(){
            for(var i = 0; i < btn_ul.children.length;i++){
                alla[i].style.color = 'white';  //排他思想设置
            }       
            this.style.color = 'red';
            var index = this.getAttribute('index');//声明调用
            animate(lbt , - index * focusWidth);
            num = index;
            circle = index;  //解决小圆点与图片乱点击不同步
            
        });
    }   

    function animate(obj,target,callback){
        clearInterval(obj.timer);
        
        obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft)/10; //放在函数内是每15毫秒运行函数内代码一次
        step = step > 0 ? Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            if(callback){
                callback();   //回调函数放到清除定时器内
                //可以写成 callback && callback();
            }
        }
        obj.style.left = obj.offsetLeft + step +'px';
        },15)
    }
    //----------------------------------------------------
    //动画函数

    var cloneli = lbt.children[0].cloneNode(true);
    lbt.appendChild(cloneli);
    //克隆并添加节点
    var circle = 0; //小点用
    var flag = true;
    var num = 0;
    arrow_r.addEventListener('click',function(){
        if(flag){//--------------------  节流阀  函数执行最后再使用回调函数
            flag = false;//------------
            if(num == lbt.children.length - 1){
                num = 0;
                lbt.style.left = 0;
                //立刻跳到第一张图然后再去执行封装函数的动画
            }
            num++;
            animate(lbt, -num * focusWidth,function() {
                flag = true;  //回调函数
            });
            //----------------------------------------------------
            //无缝滚动 右箭头
            circle++;
            for(var i = 0 ;i < alla.length; i++){
                alla[i].style.color = 'white';
            }
            if(circle == 4){
                circle = 0;
            }
            alla[circle].style.color = 'red';
            //---------------------------------------------
            //右侧按钮轮播图小点移动
        }
    });
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0){
                num = lbt.children.length -1;
                //立刻跳到最后一张图然后再去执行封装函数的动画
                lbt.style.left = (-num) * focusWidth + 'px';
            }
            num --;
            animate(lbt, -num * focusWidth,function() {
                flag = true;
            });
            //-----------------------------------------------------
            //左侧箭头
            circle --;
            for(var i = 0;i < alla.length; i++){
                alla[i].style.color = 'white'; //排他思想清除
            }
                if(circle < 0){
                    circle = alla.length - 1;
                }
                alla[circle].style.color = 'red';
        }
    });
        //---------------------------------------------
        //左侧按钮轮播图小点移动


        var timer = setInterval(function(){
            arrow_r.click();
        },3000);
        //每隔三秒自动触发鼠标点击右侧按钮
});