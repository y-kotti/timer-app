import Vue from "vue";
const countDownStore = new Vue({
  data() {
    return {
      setMin: 0,
      setSec: 0,
      currentMin: 0,
      currentSec: 0,
      timerOn: false,
      timerObj: null,
    };
  },
});

export default countDownStore;
