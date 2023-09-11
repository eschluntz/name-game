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
          <tr v-for="(row, index) in highScores" :key="index" :class="mySubmissionClass(row.name)">
            <td>#{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.score }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="!hasSubmitted">
        <form>
          <strong>Name: </strong>
          <input class="submit-name" type="text" v-model.trim="playerName" />
          <button @click.prevent="submitScore">Submit Score!</button>
        </form>
        <br>
      </div>

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
      playerName: "",
      submittedPlayerName: "",
      hasSubmitted: false,
    };
  },
  methods: {
    mySubmissionClass(name) {
      return name == this.submittedPlayerName ? "my-submission" : "";
    },
    async submitScore() {
      const scoresCollection = collection(db, 'scores');
      const dataObj = {
        name: this.playerName,
        score: this.score,
      };
      await addDoc(scoresCollection, dataObj);

      // now reload
      this.submittedPlayerName = this.playerName;
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

      this.insertCurrentScoreIntoHighScoreList();
    },

    insertCurrentScoreIntoHighScoreList() {
      console.log("in function")
      for (let i = 0; i < this.highScores.length; i++) {
        console.log("in loop")
        if (this.score > this.highScores[i].score) {
          // insert current score into list here!
          console.log("inserting local score");
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
.submit-name {
  width: 50%;
  margin-right: .5rem;
}

.your-score {
  font-size: x-large;
  background-color: #004777;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
}

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

.table tbody tr:hover {
  background-color: #3DBCE7;
  color: white;
}

.table tbody td {
  padding: 10px;
  border-bottom: 1px solid #BEBEC2;
}

.my-submission {
  background-color: #3DBCE7 !important;
  color: white;
}
</style>