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
      <sui-menu-item  >
        <a class="button" @click="setColor">
          <sui-icon :name="this.icon"  />
        </a>
      </sui-menu-item>
    </sui-menu>

    <section class="container">
      <div class="profileBody">

        <div class="profileinfo">
          <sui-card v-if="this.obj" class="userTop">
            <sui-card-content>
              <sui-card-header >
                <div class="playername">
                  <NickName :data="{nick:this.nick}" />
                </div>
              </sui-card-header>
            </sui-card-content>
            <sui-card-content >

              <div class="userHead">
                <h2 is="sui-header" icon text-align="center">
                  <div v-html="this.ava"></div>
                </h2>
                <div is="sui-divider" horizontal>
                  <h4 is="sui-header" class="statsHeader">
                    <i class="bar chart icon"></i>
                    Статистика
                  </h4>
                </div>
              </div>
              <div class="userFoot">


                <table class="ui definition table userTable unstackable ">
                  <tbody >
                  <tr>
                    <td class="two  column statsHeader" >
                      <sui-list-icon name="sort numeric up" />
                      PTS</td>
                    <td>{{obj.PTS}}</td>
                  </tr>
                  <tr >
                    <td class="statsHeader">  <sui-list-icon name="sort numeric down" /> Прошлый PTS</td>
                    <td  >{{obj.prevPTS}}</td>
                  </tr>
                  <tr>
                    <td class="statsHeader"><sui-list-icon name="thumbs up outline" /> Побед</td>
                    <td>{{obj.wins}}</td>
                  </tr>
                  <tr>
                    <td class="statsHeader"><sui-list-icon name="thumbs down outline" /> Поражений</td>
                    <td>{{obj.lose}}</td>
                  </tr>
                  <tr>
                    <td class="statsHeader"><sui-list-icon name="wheelchair" /> Ливов</td>
                    <td>{{obj.leavers}}</td>
                  </tr>
                  <tr>
                    <td class="statsHeader"><sui-list-icon name="trophy" /> WinRate</td>
                    <td>{{getWinrate(obj)}}</td>
                  </tr>
                  <tr>
                    <td class="statsHeader"><sui-list-icon name="gamepad" /> Игр</td>
                    <td>{{obj.wins + obj.lose}}</td>
                  </tr>
                  <tr v-model="idConnect">
                    <td class="statsHeader"><sui-list-icon name="plug" /> Connector</td>
                    <td>#{{idConnect}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>


            </sui-card-content>
          </sui-card>
          <div v-else></div>
        </div>

        <div class="profileGams">
          <div class="tableContent"  v-if="this.maps" >
            <sui-table single-line>
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>Номер игры</sui-table-header-cell>
                  <sui-table-header-cell>Дата</sui-table-header-cell>
                  <sui-table-header-cell>Название</sui-table-header-cell>
                  <sui-table-header-cell>Луз</sui-table-header-cell>
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

                  <sui-table-cell>

                    <div v-if="getResult(item)">
                      <sui-list-icon name="frown outline" size="large">
                      </sui-list-icon>
                    </div>
                    <div v-else></div>
                  </sui-table-cell>
                  <sui-table-cell>{{getHumanTime(item.time)}} </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </div>
          <div class="tableContent loader" v-else >

            <div v-if="$colorMode.preference==='dark'">
              <sui-segment>
                <sui-dimmer active >
                  <sui-loader content="Loading..." />
                </sui-dimmer>
              </sui-segment>
            </div>
            <div v-else>
              <sui-segment>
                <sui-dimmer active inverted>
                  <sui-loader content="Loading..." />
                </sui-dimmer>
              </sui-segment>
            </div>

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
    idConnect : null,
    html: "",
    icon : 'moon'
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
        return response.data.reverse()
      })
      .catch(function (error) {console.log(error);});

    let keys = Object.keys(this.maps );
    let val = this.maps[keys[0]]
     val.players.forEach(e =>{
       if(e.playerName === this.nick){
         this.idConnect = e.id
       }
     })
  },
  async mounted(){
    this.ava = avatar(this.nick, { size: 200 })
  },
  components: {
    NickName
  },
  methods:{

    toggle(item) {
      let link = item.link
      this.$router.push({ path: `/replays/${link}` })

    },
    getHumanTime(time){
      let min = time[0]+time[1]
      let sek = time[3]+time[4]
      let TimeConvert = 0
      if(min !== '00'){
        TimeConvert = (min * 60)
        TimeConvert = TimeConvert+ sek*1
        const
          h = Math.floor(TimeConvert / 3600).toString().padStart(2,'0'),
          m = Math.floor(TimeConvert % 3600 / 60).toString().padStart(2,'0'),
          s = Math.floor(TimeConvert % 60).toString().padStart(2,'0');
        let res =  m + ':' + s;
        if(h !== '00'){
          res =  h + ':' + m + ':' + s;
        }
        return res
      }else {
        return time
      }
    },
    getWinrate(obj){
      let win = obj.wins
      let lose = obj.lose
      let games=  win + lose
      let res = Math.round(100*(win/games) * 100) / 100;
      return res+'%'
    },
     getResult(repl){
      let res = false;
       // res = repl.leavers.includes(this.nick)
       repl.losers.forEach((e)=>{
         if(e.nick === this.nick){
           res = true
         }
       })
       repl.players.forEach((e)=>{
         if(e.nick === this.nick){
           console.log(e)
           this.idConnect = e.id
         }
       })

      return res
    },
    setColor() {
      let theme =   $nuxt.$colorMode.preference
      if(theme === 'system' || theme === 'light'){
        $nuxt.$colorMode.preference = 'dark'
        this.icon = 'sun'
      }else{
        $nuxt.$colorMode.preference = 'light'
        this.icon = 'moon'
      }
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

<style scoped lang="scss">
.loader{
  .ui.segment{
    height: 90vh;
  }
}

.playername{
  display: flex;
  justify-content: center;
}

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
.profileinfo{
  margin-right: 15px;
}
.profileBody{
  display: flex;
  flex-direction: row;
}
@media screen and (max-width: 767px) {
  .userTable{
    .ui.table{
      display: revert !important;
    }
    tbody{

      display: revert !important;
    }
  }
}

@media screen and (max-width: 1000px) {
  .tableContent{
    width: 93vw;
    height: 100%;
  }
  .profileinfo{
    margin-right: 0px;
  }
  .profileBody{
    flex-direction: column;
  }
  .userTable{
    tbody{
      display: revert !important;
    }
  }
  .userTop{
    width: 100%
  }

}


</style>
