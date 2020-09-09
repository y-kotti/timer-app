<template>
  <div id="count-down">
    <div class="time">
      {{ formatTime }}
    </div>
    <div>
      <button v-on:click="startTimer" v-if="!timerOn">Start</button>
      <button v-on:click="stopTimer" v-if="timerOn">Stop</button>
      <button v-on:click="resetTimer">Reset</button>
    </div>
    <div>
      <button v-on:click="increaseTimeByOneMinute">1分+</button>
      <button v-on:click="decreaseTimeByOneMinute">1分-</button>
      <button v-on:click="increaseTimeByOneSecond">1秒+</button>
      <button v-on:click="decreaseTimeByOneSecond">1秒-</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "count-down",
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
  methods: {
    timeCount: function() {
      if (this.currentSec <= 0 && this.currentMin >= 1) {
        this.currentMin--;
        this.currentSec = 59;
      } else if (this.currentSec <= 0 && this.currentMin <= 0) {
        this.timeUp();
      } else {
        this.currentSec--;
      }
    },

    startTimer: function() {
      this.setMin = this.currentMin;
      this.setSec = this.currentSec;
      if (this.setMin == 0 && this.setSec == 0) {
        return;
      }

      let self = this;
      this.timerObj = setInterval(function() {
        self.timeCount();
      }, 1000);
      this.timerOn = true;
    },

    stopTimer: function() {
      clearInterval(this.timerObj);
      this.timerOn = false;
    },

    timeUp: function() {
      if (this.setMin != 0 || this.setSec != 0) {
        alert("Time Up");
      }
      this.timerOn = false;
      clearInterval(this.timerObj);
    },

    resetTimer: function() {
      clearInterval(this.timerObj);
      this.currentMin = this.setMin;
      this.currentSec = this.setSec;
    },

    increaseTimeByOneMinute: function() {
      if (this.currentMin < 59) {
        this.currentMin += 1;
      }
    },

    decreaseTimeByOneMinute: function() {
      if (0 < this.currentMin) {
        this.currentMin -= 1;
      }
    },

    increaseTimeByOneSecond: function() {
      if (this.currentSec < 59) {
        this.currentSec += 1;
      }
    },

    decreaseTimeByOneSecond: function() {
      if (0 < this.currentSec) {
        this.currentSec -= 1;
      }
    },
  },
  computed: {
    formatTime: function() {
      let timeStrings = [
        this.currentMin.toString(),
        this.currentSec.toString(),
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
</style>
