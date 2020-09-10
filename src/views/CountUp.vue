<template>
  <div id="count-up">
    <div class="time">
      {{ formatTime }}
    </div>
    <div>
      <button
        class="btn"
        v-on:click="startTimer"
        v-if="!countUpStore.$data.timerOn"
      >
        Start
      </button>
      <button
        class="btn"
        v-on:click="stopTimer"
        v-if="countUpStore.$data.timerOn"
      >
        Stop
      </button>
      <button class="btn" v-on:click="recordTimer">Record</button>
      <button class="btn" v-on:click="resetTimer">Reset</button>
    </div>
    <div v-html="this.countUpStore.$data.record"></div>
  </div>
</template>

<script>
import countUpStore from "@/store/countUpStore.js";

export default {
  name: "count-up",
  data() {
    return {
      countUpStore,
    };
  },
  methods: {
    timeCount: function() {
      if (
        this.countUpStore.$data.currentSec == 59 &&
        this.countUpStore.$data.currentMin < 59
      ) {
        this.countUpStore.$data.currentMin++;
        this.countUpStore.$data.currentSec = 0;
      } else if (
        this.countUpStore.$data.currentSec == 59 &&
        this.countUpStore.$data.currentMin == 59
      ) {
        this.countUpStore.$data.timeUp();
      } else {
        this.countUpStore.$data.currentSec++;
      }
    },

    startTimer: function() {
      let self = this;
      this.countUpStore.$data.timerObj = setInterval(function() {
        self.timeCount();
      }, 1000);
      this.countUpStore.$data.timerOn = true;
    },

    stopTimer: function() {
      clearInterval(this.countUpStore.$data.timerObj);
      this.countUpStore.$data.timerOn = false;
    },

    timeUp: function() {
      this.countUpStore.$data.timerOn = false;
      clearInterval(this.countUpStore.$data.timerObj);
    },

    resetTimer: function() {
      this.countUpStore.$data.currentMin = 0;
      this.countUpStore.$data.currentSec = 0;
      this.countUpStore.$data.record = "";
      clearInterval(this.countUpStore.$data.timerObj);
    },

    recordTimer: function() {
      this.countUpStore.$data.record +=
        "<p>" + "Record: " + this.formatTime + "</p>";
    },
  },
  computed: {
    formatTime: function() {
      let timeStrings = [
        this.countUpStore.$data.currentMin.toString(),
        this.countUpStore.$data.currentSec.toString(),
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
