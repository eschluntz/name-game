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
import { query, getDocs, orderBy, limit } from "firebase/firestore"

import db from './firebase/init.js'
import shuffle from './util.js'

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
      people: shuffle([
        { name: 'Satya Nadella', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/330px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg' },
        { name: 'Elon Musk', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/330px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg' },
        { name: 'Tim Cook', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/%D0%A2%D0%B8%D0%BC_%D0%9A%D1%83%D0%BA_%2802-09-2021%29.jpg/330px-%D0%A2%D0%B8%D0%BC_%D0%9A%D1%83%D0%BA_%2802-09-2021%29.jpg' },
        { name: 'Sundar Pichai', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_Pichai_%282023%29_cropped.jpg/330px-Sundar_Pichai_%282023%29_cropped.jpg' },
        { name: 'Mark Zuckerberg', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/330px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg' },
        { name: 'Jensen Huang', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/330px-Jensen_Huang_%28cropped%29.jpg' },
        { name: 'Jeff Bezos', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg/330px-Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg' },
        { name: 'Marc Benioff', faceUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Marc_Benioff.jpg/330px-Marc_Benioff.jpg' },
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

div .card {
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #f1f1f3;
  text-align: center;
}
</style>