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
          <router-link to="/create/yourList"><button>Create Your Own</button></router-link>
        </td>
      </tr>
    </table>
  </section>
</template>
  
<script>
export default {}
</script>

<style scoped>
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