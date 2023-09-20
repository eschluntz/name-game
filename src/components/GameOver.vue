<template>
  <section>
    <div class="card">
      <h1>Game Over!</h1>
      <local-high-score :score="score"></local-high-score>
      <h3> {{listLabel}} Global High Scores:</h3>
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
  props: ['score', 'whichList'],
  emits: ['play-again'],
  data() {
    return {
      highScores: [],
      playerName: "Anon",
      hasSubmitted: false,
    };
  },
  computed: {
    listLabel() {
      const mapping = {
        vcs: 'Top VCs',
        ceos: 'Top CEOs'
      };
      return mapping[this.whichList] || 'Unknown List';
    },
    fireBaseScoreCollection() {
      return collection(db, 'scoreList', this.whichList, 'highScores')
    },
  },
  methods: {
    async submitScore() {
      const dataObj = {
        name: this.playerName,
        score: this.score,
      };
      await addDoc(this.fireBaseScoreCollection, dataObj);

      this.hasSubmitted = true;
    },

    async loadGlobalHighScores() {
      const querySnap = await getDocs(query(this.fireBaseScoreCollection, orderBy('score', 'desc'), limit(10)));

      let highScores = [];
      querySnap.forEach((doc) => {
        highScores.push(doc.data());
      })
      this.highScores = highScores;

      this.insertCurrentScoreIntoHighScoreList();
    },

    insertCurrentScoreIntoHighScoreList() {
      let inserted = false;
      for (let i = 0; i < this.highScores.length; i++) {
        if (this.score > this.highScores[i].score) {
          // insert current score into list here!
          this.highScores.splice(i, 0, {score: this.score, name: "Anon", toSubmit: true});
          this.highScores.pop();
          inserted = true;
          break;
        }
      }
      if (!inserted && this.highScores.length < 10) { // insert at end of list if < 10 entries
        this.highScores.push({score: this.score, name: "Anon", toSubmit: true});
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