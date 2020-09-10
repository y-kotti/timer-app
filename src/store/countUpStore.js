import Vue from "vue";
const countUpStore = new Vue({
  data() {
    return {
      currentMin: 0,
      currentSec: 0,
      record: "",
      timerOn: false,
      timerObj: null,
    };
  },
});

export default countUpStore;
