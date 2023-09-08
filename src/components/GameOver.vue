<template>
  <section>
    <div class="card">
      <h1>Game Over!</h1>
      <div class="card your-score">
        <div>
          <span>Your Score: </span>
          <strong>{{ score }}</strong>
        </div>
        <div>
          <span>Your Top Score: </span>
          <strong>{{ highScore }}</strong>
        </div>
      </div>
      <div v-if="isHighScore">New High Score!!!</div>
      <h3>High Scores:</h3>
      <table class="table">
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

<style scoped>
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

.table thead th {
  padding: 10px;
  border-bottom: 2px solid #BEBEC2;
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

.table tfoot {
  background-color: #004777;
  color: white;
}

.table tfoot td {
  padding: 10px;
  border-top: 2px solid #BEBEC2;
}

</style>