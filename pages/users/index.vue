<template>
  <section class="container">
    <div>
      <Logo />
      <h1 class="title">
        {{obj.nick}}
      </h1>
      <ul class="users">



      </ul>
      <nuxt-link class="button" to="/">
        Homepage
      </nuxt-link>

    </div>
  </section>
</template>

<script>
export default {
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
    console.log( this.obj )
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
  min-height: 100vh;
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
