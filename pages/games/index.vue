<template>
  <section class="container">
    <div>
      <Logo />
<!--      <h1 class="title">-->
<!--        {{obj.nick}}-->
<!--      </h1>-->

      <div style="width: 800px; height:400px;overflow-y: scroll;"  v-show="this.obj" >
        <sui-table striped  >
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>Проиграли</sui-table-header-cell>
              <sui-table-header-cell>Выйрали</sui-table-header-cell>
              <sui-table-header-cell></sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row   v-for="(log, key) in this.obj.losers" :key="key">
              <sui-table-cell>{{log.nick}} {{log.prevPTS}} -> {{log.PTS}}</sui-table-cell>
            </sui-table-row>
            <sui-table-row  v-for="(lo, k) in this.obj.winners" :key="k">
              <sui-table-cell>{{lo.nick}} {{lo.prevPTS}} -> {{lo.PTS}}</sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </div>


      <nuxt-link class="button" to="/">
        Homepage
      </nuxt-link>

    </div>
  </section>
</template>

<script>
export default {


// Games:7
// PTS  :  1107
// date_insert  :  "2023-02-09T15:27:55.486Z"
// idreps  :  Array(7)
// leavers  :  0
// lose  :  0
// nick  :  "(ANUBIS)"
// prevPTS  :  1087
// rank  :  1
// rmk  :  2
// wins  :  5

  async asyncData ({ $http }) {
    const data = await $http.$get('/api/users')
    return {
      users: data,
      nick: null,
      obj: {}
    }
  },
  mounted(){
    this.obj = this.$route.params.obj

    // this.nick = this.$route.params.obj.nick
    // console.log( this.obj )
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
.button
{
  display: inline-block;
  margin-top: 50px;
}
</style>
