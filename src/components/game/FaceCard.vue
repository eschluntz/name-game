<template>
  <section>
    <div class="card" :class="flashClass">
      <div class="image-container">
        <div v-if="!imageLoaded">Loading...</div>
        <img @load="onImageLoaded" :src="person.faceUrl" />
      </div>
      <div style="min-height: 1.5rem">{{ revealedAbout }}</div>
      <div class="button-container">
        <button v-for="(answer, index) in possibleAnswers" @click="clickAnswer(answer)" :class="answerClass(answer)"
          :key="index">
          {{ index + 1 }}. {{ answer }}
        </button>
      </div>

      <div class="timebar">
        <div class="timebar__value" :style="timeBarStyles"></div>
      </div>
      <button v-if="active" @click="skipButton">Reveal (tab)</button>
      <button v-else @click="endGame(false)" class="throbbing">Next (tab)</button>
    </div>
  </section>
</template>
  
<script>
import { shuffle } from '../../util.js'
const UPDATE_PERIOD = 200; // milliseconds between checks
const GUESSTIME = 15; // seconds to guess

export default {
  props: ['person', 'decoys'],
  emits: ['next-person'],
  data() {
    return {
      active: true,
      remainingTime: this.person.timeRemaining !== undefined ? this.person.timeRemaining : GUESSTIME,
      intervalId: null,
      timeLeftWhenSkipped: null,
      flashClass: "",
      revealedAbout: "",
      possibleAnswers: shuffle([this.person.name, ...this.decoys]),
      imageLoaded: false,
    };
  },
  computed: {
    timeBarStyles() {
      return { width: 100 * this.remainingTime / GUESSTIME + '%' }
    },
  },
  methods: {
    onImageLoaded() {
      this.imageLoaded = true;
    },
    answerClass(answer) {
      if (this.active) {
        return "answer-button"
      } else if (answer == this.person.name) {
        return "answer-button correct-answer"
      } else {
        return "answer-button bad-answer"
      }
    },
    clickAnswer(answer) {
      if (!this.active) {
        return;
      } else if (answer == this.person.name) {
        this.active = false;
        this.endGame(true);
      } else {
        this.flashCardClass("fail-flash");
        this.remainingTime -= GUESSTIME / 3;
        this.revealedAbout = "HINT: " + this.person.about;
      }
    },
    flashCardClass(tempClass) {
      this.flashClass = tempClass;
      setTimeout(() => {
        this.flashClass = '';
      }, 150); // Set timeout duration to match the transition duration
    },

    timePassing() { // called by interval timer
      if (!this.active || !this.imageLoaded) {
        return
      }

      this.remainingTime -= UPDATE_PERIOD / 1000
      if (this.remainingTime < 0) {
        this.remainingTime = 0;
      }
    },
    skipButton() {
      this.active = false;
      this.enteredName = this.person.name;
      this.revealedAbout = this.person.about;
    },
    endGame(win) {
      // ready to load the next person
      let score = win ? Math.round(10 * this.remainingTime) : 0;
      let flashClass = win ? "success-flash" : "fail-flash"
      this.flashCardClass(flashClass);
      setTimeout(() => { // leave time for the success flash
        this.$emit('next-person', win, this.remainingTime, score);
      }, 300);
    },
    handleKeyPress(event) {
      switch (event.keyCode) {
        case 9: // Tab
          if (this.active) {
            this.skipButton();
          } else {
            this.endGame(false);
          }
          event.preventDefault();
          break;

        // key presses 1-4
        case 49:
        case 50:
        case 51:
        case 52:
          this.clickAnswer(this.possibleAnswers[event.keyCode - 49]); // 49 = 1, index zero.
          break;
      }
    },
  },

  mounted() {
    this.intervalId = setInterval(this.timePassing, UPDATE_PERIOD);
    document.addEventListener('keyup', this.handleKeyPress);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    document.removeEventListener('keyup', this.handleKeyPress);
  }
};
</script>
  
<style scoped>

.success-flash {
  background-color: rgb(138, 255, 144);
  transition: 'background-color 0.15s ease';
}

.fail-flash {
  background-color: rgb(255, 138, 138);
  transition: 'background-color 0.15s ease';
}

img {
  width: 20rem;
  object-fit: cover;
  object-position: bottom;
}

.image-container {
  position: relative;
  overflow: hidden;
  max-height: 20rem;
}

input[type='text'] {
  /* display: block; */
  width: 20rem;
  margin-top: 0.5rem;
}

.timebar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #004777;
}

.timebar__value {
  background-color: #3DBCE7;
  width: 50%;
  height: 100%;
  transition: width .2s linear;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  /* Space between buttons */
  justify-content: space-between;
  /* Distributes space evenly between the buttons */
}

.answer-button {
  width: 50px;
  /* Fixed width for each button */
  flex: 1 1 calc(40% - 10px);
  /* This ensures that each button will take up roughly 50% of the container's width minus the gap */
  box-sizing: border-box;
  margin-bottom: 10px;
  /* Space between rows */
}

.correct-answer {
  background-color: #3DBCE7;
}

.bad-answer {
  background-color: #004777;
}
</style>