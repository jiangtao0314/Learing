<template>
     <div>
        <h2>{{msg}}</h2>
        <button @click="btnclick">按钮</button>
      </div>
</template>

<script>
export default {
    name:'app',
     data: 
  {              
    msg: 'hello'       
  },
  methods:{
      btnclick(){
          console.log(1);
      }
  }
}
</script>