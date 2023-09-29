<template>
  <start-menu v-if="gameState == 'start'" @start-game="startGame">
  </start-menu>
  <div v-else-if="gameState == 'play'">
    <face-card :person="person" :decoys="decoys" @next-person="nextPerson" :key="roundCountKey">
    </face-card>
    <the-score :score="score" :index="index" :total="people.length">
    </the-score>
  </div>
  <game-over v-else @play-again="playAgain" :score="score" :whichList="whichList">
  </game-over>
  <div class="card">
    <input type="checkbox" v-model="learningMode" /><span>Learning Mode </span>
    <em>(Names keep coming up until you get them right)</em>
  </div>
</template>
  
<script>
import { shuffle, deepCopy, loadPeopleList } from '../../util.js'

import FaceCard from './FaceCard.vue';
import TheScore from './TheScore.vue';
import StartMenu from './StartMenu.vue';
import GameOver from './GameOver.vue';

export default {
  components: {
    FaceCard,
    TheScore,
    StartMenu,
    GameOver,
  },
  data() {
    return {
      score: 0,
      index: 0,
      roundCountKey: 0,
      gameState: "start", // start | play | over
      people: [], // modified during game
      originalLoadedPeople: [],
      learningMode: false,
    };
  },
  props: ['whichList'],
  computed: {
    person() {
      return this.people[this.index];
    },
    decoys() {
      // pick 3 random other names from the list
      const count = 3;
      if (this.people.length < count + 1) {
        throw new Error("Not enough people to generate decoys!");
      }

      const indexes = new Set([this.index]);

      while (indexes.size <= count) {
        const randomIndex = Math.floor(Math.random() * this.people.length);
        if (!indexes.has(randomIndex)) {
          indexes.add(randomIndex);
        }
      }

      indexes.delete(this.index);
      return [...indexes].map(index => this.people[index].name);
    },
  },
  watch: {
    async whichList() {
      this.originalLoadedPeople = await loadPeopleList(this.whichList);
      this.playAgain();
      this.gameState = "start";
    }
  },
  async mounted() {
    this.originalLoadedPeople = await loadPeopleList(this.whichList);
    this.people = shuffle(deepCopy(this.originalLoadedPeople))
  },
  methods: {
    startGame() {
      this.gameState = "play";
    },
    nextPerson(win, timeRemaining, score) {
      this.roundCountKey++; // used to force re-render the game
      if (!this.learningMode || win) {
        this.score += score;
        this.index++;
        if (this.index >= this.people.length) {
          this.gameState = "over";
        }
      } else {
        // put this person back on the end of the array
        let [item] = this.people.splice(this.index, 1);  // Remove the item
        item.timeRemaining = timeRemaining;
        this.people.push(item);
      }

    },
    playAgain() {
      this.score = 0;
      this.index = 0;
      this.roundCountKey++;
      this.gameState = "play";
      this.people = shuffle(deepCopy(this.originalLoadedPeople))
    },
  }
};
</script>
  
<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

div .card {
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #f1f1f3;
  text-align: center;
}

button {
  font: inherit;
  border: 1px solid #3DBCE7;
  background-color: #3DBCE7;
  color: white;
  cursor: pointer;
  border-radius: .3rem;
  margin-inline: .3rem;
}

button:hover,
button:active {
  background-color: #71dcff;
  border-color: #71dcff;
}

@keyframes throb {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.throbbing {
  display: inline-block;
  animation: throb 1s infinite ease-in-out;
}

input[type=text] {
  width: 100%;
  padding: 10px;
  border: 1px solid #BEBEC2;
  border-radius: 4px;
  background-color: white;
  color: black;
  font-size: 16px;
}

input[type=text]:hover {
  border-color: #004777;
}

input[type=text]:focus {
  outline: none;
  border-color: #3DBCE7;
  box-shadow: 0 0 0 2px rgba(61, 188, 231, 0.25);
}

input[type=text]:disabled {
  background-color: #F1F1F3;
  cursor: not-allowed;
}
</style>