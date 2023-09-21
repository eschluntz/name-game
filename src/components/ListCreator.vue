<template>
  <section>
    <div class="card">
      <h1>Create List</h1>
      <div>
        <strong>List Title: </strong>
        <input type="text" v-model.trim="listDisplayName"/>
      </div>
      <h3>People:</h3>
      <div v-for="(person, index) in people" :key="index">
        <div>
          <strong>Name: </strong>
          <input style="width: 10rem" type="text" required="true" v-model.trim="person.name" />
        </div>
        <div>
          <strong>About: </strong>
          <input style="width: 10rem" type="text" v-model.trim="person.about" />
        </div>
        <div>
          <strong>Picture URL: </strong>
          <input style="width: 10rem" type="text" v-model.trim="person.faceUrl" />
          <br>
          <em>Find the picture you want online, right click and select "copy image address"</em>
        </div>
        <div class="image-container">
          <img v-if="person.faceUrl" :src="person.faceUrl" />
          <img v-else src="placeholder" />
        </div>
        <button @click="removePerson(index)">Remove</button>
        <div>---------------------</div>
      </div>
      <button @click="addPerson">Add another</button>
      <button class="throbbing" @click="saveList(whichList, people, listDisplayName)">Save List</button>
    </div>
  </section>
</template>
  
<script>
import { loadPeopleList, loadListDisplayName, saveList, } from '../util.js'

export default {
  props: ['whichList'],
  data() {
    return {
      listDisplayName: "",
      people: []
    };
  },
  methods: {
    saveList,
    addPerson() {
      this.people.push({name: '', about: '', faceUrl: ''});
    },
    removePerson(index) {
      console.log(index)
      this.people.splice(index, 1)
    }
  },
  async mounted() {
    this.people = await loadPeopleList(this.whichList);
    this.listDisplayName = await loadListDisplayName(this.whichList);
  }
};
</script>
  
<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
  max-height: 20rem;
}
</style>