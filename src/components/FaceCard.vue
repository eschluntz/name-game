<template>
  <section>
    <div class="card">
      <img :src="faceUrl"/>
      <input v-if="active" type="text" v-model.trim="enteredName" />
      <div v-else>{{ name }}</div>
      <div class="timebar">
        <div class="timebar__value" :style="timeBarStyles"></div>
      </div>
      <button v-if="active" @click="skipButton">Skip (tab)</button>
      <button v-else @click="nextPerson">Next (tab)</button>
    </div>
  </section>
</template>
  
<script>
const PERIOD = 200; // milliseconds between checks
const GUESSTIME = 10; // seconds to guess

export default {
  props: ['name', 'faceUrl'],
  emits: ['next-person'],
  data() {
    return {
      // NOTE: this is all blown out from the parent when new props are passed in
      active: true,
      enteredName: '',
      remainingTime: GUESSTIME,
      intervalId: null,
    };
  },
  watch: {
    enteredName(value) {
      if (value.toLowerCase() == this.name.toLowerCase()) {
        this.active = false;
        console.log("correct!");
        this.nextPerson();
      }
    }
  },
  computed: {
    timeBarStyles() {
      return {width: 100 * this.remainingTime / GUESSTIME + '%'}
    }
  },
  methods: {
    timePassing() { // called by interval timer
      if (!this.active) {
        return
      }

      this.remainingTime -= PERIOD / 1000
      if (this.remainingTime <= 0) {
        this.remainingTime = 0;
        this.active = false;
      }
    },
    skipButton() {
      this.active = false;
      this.remainingTime = 0;
    },
    nextPerson() {
      // ready to load the next person
      this.$emit('next-person', Math.round(10 * this.remainingTime))
    }
  },

  // timer stuff
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