window.addEventListener('load',function(){

    var closeHead = document.querySelector('.close');
    var app = document.querySelector('.app')
    closeHead.addEventListener('click',function(){
        app.style.display = 'none';
    })    

})