<template>
  <section>
    <div class="card">
      <h1>Game Over!</h1>
      <h3>High Scores:</h3>
      <table>
        <thead>
          <tr>
            <td><strong>Rank</strong></td>
            <td><strong>Name</strong></td>
            <td><strong>Score</strong></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in highScores" :key="index">
            <td>#{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.score }}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <div><strong>Your Score: </strong><span> {{ score }}</span></div>
      <div><strong>Your High Score: </strong><span> {{ highScore }}</span></div>
      <div v-if="isHighScore">New High Score!!!</div>
      <br>
      <button @click="$emit('play-again')">Play again</button>
    </div>
  </section>
</template>

<script>
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore"
import db from '../firebase/init.js'

export default {
  props: ['score'],
  emits: ['play-again'],
  data() {
    return {
      highScore: 0,
      highScores: [],
    };
  },
  methods: {
    async loadGlobalHighScores() {
      console.log("loading high scores");
      const scoresCollection = collection(db, 'scores');
      const querySnap = await getDocs(query(scoresCollection, orderBy('score', 'desc'), limit(10)));

      console.log("query returned");
      let highScores = [];
      querySnap.forEach((doc) => {
        highScores.push(doc.data());
      })

      console.log("done pushing");
      console.log(highScores);
      this.highScores = highScores;
    },
    loadLocalHighScores() {
      this.highScore = localStorage.getItem('highScore');
      if (!this.highScore) {
        this.highScore = 0;
      }

      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('highScore', this.score);
      }
    }
  },
  computed: {
    isHighScore() {
      return this.score == this.highScore;
    }
  },
  mounted() {
    this.loadGlobalHighScores();
    this.loadLocalHighScores();

  }
};
</script>

<style scoped></style>