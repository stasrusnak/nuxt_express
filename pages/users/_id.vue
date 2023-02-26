<template>

  <div>
    <sui-menu inverted class="main-menu">
      <sui-menu-item >
        <a class="button"  href="https://irinabot.ru/">
          IrInA Host B
          <sui-icon name="circle" style="margin: 0"/>
          T
        </a>
      </sui-menu-item>
      <sui-menu-item>
        <a class="button" href="/">
          Главная
        </a>
      </sui-menu-item>
    </sui-menu>

    <section class="container">
      <div class="profileBody">

        <div class="profileinfo">
          <sui-card v-if="this.obj" >
            <sui-card-content>
              <sui-card-header>
                <NickName :data="{nick:this.nick}" />
              </sui-card-header>
            </sui-card-content>
            <sui-card-content  >

              <h2 is="sui-header" icon text-align="center">
                <div v-html="this.ava"></div>
              </h2>
              <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                  <i class="bar chart icon"></i>
                  Статистика
                </h4>
              </div>

              <table class="ui definition table">
                <tbody>
                <tr>
                  <td class="two wide column">Size</td>
                  <td>1" x 2"</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>6 ounces</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>Yellowish</td>
                </tr>
                <tr>
                  <td>Odor</td>
                  <td>Not Much Usually</td>
                </tr>
                </tbody>
              </table>
              <sui-list>

                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>PTS: {{obj.PTS}}</sui-list-content>
                </sui-list-item>
                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>Прошлый PTS: {{obj.prevPTS}}</sui-list-content>
                </sui-list-item>
                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>РАНГ: {{obj.rank}}</sui-list-content>
                </sui-list-item>
                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>Побед: {{obj.wins}}</sui-list-content>
                </sui-list-item>
                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>Поражений: {{obj.lose}}</sui-list-content>
                </sui-list-item>
                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>Ливов: {{obj.leavers}}</sui-list-content>
                </sui-list-item>
                <sui-list-item>
                  <sui-list-icon name="users" />
                  <sui-list-content>RMK: {{obj.rmk}}</sui-list-content>
                </sui-list-item>

              </sui-list>
            </sui-card-content>
          </sui-card>
          <div v-else></div>
        </div>

        <div class="profileGams">
          <div class="tableContent"  v-show="this.maps" >


            <sui-table single-line>
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>Номер игры</sui-table-header-cell>
                  <sui-table-header-cell>Дата</sui-table-header-cell>
                  <sui-table-header-cell>Название</sui-table-header-cell>
                  <sui-table-header-cell>Длительность</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>

              <sui-table-body v-for="(item, index) in this.maps" :key="index" >
                <sui-table-row>
                  <sui-table-cell>{{item.idrep}}</sui-table-cell>
                  <sui-table-cell>{{item.date}}</sui-table-cell>
                  <sui-table-cell>
                    <a is="sui-list-header" @click.native="toggle(item)" >{{getNameMap(item.idrep)}}</a>
                    <sui-list-icon name="download" link size="large" v-on:click="downloadRep(item.link)" >
                    </sui-list-icon>
                  </sui-table-cell>
                  <sui-table-cell>{{item.time}} </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </div>

        </div>





      </div>
    </section>
  </div>

</template>

<script>
import axios from "axios";
import NickName from "../components/nickName";
import avatar from 'animal-avatar-generator'



export default {
  data: () => ({
    posts: [],
    nick: '',
    obj: null,
    maps: null,
    open: false,
    modelLog: null,
    ava : null,
    html: "",
  }),


  async beforeMount(){


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





  },
  async mounted(){

    // const svg = avatar('your custom seed', { size: 200 })
    this.ava =   avatar(this.nick, { size: 200 })

  },
  components: {
    NickName
  },
  methods:{

    toggle(item) {
      let link = item.link
      console.log(link)
      this.$router.push({ path: `/replays/${link}` })

    },
    getNameMap(name){
      return '[VanDarkholme] Legion TD x20 -prccah +'+name
    },
    downloadRep(link){
      window.open('https://replays.irinabot.ru/94545/'+link,'_blank');
    },
    isLeaver(nick,modelLog){
      return modelLog.leavers.includes(nick)
    }

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
.tableContent{
  width: 70vw;
  overflow-y: auto;
  margin: 0 auto;
  height: 90vh;
}

.profileBody{
  display: flex;
  flex-direction: row;
}


@media screen and (max-width: 1000px) {
  .tableContent{
    width: 93vw;
    height: 100%;
  }
  .profileBody{
    flex-direction: column;
  }
}

</style>
