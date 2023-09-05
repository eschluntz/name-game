<template>
  <section>
    <div class="card">
      <img :src="faceUrl"/>
      <input v-if="state=='guess'" type="text" id="name" name="name" v-model.trim="enteredName" />
      <div v-else>{{ actualName }}</div>
      <div class="timebar">
        <div class="timebar__value" :style="timeBarStyles"></div>
      </div>
      <button v-if="state=='guess'" @click="skipButton">Skip (tab)</button>
      <button v-else @click="nextButton">Next (tab)</button>
      <div>
        <strong>Score: </strong><span>{{ score }}</span>
      </div>
    </div>
  </section>
</template>
  
<script>
const PERIOD = 200; // milliseconds between checks
const GUESSTIME = 10; // seconds to guess

export default {
  props: ['actualName', 'faceUrl'],
  data() {
    return {
      state: 'guess',  // guess, pause
      enteredName: '',
      remainingTime: GUESSTIME,
      startingTime: GUESSTIME,
      intervalId: null,
      score: 0,
    };
  },
  watch: {
    enteredName(value) {
      if (value.toLowerCase() == this.actualName.toLowerCase()) {
        this.score += Math.round(10 * this.remainingTime);
        this.state = 'pause';
        console.log("correct!");
      }
    }
  },
  computed: {
    timeBarStyles() {
      return {width: 100 * this.remainingTime / this.startingTime + '%'}
    }
  },
  methods: {
    timePassing() { // called by interval timer
      if (this.state == 'pause') {
        return
      }
      this.remainingTime -= PERIOD / 1000
      
      // run out of time
      if (this.remainingTime <= 0) {
        this.state = 'pause';
      }
    },
    skipButton() {
      this.state = 'pause';
    },
    nextButton() {
      this.state = 'guess';
    },
  },
  mounted() {
    this.intervalId = setInterval(this.timePassing, PERIOD);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>
  
<style scoped>
img {
  width: 20rem;
}

input[type='text'] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}

.timebar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.timebar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
  transition: width .2s linear;
}
</style>