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

</script>