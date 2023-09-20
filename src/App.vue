<template>
  <top-bar></top-bar>
  <router-view></router-view>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
  components: {
    TopBar,
  },
};
console.log("Hi! Yes you can obviously 'hack' the game by changing your score or hitting firebase directly, but please don't spoil the high score list for everyone :)")
</script>