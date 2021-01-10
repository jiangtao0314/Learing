window.addEventListener('load', function() {
    var num = 4;
    var that;
    class Tab {
        constructor(id) {
            //禁止选中文字  
            that = this;
            this.main = document.querySelector(id); //获取所有元素
            this.btn = this.main.querySelector('.nav a');
            this.ul = this.main.querySelector('.nav ul:first-child')
                //获取nav里面第一个ul CSS3选择器
            this.texts = this.main.querySelector('.texts ul');
            this.init(); //调用init绑定事件函数
        }

        //---------------------------------------------------------------------------
        toggleTab() {
                that.clearClass(); //排他思想 清除类名 需使用That来调用
                this.className = 'liactive'; //this指向lis[i]
                that.tlis[this.index].className = 'conactive';
                //因上 所以用that.tlis第[lis索引号]的类名是conactive
            } //切换/显示隐藏函数

        //---------------------------------------------------------------------------
        init() {
                this.updataNode(); //获取所有li
                this.btn.addEventListener('click', this.addClass)
                for (var i = 0; i < this.lis.length; i++) {
                    this.lis[i].index = i; //给this.lis设置索引号
                    this.lis[i].addEventListener('click', this.toggleTab);
                    this.remove[i].addEventListener('click', this.removeTab);
                    //点击X调用removeTab函数
                }
                for (var j = 0; j < this.liss.length; j++) {
                    this.liss[j].addEventListener('dblclick', this.editText);
                } //遍历添加双击绑定事件
            } //绑定事件函数
            //---------------------------------------------------------------------------

        updataNode() {
                this.lis = this.main.querySelectorAll('.nav li'); //获取nav li
                this.tlis = this.main.querySelectorAll('.texts li');
                this.remove = this.main.querySelectorAll('.nav span'); //获取X按钮
                this.liss = this.main.querySelectorAll('li'); //获取所有li
            } //获取所有li函数  //this指向init的this 也就是constructor
            //---------------------------------------------------------------------------
        clearClass() {
                for (var i = 0; i < this.lis.length; i++) {
                    this.lis[i].className = '';
                    this.tlis[i].className = '';
                    //that调用了ClearClass 所以这可以使用this 指向为that
                }
            } //清除类名  排他思想

        //---------------------------------------------------------------------------

        addClass() {
                that.clearClass();
                var li = '<li class="liactive">' + num + '<span>x</span></li>';
                var lis = '<li class="conactive">' + num + '</li>'
                that.ul.insertAdjacentHTML('beforeend', li);
                //把li添加到ul的最后面  this指向的是btn 所以用that
                that.texts.insertAdjacentHTML('beforeend', lis);
                //把li添加到texts的ul最后
                num++;
                that.init(); //每次添加重新调用绑定事件
            } //添加li函数
            //---------------------------------------------------------------------------

        removeTab(e) {
                e.stopPropagation(); //阻止冒泡  点击X不让li点击事件出发
                var index = this.parentNode.index; //获取x父亲li的index索引号
                that.lis[index].remove(); //this指向remove[i] 也就是x号
                that.tlis[index].remove(); //remove()方法 删除此元素
                if (document.querySelector('.liactive')) return;
                index--; //让每次删除事件之后点击前一个li
                that.lis[index] && that.lis[index].click();
                //前面有lis[index]个  才会执行后面手动调用点击事件的代码
            } //删除事件

        editText() {
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                //禁止选中文字
                if (this.innerText == "x") {
                    //执行过一次 1变成input的value x会变成innertext 所以加判断条件看是否执行过
                    var str = this.children[0].value //获取文本框的value
                } else {
                    var str = this.innerText; //获取双击框的内容
                }
                var sstr = str.charAt(0); //获取字符串中第0个数值
                this.innerHTML = '<input type = "text"/><span>x</span>'; //this指向双击的li
                //把这个双击的Li更改成文本框
                var input = this.children[0];
                input.value = sstr;
                input.select(); //让文字处于选中状态
                input.addEventListener('blur', function() {
                        this.parentNode.innerText = this.value;
                    }) //鼠标离开input把表单的数值赋值给他的父亲

                input.addEventListener('keyup', function(e) {
                    if (e.keyCode === 13) {
                        this.parentNode.innerText = this.value;
                    } //按回车
                })

                that.updataNode();
                that.init();
                //因为重新添加了span里面的x 所以需要重新绑定和添加事件


            } //修改文本


    }

    new Tab('article');

});