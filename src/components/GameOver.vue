<template>
  <section>
    <div class="card">
      <h1>Game Over!</h1>
      <local-high-score :score="score"></local-high-score>
      <h3>Global High Scores:</h3>
      <table class="table">
        <thead>
          <tr>
            <td><strong>Rank</strong></td>
            <td><strong>Name</strong></td>
            <td><strong>Score</strong></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in highScores" :key="index" >
            <td>#{{ index + 1 }}</td>
            <td v-if="row.toSubmit && !hasSubmitted">
              <form>
                <strong>Name: </strong>
                <input style="width: 10rem" type="text" v-model.trim="playerName" />
                <button @click.prevent="submitScore">Submit Score!</button>
              </form>
            </td>
            <td v-else-if="row.toSubmit">🎉 {{ playerName }} 🎉</td>
            <td v-else>{{ row.name }}</td>
            <td>{{ row.score }}</td>
          </tr>
        </tbody>
      </table>

      <button class="throbbing" @click="$emit('play-again')">Play again</button>
    </div>
  </section>
</template>

<script>
import { collection, query, getDocs, addDoc, orderBy, limit } from "firebase/firestore"
import db from '../firebase/init.js'
import LocalHighScore from './LocalHighScore.vue';

export default {
  components: {LocalHighScore},
  props: ['score'],
  emits: ['play-again'],
  data() {
    return {
      highScores: [],
      playerName: "Anon",
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
      await addDoc(scoresCollection, dataObj);

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

      this.insertCurrentScoreIntoHighScoreList();
    },

    insertCurrentScoreIntoHighScoreList() {
      for (let i = 0; i < this.highScores.length; i++) {
        if (this.score > this.highScores[i].score) {
          // insert current score into list here!
          this.highScores.splice(i, 0, {score: this.score, name: "Anon", toSubmit: true});
          this.highScores.pop();
          break;
        }
      }
    },
  },
  beforeMount() {
    this.loadGlobalHighScores();
  }
};
</script>

<style scoped>

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.table thead {
  background-color: #004777;
  color: white;
}

.table tbody tr {
  transition: background-color 0.3s ease;
}

.table tbody tr:nth-of-type(odd) {
  background-color: white;
}

.table tbody tr:nth-of-type(even) {
  background-color: #F1F1F3;
}

.table tbody td {
  padding: 10px;
  border-bottom: 1px solid #BEBEC2;
}
</style>