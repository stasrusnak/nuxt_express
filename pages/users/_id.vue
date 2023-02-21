<template>
  <section class="container">
    <div>


      <h2 class="info">
        {{ this.nick}}
      </h2>
      <a class="button" href="/">
        Users
      </a>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    posts: [],
    nick: null,
    obj: null,
    maps: null,
    open: false,
    modelLog: null,
    html: "",
  }),
  async mounted(){
    // this.obj = this.$route.params.obj
    this.nick = this.$route.params.id




    this.obj = await axios.post('/api/userarchive', {nick: this.nick})
      .then(function (response) {
        return response.data[0]
      })
      .catch(function (error) {console.log(error);});

    this.maps = await axios.post('/api/archive', {maps: this.obj.idreps})
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {console.log(error);});


    console.log( this.maps )

  },

  head () {
    return {
      title:  this.nick
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
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
