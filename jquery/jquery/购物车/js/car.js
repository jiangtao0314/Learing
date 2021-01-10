$(function(){
    getSum()
    $(".checkall").change(function(){
        //全选按钮发生改变  所有按钮等于全选按钮的状态
        $(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"))
        //--------------------------------------------------------
        if($(this).prop("checked")){
            $(".cart-item").addClass("item-bgc");
        }else{
            $(".cart-item").removeClass("item-bgc");
        }
    })

    $(".j-checkbox").change(function(){
        if($(".j-checkbox:checked").length == $(".j-checkbox").length){
            //单选按钮发生改变时 如果勾选的按钮等于全部单选按钮 全选按钮勾选
            $(".checkall").prop("checked",true);
        }else{
            $(".checkall").prop("checked",false);
        }
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("item-bgc");
        }else{
            $(this).parents(".cart-item").removeClass("item-bgc");
        }
    })
    //-------------------------------------------------------------------
    //全选模块

    $(".increment").click(function(){

        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        //----------------------------------------------------------------------
        //商品数量模块 

        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+(p * n).toFixed(2));

        //----------------------------------------------------------------------
        //商品价格模块
        getSum()
    })
    //设置一个变量 每点击加号变量++并且把值赋值给value

    $(".decrement").click(function(){
        var n = $(this).siblings(".itxt").val();
        if(n == 1){
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        //设置一个变量 每点减号变量--并且把值赋值给value
        //如果等于1 就返回false让下面代码不执行
        //----------------------------------------------------------------------
        //商品数量模块 

        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+(p * n).toFixed(2));
        //----------------------------------------------------------------------
        //商品价格模块
        getSum()
    })
    
    $(".itxt").change(function(){
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var n = $(this).val();
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+(p*n).toFixed(2));
        getSum()
    })
    //直接修改表单价格模块

    function getSum(){
        var money = 0;
        var amount = 0;
        $(".itxt").each(function(i,domEle){
            amount += parseInt($(domEle).val());
        })
        $(".amount-sum em").html(amount);
        //-----------------------------------------------------
        //修改商品数量


        // $(".p-sum").each(function(i,domEle){
        //     money = money + parseFloat( $(domEle).text().substr(1));
        // })
        // $(".price-sum em").text("￥"+ money.toFixed(2))
        //---------------------------------------------------------
        //老师教的
        $(".p-sum").each(function(i,domEle){
            var b = $(domEle).text();
            b = b.substr(1);
            money = parseFloat(b) + money;
        })
        $(".price-sum em").text("￥"+ money.toFixed(2))
        //自己思路
        //修改商品总价


    }

    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum()
    })  
    //-----------------------------------------
    //商品行内删除商品



   //var cart = document.querySelector(".cart-item-list")
   //var removes = document.querySelector(".remove-batch")
   //var jcheckbox = document.querySelectorAll(".j-checkbox");
   //var f = document.querySelectorAll(".cart-item");
   //removes.addEventListener('click',function(){
   //    for(var i = 0; i < jcheckbox.length ; i++){
   //        if(jcheckbox[i].checked){
   //            console.log(f[i]);
   //           cart.removeChild(f[i]);
   //           jcheckbox[i].checked = false;
   //        }
   //    }
   //})
    //---------------------------------------------------------
    //原生JS

    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    //删除选中商品

    $(".clear-all").click(function(){
        $(".cart-item-list").remove();
        getSum()
    })
    //清除购物车
    //-------------------------------------------------------------


})