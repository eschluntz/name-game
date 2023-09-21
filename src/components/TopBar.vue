<template>
  <section>
    <div class="title">Silicon Valley Name Game</div>
    <table>
      <tr>
        <td>
          <router-link to="/game/vcs">Top VCs</router-link>
        </td>
        <td>
          <router-link to="/game/ceos">Top Tech CEOs</router-link>
        </td>
        <td>
          <router-link to="/create">Create Your Own</router-link>
        </td>
      </tr>
    </table>
  </section>
</template>
  
<script>
export default {}
</script>

<style scoped>
a {
  font: inherit;
  border: 1px solid #3DBCE7;
  background-color: #3DBCE7;
  color: white;
  padding: 0.5rem 2rem;
  cursor: pointer;
  border-radius: .3rem;
  text-decoration: none;
}

a:hover,
a.router-link-active {
  background-color: #71dcff;
  border-color: #71dcff;
}

section {
  background-color: #004777;
  text-align: center;
  padding-bottom: 1rem;
}

table {
  margin-left: auto;
  margin-right: auto;
}

.title {
  color: #F1F1F3;
  font-size: xxx-large;
  padding: 1rem;
}
</style>