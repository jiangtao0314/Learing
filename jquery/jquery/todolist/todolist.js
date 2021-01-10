$(function(){
    //每次打开页面看内部有没有保存的数据
    load();
    $(".inputtext").on("keydown",function(event){
        //给表单创建一个按键事件
        if(event.keyCode === 13){
            if($(this).val() === ""){
                alert("请输入内容")
            }else{
                //如果按了回车要读取本地存储的数据
                var local = getDate();
                local.push({ title: $(this).val(), done: false });
                //把用户输入的字放到todolist数组最后面，用对象储存
                saveDate(local);
                load();
                $(this).val("");
            }  
        }
    })

    $("ol,ul").on("click","a",function(){
        var date = getDate();  //先读取数据
        var index = $(this).attr("id") //创建一个变量获取当前点击的ID索引号
        date.splice(index,1); //从index开始删除 删除一位
        saveDate(date);     //存储数据
        load();         //重新加载数据
    });//删除


    function getDate(){
        var data = localStorage.getItem("todolist");
        if (data !== null){   //如果存的字符串不是空的就把他转换为数组返回
            return JSON.parse(data);
        }else{
            return [];
        }
        //读取数据函数  先获取todolist现有的元素，如果现有的元素不等于空 就从字符串转换为对象
        //然后返回
    }

    function saveDate(date){
        localStorage.setItem("todolist",JSON.stringify(date));
    }
    //存储数据函数

    function load(){
       
        var date = getDate(); //读取数据
        $("ol,ul").empty(); //每次遍历之前清空OL 防止多次遍历
        var todoCount = 0;
        var doneCount = 0; //创建两个变量
        $(date).each(function(i,n){ //遍历对象 i是索引号  n是遍历的所有对象
            if(n.done){
                $("ul").prepend(" <li> <input type='checkbox' checked = 'checked'> <p>"+ n.title +"</p> <a href='javascript:;' id = "+i+">X</a></li> ")
                //如果是true就写到下方UL里
                doneCount++; 
            }else{ 
                $("ol").prepend(" <li> <input type='checkbox'> <p>"+ n.title +"</p> <a href='javascript:;' id = "+i+">X</a></li> ")
                //不是true就写到上方ol
                todoCount++
            }
        })
        $(".todo span").text(todoCount); 
        $(".done span").text(doneCount);  //赋值要放到遍历之外
    }//重新加载页面


    $("ul,ol").on("click","input",function(){
        var date = getDate();
        var index = $(this).siblings("a").attr("id"); //获取点击input的兄弟a的ID索引号
        date[index].done = $(this).prop("checked");//让date里面第Index个的done等于这个input选中状态
        saveDate(date);
        load();
    })
    //已完成和未完成事项


})