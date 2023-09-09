<template>
  <section>
    <div class="card" :class="flashClass">
      <div class="image-container">
        <img :src="faceUrl" />
      </div>
      <input type="text" ref="nameInput" v-model="enteredName" />
      <div class="timebar">
        <div class="timebar__value" :style="timeBarStyles"></div>
      </div>
      <button v-if="active" @click="skipButton">Skip (tab)</button>
      <button v-else @click="endGame(false)" class="throbbing">Next (tab)</button>
    </div>
  </section>
</template>
  
<script>
const UPDATE_PERIOD = 200; // milliseconds between checks
const GUESSTIME = 10; // seconds to guess

export default {
  props: ['name', 'faceUrl'],
  emits: ['next-person'],
  data() {
    return {
      active: true,
      enteredName: '',
      remainingTime: GUESSTIME,
      intervalId: null,
      flashClass: "",
    };
  },
  watch: {
    enteredName(value) {
      if (this.active && (value.toLowerCase().trim() == this.name.toLowerCase().trim())) {
        this.active = false;
        this.endGame(true);
      }
    }
  },
  computed: {
    timeBarStyles() {
      return { width: 100 * this.remainingTime / GUESSTIME + '%' }
    },
  },
  methods: {
    flashCardClass(tempClass) {
      this.flashClass = tempClass;
      setTimeout(() => {
        this.flashClass = '';
      }, 150); // Set timeout duration to match the transition duration
    },

    timePassing() { // called by interval timer
      if (!this.active) {
        return
      }

      this.remainingTime -= UPDATE_PERIOD / 1000
      if (this.remainingTime <= 0) {
        this.skipButton();
      }
    },
    skipButton() {
      this.active = false;
      this.enteredName = this.name;
      this.remainingTime = 0;
    },
    endGame(win) {
      // ready to load the next person
      let score = win ? Math.round(10 * this.remainingTime) : 0;
      if (win) {
        this.flashCardClass("success-flash");
      }
      this.resetGame();
      this.$emit('next-person', win, score);
    },
    handleKeyPress(event) {
      if (event.keyCode === 9) {  // Tab key
        if (this.active) {
          this.skipButton();
        } else {
          this.endGame(false);
        }
        event.preventDefault();
      }
      else if (event.keyCode === 13) {  // Enter key - turn box red
        if (this.active) {
          this.flashCardClass("fail-flash");
        }
        event.preventDefault();
      }
    },
    resetGame() {
      this.active = true;
      this.enteredName = '';
      this.remainingTime = GUESSTIME;
      this.$nextTick(() => {
        // do this in next Tick to make sure the box has reactivated already
        this.$refs.nameInput.focus();
      })
    }
  },

  mounted() {
    this.intervalId = setInterval(this.timePassing, UPDATE_PERIOD);
    this.$refs.nameInput.focus();
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
  background: #004777 ;
}

.timebar__value {
  background-color: #3DBCE7;
  width: 50%;
  height: 100%;
  transition: width .2s linear;
}
</style>