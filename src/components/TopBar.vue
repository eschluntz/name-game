<template>
  <section>
    <div class="title">Silicon Valley Name Game</div>
    <table>
      <tr>
        <td>
          <router-link to="/game/vcs"><button>Top VCs</button></router-link>
        </td>
        <td>
          <router-link to="/game/ceos"><button>Top Tech CEOs</button></router-link>
        </td>
        <td>
          <router-link to="/lists"><button>All Lists</button></router-link>
        </td>
        <td>
          <router-link to="/create"><button>Create Your Own</button></router-link>
        </td>
      </tr>
    </table>
  </section>
</template>
  
<script>
export default {}
</script>

<style scoped>

button {
  width: 100%;
  padding: 0;
  height: 2.5rem;

}

section {
  background-color: #004777;
  text-align: center;
  padding-bottom: 1rem;
}

table {
  margin-left: auto;
  margin-right: auto;
  max-width: 40rem;
  width: 100%;
}

.title {
  color: #F1F1F3;
  font-size: xxx-large;
  padding: 1rem;
}
</style>