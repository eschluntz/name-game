<template>
  <top-bar></top-bar>
  <start-menu v-if="gameState == 'start'" @play-game="playGame">
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
import { collection, addDoc } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore"
import { query, getDocs, orderBy, limit} from "firebase/firestore"
import db from './firebase/init.js'

function shuffle(array) {
  // Fisher Yates shuffling inlined to avoid importing another dependency
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

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
      score: 33,
      index: 0,
      gameState: "over", // start | play | over
      people: shuffle([
        // {name: 'paul graham', faceUrl: 'https://www.ycombinator.com/assets/ycdc/people/paulg-8ca9fa356bb6e7e3e21078a18d8823a5ea393808ef56be2d7d5e60b83be790af.jpg'},
        { name: 'garry tan', faceUrl: 'https://www.ycombinator.com/assets/ycdc/people/garry-299b21fb17314be53a7f62264d289d5dd1cb149945b69e69fa43525ed073cb48.png' },
        // {name: 'paul buchheit', faceUrl: 'https://www.ycombinator.com/assets/ycdc/people/paulb-1529a048b2cf80e93afa43aacad30ce6adf41f2a9f906a9d6e4a73d937414753.jpg'},
      ]),
    };
  },
  computed: {
    person() {
      return this.people[this.index];
    }
  },
  methods: {
    async testFirebase() {
      // https://www.koderhq.com/tutorial/vue/firestore-database/


      // set
      const colRef = collection(db, 'scores');
      const dataObj = {
        name: 'Erik',
        score: 25,
      };
      console.log("sending firebase")
      const docRef = await addDoc(colRef, dataObj);
      console.log('Document was created with ID:', docRef.id);

      // get
      const docSnap = await getDoc(doc(db, 'scores', '1'))
      if (docSnap.exists()) {
        console.log(docSnap.data());
      }

      // get many
      // const querySnap = await getDocs(query(colRef, where('score', '>', 18)));
      const querySnap = await getDocs(query(colRef, orderBy('score', 'desc'), limit(3)));
      console.log(querySnap.docs);
      console.log("top 3 scores")
      querySnap.forEach((doc) => {
        console.log(doc.data());
      })
      



    },
    playGame() {
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
      this.index = 0;
      this.score = 0;
      this.people = shuffle(this.people)
      this.gameState = "play";
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

button {
  font: inherit;
  border: 1px solid #360032;
  background-color: #360032;
  color: white;
  padding: 0.5rem 2rem;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #5c0556;
  border-color: #5c0556;
}

div .card {
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>