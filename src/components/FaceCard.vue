<template>
  <section>
    <div class="card">
      <img :src="faceUrl"/>
      <div style="height: 1rem;">{{ revealedName }}</div>
      <input 
        type="text" 
        ref="nameInput"
        v-model.trim="enteredName"
      />
      <div class="timebar">
        <div class="timebar__value" :style="timeBarStyles"></div>
      </div>
      <button v-if="active" @click="skipButton">Skip (tab)</button>
      <button v-else @click="endGame(false)">Next (tab)</button>
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
      revealedName: '',
      remainingTime: GUESSTIME,
      intervalId: null,
    };
  },
  watch: {
    enteredName(value) {
      if (value.toLowerCase() == this.name.toLowerCase()) {
        this.active = false;
        console.log("correct!");
        this.endGame(true);
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
        this.skipButton();
      }
    },
    skipButton() {
      this.active = false;
      this.revealedName = this.name;
      this.remainingTime = 0;
    },
    endGame(win) {
      // ready to load the next person
      let score = win ? Math.round(10 * this.remainingTime) : 0;
      this.$emit('next-person', win, score);
      this.resetGame();
    },
    handleTabPress(event) {
      if (event.keyCode === 9) {
        // Tab key is pressed
        
        if (this.active) {
          this.skipButton();
        } else {
          this.endGame(false);
        }
        event.preventDefault();
      }
    },
    resetGame() {
      this.active = true;
      this.enteredName = '';
      this.revealedName = '';
      this.remainingTime = GUESSTIME;
      this.$refs.nameInput.focus();
    }
  },

  // timer stuff
  mounted() {
    this.intervalId = setInterval(this.timePassing, PERIOD);
    this.$refs.nameInput.focus();
    document.addEventListener('keyup', this.handleTabPress);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    document.removeEventListener('keyup', this.handleTabPress);
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