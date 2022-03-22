<template>
  <div>
    <img src="../assets/imgs/colors.jpg" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    axios.get("http://myhost.fallen-angle.com:8081/api/v1/statistics/china").then(res=> {
      console.log('axios', res);
    }).catch(err => {
      console.log(err);
    })
  },
});
</script>
