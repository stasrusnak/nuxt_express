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
        <nuxt-link class="button" to="/">
          Главная
        </nuxt-link>
      </sui-menu-item>
    </sui-menu>

    <section class="container">
      <div>
        <sui-card v-if="this.obj" >

          <sui-card-content>
            <sui-card-header>
              <NickName :data="{nick:this.nick}" />
            </sui-card-header>
          </sui-card-content>
          <sui-card-content  >
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

        <div style="width: 800px; height:400px;overflow-y: auto;"  v-show="this.maps" >


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


<!--        <nuxt-link class="button" to="/">-->
<!--          Главная-->
<!--        </nuxt-link>-->

        <sui-modal v-model="open" v-if="modelLog">
          <sui-modal-header v-show="modelLog.idrep">{{getNameMap(modelLog.idrep)}}</sui-modal-header>
          <sui-modal-content>
            <div style="width: 100%; overflow-y: auto; margin: 0 auto"  >


              <sui-table celled v-if="modelLog.rmk.length"  >
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-header-cell>Ник</sui-table-header-cell>
                    <sui-table-header-cell>PTS</sui-table-header-cell>
                    <sui-table-header-cell>Начислено</sui-table-header-cell>
                    <sui-table-header-cell>Результат</sui-table-header-cell>
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row v-for="(log, key) in modelLog.rmk" :key="key">
                    <sui-table-cell warning>
                      <NickName :data="{nick:log.nick}" />
                    </sui-table-cell>
                    <sui-table-cell warning>{{log.PTS}}</sui-table-cell>
                    <sui-table-cell warning>{{log.PTS-log.prevPTS}}</sui-table-cell>
                    <sui-table-cell warning >
                      <sui-icon name="blind" />
                      RMK
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>

              <sui-table celled v-else >
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
                  <sui-table-row v-for="(log, key) in modelLog.winners" :key="key">
                    <sui-table-cell positive>
                      <NickName :data="{nick:log.nick}" />
                    </sui-table-cell>
                    <sui-table-cell positive>{{log.PTS}}</sui-table-cell>
                    <sui-table-cell positive>{{log.PTS-log.prevPTS}}</sui-table-cell>
                    <sui-table-cell positive >
                      <sui-icon name="thumbs up outline" />
                      Выйграл
                    </sui-table-cell>
                    <sui-table-cell positive text-align="center">
                      <div v-show="isLeaver(log.nick,modelLog)">
                        <sui-icon name="thumbs up outline" />
                      </div>
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
                  <sui-table-body>
                  <sui-table-row v-for="(lo, k) in modelLog.losers" :data ="lo" :key="k">
                    <sui-table-cell negative>
                      <NickName :data="{nick:lo.nick}" />
                    </sui-table-cell>
                    <sui-table-cell negative> {{lo.PTS}}</sui-table-cell>
                    <sui-table-cell negative>{{lo.PTS-lo.prevPTS}}</sui-table-cell>
                    <sui-table-cell negative >
                      <sui-icon name="thumbs down outline" />
                      Проиграл
                    </sui-table-cell>
                    <sui-table-cell negative text-align="center">
                      <div v-show="isLeaver(lo.nick,modelLog)">
                        <sui-icon name="wheelchair" />
                      </div>
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="toggle(null)">
              OK
            </sui-button>
          </sui-modal-actions>
        </sui-modal>
        <div v-else></div>

      </div>
    </section>
  </div>

</template>

<script>
  import NickName from "../components/nickName";
  import axios from 'axios'
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
    components: {
      NickName
    },
    methods:{
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
      isLeaver(nick,modelLog){
        return modelLog.leavers.includes(nick)
      }

    },

    async mounted(){
      this.obj = this.$route.params.obj
      this.nick = this.$route.params.obj.nick
      console.log( this.obj )


      this.maps = await axios.post('/api/archive', {maps: this.obj.idreps})
        .then(function (response) {

          console.log(response.data)

          return response.data
        })
        .catch(function (error) {console.log(error);});




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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 92vh;
  }
/*.ui.ribbon.label {*/
/*  left: calc(1rem - 1.2em);*/
/*}*/
</style>
