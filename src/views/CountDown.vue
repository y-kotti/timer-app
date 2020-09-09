<template>
  <div id="count-down">
    <div class="time">
      {{ formatTime }}
    </div>
    <div>
      <button
        class="btn"
        v-on:click="startTimer"
        v-if="!countDownStore.$data.timerOn"
      >
        Start
      </button>
      <button
        class="btn"
        v-on:click="stopTimer"
        v-if="countDownStore.$data.timerOn"
      >
        Stop
      </button>
      <button class="btn" v-on:click="setTimer">Set</button>
      <button class="btn" v-on:click="resetTimer">Reset</button>
    </div>
    <div>
      <button class="btn" v-on:click="increaseTimeByOneMinute">
        1分+
      </button>
      <button class="btn" v-on:click="decreaseTimeByOneMinute">
        1分-
      </button>
    </div>
    <div>
      <button class="btn" v-on:click="increaseTimeByOneSecond">
        1秒+
      </button>
      <button class="btn" v-on:click="decreaseTimeByOneSecond">
        1秒-
      </button>
    </div>
  </div>
</template>

<script>
import countDownStore from "@/store/countDownStore.js";

export default {
  name: "count-down",
  data() {
    return {
      countDownStore,
    };
  },
  methods: {
    timeCount: function() {
      if (
        this.countDownStore.$data.currentSec <= 0 &&
        this.countDownStore.$data.currentMin >= 1
      ) {
        this.countDownStore.$data.currentMin--;
        this.countDownStore.$data.currentSec = 59;
      } else if (
        this.countDownStore.$data.currentSec <= 0 &&
        this.countDownStore.$data.currentMin <= 0
      ) {
        this.countDownStore.$data.timeUp();
      } else {
        this.countDownStore.$data.currentSec--;
      }
    },

    startTimer: function() {
      this.countDownStore.$data.setMin = this.countDownStore.$data.currentMin;
      this.countDownStore.$data.setSec = this.countDownStore.$data.currentSec;
      if (
        this.countDownStore.$data.setMin == 0 &&
        this.countDownStore.$data.setSec == 0
      ) {
        return;
      }

      let self = this;
      this.countDownStore.$data.timerObj = setInterval(function() {
        self.timeCount();
      }, 1000);
      this.countDownStore.$data.timerOn = true;
    },

    stopTimer: function() {
      clearInterval(this.countDownStore.$data.timerObj);
      this.countDownStore.$data.timerOn = false;
    },

    timeUp: function() {
      if (
        this.countDownStore.$data.setMin != 0 ||
        this.countDownStore.$data.setSec != 0
      ) {
        alert("Time Up");
      }
      this.countDownStore.$data.timerOn = false;
      clearInterval(this.countDownStore.$data.timerObj);
    },

    setTimer: function() {
      clearInterval(this.countDownStore.$data.timerObj);
      this.countDownStore.$data.currentMin = this.countDownStore.$data.setMin;
      this.countDownStore.$data.currentSec = this.countDownStore.$data.setSec;
    },

    resetTimer: function() {
      clearInterval(this.countDownStore.$data.timerObj);
      this.countDownStore.$data.setMin = 0;
      this.countDownStore.$data.setSec = 0;
      this.countDownStore.$data.currentMin = 0;
      this.countDownStore.$data.currentSec = 0;
    },

    increaseTimeByOneMinute: function() {
      if (this.countDownStore.$data.currentMin < 59) {
        this.countDownStore.$data.currentMin += 1;
      }
    },

    decreaseTimeByOneMinute: function() {
      if (0 < this.countDownStore.$data.currentMin) {
        this.countDownStore.$data.currentMin -= 1;
      }
    },

    increaseTimeByOneSecond: function() {
      if (this.countDownStore.$data.currentSec < 59) {
        this.countDownStore.$data.currentSec += 1;
      }
    },

    decreaseTimeByOneSecond: function() {
      if (0 < this.countDownStore.$data.currentSec) {
        this.countDownStore.$data.currentSec -= 1;
      }
    },
  },
  computed: {
    formatTime: function() {
      let timeStrings = [
        this.countDownStore.$data.currentMin.toString(),
        this.countDownStore.$data.currentSec.toString(),
      ].map(function(str) {
        if (str.length < 2) {
          return "0" + str;
        } else {
          return str;
        }
      });
      return timeStrings[0] + ":" + timeStrings[1];
    },
  },
};
</script>

<style scoped>
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  font-size: 100px;
}

.btn {
  margin: 10px 5px;
}
</style>
