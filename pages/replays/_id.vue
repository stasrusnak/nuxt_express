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

    <section class="container" v-if="this.maps">


      <sui-segment raised  v-if="this.maps.winners" class="tableContent" >
        <a is="sui-label" color="blue" ribbon>
          Game
        </a>
            <!--            style="width: 100%; overflow-y: auto; margin: 0 auto"-->
            <div   >

              <sui-table>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-header-cell>Ник</sui-table-header-cell>
                    <sui-table-header-cell>PTS</sui-table-header-cell>
                    <sui-table-header-cell>Начислено</sui-table-header-cell>
                    <sui-table-header-cell>Результат</sui-table-header-cell>
                    <sui-table-header-cell>Лив</sui-table-header-cell>
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row v-for="(log, key) in this.maps.winners" :key="key">
                    <sui-table-cell positive>
                      <div class="nickSlot">
                        <sui-icon name="square" :color="log.color" size="large" />
                        <NickName :data="{nick:log.nick}" />
                      </div>
                    </sui-table-cell>
                    <sui-table-cell positive>{{log.PTS}}</sui-table-cell>
                    <sui-table-cell positive>{{log.PTS-log.prevPTS}}</sui-table-cell>
                    <sui-table-cell positive >
                      <sui-icon name="thumbs up outline" />
                      Выиграл
                    </sui-table-cell>
                    <sui-table-cell positive  >
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
                <sui-table-body v-if="this.maps.losers">
                  <sui-table-row v-for="(lo, k) in this.maps.losers" :data ="lo" :key="k">
                    <sui-table-cell negative>
                      <div class="nickSlot">
                        <sui-icon name="square" :color="lo.color" size="large" />
                        <NickName :data="{nick:lo.nick}" />
                      </div>
                    </sui-table-cell>
                    <sui-table-cell negative> {{lo.PTS}}</sui-table-cell>
                    <sui-table-cell negative>{{lo.PTS-lo.prevPTS}}</sui-table-cell>
                    <sui-table-cell negative >
                      <sui-icon name="thumbs down outline" />
                      Проиграл
                    </sui-table-cell>
                    <sui-table-cell negative  >
                      <div v-show="isLeaver(lo.nick )">
                        <sui-icon name="wheelchair" />
                      </div>
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </div>




      </sui-segment>


      <sui-segment raised class="tableContent" >
              <a is="sui-label" color="red" ribbon>
                Game chat
              </a>
            <div v-if="this.maps.chat">
            <div class="chatblock" v-for="(item, index) in this.maps.chat" :key="index" >
              <div class="infoText">
                <div class="time">{{getDate(item.time)}}</div>
                <div class="nick" :style="`color:${item.color}`">{{item.nick!=="" ? item.nick : "IRINA BOT"}}</div>
              </div>
              <div class="messageText">
                <div class="message">{{item.text}}</div>
              </div>

            </div>
          </div>
        <div v-else></div>

      </sui-segment>



    </section>
  </div>

</template>

<script>
import axios from "axios";
import NickName from "../components/nickName";

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



    this.link = this.$route.params.id

    this.maps = await axios.post('/api/replaysarchive', {link: this.link})
      .then(function (response) {
        return response.data[0]
      })
      .catch(function (error) {console.log(error);});


  },
  components: {
    NickName
  },
  methods:{
    getDate(date){

      let start = this.maps.chat[0].time
     let eventTime = date - start
      // prettyMs
      // var timeStamp= date
      // var dateFormat = new Date(timeStamp);
      //
      // let time =
      // //   dateFormat.getDate()+
      // // "/"+(dateFormat.getMonth()+1)+
      // // "/"+dateFormat.getFullYear()+
      // // " "+dateFormat.getHours()+
      // // ":"+dateFormat.getMinutes()+
      // // ":"+dateFormat.getSeconds()+
      // ":"+dateFormat.getMilliseconds()

      // eventTime = new Date(eventTime*1000).toUTCString().split(/ /)[4].split(':')

      const
        m = Math.floor(eventTime % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(eventTime % 60).toString().padStart(2,'0');
      return  m + ':' + s;



    },

    toggle(log) {
      this.modelLog = log
      this.open = !this.open;
    },
    getNameMap(name){
      return '[VanDarkholme] Legion TD x20 -prccah +'+name
    },
    downloadRep(link){
      window.open('https://replays.irinabot.ru/94545/'+link,'_blank');
    },
    isLeaver(nick){


      return this.maps.leavers.includes(nick)


    },
    setColor(colour) {
      switch (colour) {
        case 'red':
          return "rgb(255 90 90)";
        case 'green':
          return "rgb(126 237 126)";
        case 'blue':
          return "rgb(65 131 196)";
        case 'orange':
          return "rgb(255 196 87)";
        case 'purple':
          return "rgb(187 72 187)";
        case 'yellow':
          return "rgb(255 255 0)";
        case 'pink':
          return "rgb(255 188 200)";
        case 'teal':
          return "rgb(23 241 241)";
        default:
          return "";
      }
    }

  },


  head () {
    return {
      title:  'Реплей'
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.nickSlot{
  display: flex;
  text-align: center;
}

.chatblock{
  display: flex;
  flex-direction: row;
  div{
    padding-right: 7px;
  }
}
.infoText{
  display: flex;
}

.tableContent{
  width: 74vw;
}

.ui.red.ribbon.label {
  border-color: #b21e1e!important;
  display: flex;
  margin-top: -17px;
  width: 150px;
}
.ui.blue.ribbon.label  {
  border-color: #2185d0!important;
  display: flex;
  margin-top: -17px;
  width: 150px;
}

@media screen and (max-width: 1300px) {
  .tableContent{
    width: 90vw;
  }
}

@media screen and (max-width: 800px) {

  .chatblock {
    font-size: 13px;
    padding-bottom: 10px;
  }
  .messageText{
    font-size: 12px;
  }

}



</style>
