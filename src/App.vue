<template>
  <top-bar></top-bar>
  <start-menu v-if="gameState == 'start'" @start-game="startGame">
  </start-menu>
  <div v-else-if="gameState == 'play'">
    <face-card :name="person.name" :face-url="person.faceUrl" @next-person="nextPerson">
    </face-card>
    <the-score :score="score" :index="index" :total="people.length">
    </the-score>
  </div>
  <game-over v-else @play-again="playAgain" :score="score">
  </game-over>
</template>

<script>
import {shuffle, peopleData} from './util.js'

import FaceCard from './components/FaceCard.vue';
import TopBar from './components/TopBar.vue';
import TheScore from './components/TheScore.vue';
import StartMenu from './components/StartMenu.vue';
import GameOver from './components/GameOver.vue';

export default {
  components: {
    FaceCard,
    TopBar,
    TheScore,
    StartMenu,
    GameOver,
  },
  data() {
    return {
      score: 0,
      index: 0,
      gameState: "start", // start | play | over
      people: shuffle(peopleData),
    };
  },
  computed: {
    person() {
      return this.people[this.index];
    }
  },
  methods: {
    startGame() {
      this.gameState = "play";
    },
    nextPerson(win, score) {
      if (win) {
        this.score += score;
        this.index += 1;
        if (this.index >= this.people.length) {
          this.gameState = "over";
        }
      } else {
        // put this person back on the end of the array
        let [item] = this.people.splice(this.index, 1);  // Remove the item
        this.people.push(item);
      }

    },
    playAgain() {
      this.score = 0;
      this.index = 0;
      this.gameState = "play";
      this.people = shuffle(this.people)
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
  padding: 0.5rem 2rem;
  cursor: pointer;
  border-radius: .3rem;
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

.throbbing-element {
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