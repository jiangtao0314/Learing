<template>
  <div class="charts">
    <!-- {{BudgetData}} -->
  </div>
</template>
<script>

import {getBudgetData} from '../../network/home'
export default {
  data() {
    return {
      BudgetData :[]
    }
  },

  mounted(){
    getBudgetData()
      .then((res) =>{
        this.BudgetData = res
      })
  }
}
</script>