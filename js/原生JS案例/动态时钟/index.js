window.addEventListener('load', function() {
    var six = document.querySelectorAll('.six');
    var ten = document.querySelectorAll('.ten')
    this.createdom = new sheng(six, ten);
    this.createdom.newdom();
    var column = document.querySelectorAll('.column');
    new getClock(column, true);

})

//动态生成数字
class sheng {
    constructor(six, ten) {
        this.six = six;
        this.ten = ten;
        this.arr = [];
        this.arr2 = [];
    }
    newdom() {
        //动态添加元素
        for (var i = 0; i < 6; i++) {
            this.arr.push(`<div>${i}</div>`)
        }
        console.log(this.arr);
        for (var i = 0; i < this.six.length; i++) {
            this.six[i].innerHTML = this.arr.join('')
        }
        for (var i = 0; i < 10; i++) {
            this.arr2.push(`<div>${i}</div>`)
        }

        for (var i = 0; i < this.ten.length; i++) {
            this.ten[i].innerHTML = this.arr2.join('')
        }
    }
}

class getClock {
    constructor(dom, use24hour) {
        this.use24hour = use24hour
            // console.log(this.use24hour);
        this.dom = dom
            // console.log(this);
        this.start();
    }
    get() {
        //获取时间结构
        var d = new Date();
        if (this.use24hour) {
            this.hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        } else {
            this.hour = d.getHours() % 12 || 12;
            this.hour = this.hour < 10 ? '0' + this.hour : this.hour
        }
        this.minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        this.seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        this.date = String(this.hour) + String(this.minutes) + String(this.seconds);
        this.save();
    }
    save() { //储存时间
        this.dom.forEach((value, index) => {
            var n = this.date.substr(index, 1);
            var offset = n * 100;
            // value.style.marginTop = -offset + 'px'
            value.style.transform = 'translateY(' + -offset + 'px)';
        });
    }
    start() {
        //定时器调用
        var That = this
        setInterval(function() {
            That.get();
        }, 500)
    }
}