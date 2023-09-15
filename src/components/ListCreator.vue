<template>
  <section>
    <div class="card">
      <h1>Create List {{ whichList }}</h1>
      <div>
        <strong>List Title: </strong>
        <input type="text" v-model.trim="listName"/>
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
        <span>---------------------</span>
      </div>
      <button @click="addPerson">Add another</button>
      <button class="throbbing" @click="saveList">Save List</button>
    </div>
  </section>
</template>
  
<script>

export default {
  props: ['whichList'],
  data() {
    return {
      listName: "my new list",
      people: [
        {
          name: 'Jensen Huang',
          about: 'CEO of Nvidia',
          faceUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/330px-Jensen_Huang_%28cropped%29.jpg',
        },
        {
          name: 'Jeff Bezos',
          about: 'Former CEO of Amazon',
          faceUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg/330px-Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg',
        },
      ]
    };
  },
  methods: {
    addPerson() {
      this.people.push({name: '', about: '', faceUrl: ''});
    },
    saveList() {
      console.log("Saved!");
    },
  },
  mounted() {
    console.log("prop: " + this.whichList)
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