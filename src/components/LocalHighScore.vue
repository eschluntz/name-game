<template>
  <div class="card your-score">
    <div>
      <span v-if="isNewLocalHighScore">🎉</span>
      <span>Your Score: </span><strong>{{ score }}</strong>
    </div>
    <div>
      <span>Previous Best: </span><strong>{{ prevHighScore }}</strong>
      <span v-if="isNewLocalHighScore">🎉</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocalHighScore",
  props: ['score'],
  data() {
    return {
      prevHighScore: 0,
    };
  },
  computed: {
    isNewLocalHighScore() {
      return this.score > this.prevHighScore;
    },
  },
  methods: {
    loadLocalHighScores() {
      this.prevHighScore = localStorage.getItem('highScore');
      if (!this.prevHighScore) {
        this.prevHighScore = 0;
      }

      if (this.score > this.prevHighScore) {
        localStorage.setItem('highScore', this.score);
      }
    }
  },
  mounted() {
    this.loadLocalHighScores();
  }
}
</script>

<style scoped>
.your-score {
  font-size: x-large;
  background-color: #004777;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
}
</style>