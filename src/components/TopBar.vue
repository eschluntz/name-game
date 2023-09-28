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
  font: inherit;
  border: 1px solid #3DBCE7;
  background-color: #3DBCE7;
  color: white;
  /* padding: 0.5rem 1rem; */
  padding: auto;
  /* width: 25%; */
  cursor: pointer;
  border-radius: .3rem;
  margin-inline: .1rem;
  /* min-width: none; */

}

button:hover,
button:active {
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
  max-width: 40rem;
  width: 100%;
}

.title {
  color: #F1F1F3;
  font-size: xxx-large;
  padding: 1rem;
}
</style>