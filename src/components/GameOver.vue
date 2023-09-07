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
      
      <form v-if="!hasSubmitted">
        <strong>Name: </strong>
        <input type="text" v-model.trim="playerName" />
        <button @click.prevent="submitScore">Submit Score!</button>
      </form>
      
      <div><strong>Your Score: </strong><span> {{ score }}</span></div>
      <div><strong>Your High Score: </strong><span> {{ highScore }}</span></div>
      <div v-if="isHighScore">New High Score!!!</div>
      <br>
      <button @click="$emit('play-again')">Play again</button>
    </div>
  </section>
</template>

<script>
import { collection, query, getDocs, addDoc, orderBy, limit } from "firebase/firestore"
import db from '../firebase/init.js'

export default {
  props: ['score'],
  emits: ['play-again'],
  data() {
    return {
      highScore: 0,
      highScores: [],
      playerName: "",
      hasSubmitted: false,
    };
  },
  methods: {
    async submitScore() {
      const scoresCollection = collection(db, 'scores');
      const dataObj = {
        name: this.playerName,
        score: this.score,
      };
      const docRef = await addDoc(scoresCollection, dataObj);
      console.log('Document was created with ID:', docRef.id);

      await this.loadGlobalHighScores();

      this.playerName = "";
      this.hasSubmitted = true;

    },
    async loadGlobalHighScores() {
      const scoresCollection = collection(db, 'scores');
      const querySnap = await getDocs(query(scoresCollection, orderBy('score', 'desc'), limit(10)));

      let highScores = [];
      querySnap.forEach((doc) => {
        highScores.push(doc.data());
      })
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