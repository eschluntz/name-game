<template>
    <section>
      <div class="card">
        <img src="https://www.ycombinator.com/assets/ycdc/people/paulg-8ca9fa356bb6e7e3e21078a18d8823a5ea393808ef56be2d7d5e60b83be790af.jpg"/>
        <input type="text" id="name" name="name" v-model.trim="enteredName" />
        
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        enteredName: '',
        faceUrl: '',
      };
    },
    methods: {
      submitSurvey() {}
    }
  };
  </script>
  
  <style scoped>
  img {
    width: 20rem;
  }
  
  input[type='text'] {
    display: block;
    width: 20rem;
    margin-top: 0.5rem;
  }
  </style>