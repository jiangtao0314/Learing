window.addEventListener('load', function() {
    var error = document.querySelector('.error');
    var refresh = document.querySelector('.refresh')
    var inputbox = document.querySelector('.inputbox input')
    var inputTrue = document.querySelector('.inputbox span')
    var myCanvas = document.querySelector('#myCanvas');
    var submit = document.querySelector('.submit')

    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    submit.disabled = 'true'

    function createCanvas() {
        var canvasStr = '';
        for (var i = 0; i < 6; i++) {
            //取随机数
            var a = arr[Math.floor(Math.random() * arr.length)]
            canvasStr += a;
        }
        var ctx = myCanvas.getContext('2d'); //画笔
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.textAlign = 'center'
        ctx.fillStyle = "#ccc"
        ctx.font = '46px Roboto Slab'
        ctx.setTransform(1, -0.12, 0.3, 1, 0, 12);
        ctx.fillText(canvasStr, myCanvas.width / 2, 60)
        return canvasStr
    }
    var ii = createCanvas();
    console.log(ii);

    inputbox.addEventListener('blur', function() {
        var upper = ii.toUpperCase();
        var lower = ii.toLowerCase();
        if (inputbox.value == upper || inputbox.value == lower) {
            inputTrue.style.display = 'inline';
            inputTrue.innerHTML = '√'
            inputTrue.style.color = 'rgb(65, 238, 74)'
            submit.removeAttribute('disabled');
        } else if (inputbox.value.trim() == '') {
            error.innerHTML = '请输入验证码';
            error.style.display = 'inline'
        } else {
            inputTrue.style.display = 'inline';
            inputTrue.innerHTML = 'X'
            inputTrue.style.color = 'red'
            error.style.display = 'inline'
            error.innerHTML = '您输入的验证码有误，请重新输入'
        }

    })
    inputbox.addEventListener('focus', function() {
        inputTrue.style.display = 'none';
        error.style.display = 'none';
    })

    submit.addEventListener('click', function() {
        console.log(1);
    })
    refresh.addEventListener('click', function() {
        ii = createCanvas();
    })
})