<template>
  <div>
    <sui-menu inverted class="main-menu">
      <sui-menu-item>
        <a class="button" href="https://irinabot.ru/">
          IrInA Host B
          <sui-icon name="circle" style="margin: 0"/>
          T
        </a>

      </sui-menu-item>
      <sui-menu-item>
        <nuxt-link class="button" to="/">
          {{items[0]}}
        </nuxt-link>
      </sui-menu-item>
      <!--      <a-->
      <!--        is="sui-menu-item"-->
      <!--        v-for="item in items"-->
      <!--        :active="isActive(item)"-->
      <!--        :key="item"-->
      <!--        :content="item"-->
      <!--        @click="select(item)"-->
      <!--      />-->

      <!--      <sui-button basic color="green" @click="theme()">Black</sui-button>-->




    </sui-menu>
    <sui-grid class="grid_main">
      <sui-grid-row>
        <sui-grid-column :width="3">
        </sui-grid-column>
        <sui-grid-column :width="10">

          <sui-grid column :width="15">

            <client-only>
              <date-picker placeholder="Год-месяц-день"
                           format='YYYY-MM-DD'
                           valueType="format"
                           v-model="date_today"
                           :lang="lang"
                           @change="theme"
              />
            </client-only>

            <sui-button
              compact
              :disabled="!date_today"
              :icon="icon"
              label-position="left"
              toggle
              content="Парсинг списка"
              :active="isActive"
              @click="setDate()"
            />

            <sui-button
              compact
              :icon="'pause'"
              label-position="left"
              content="Стоп"
              toggle
              :active="isActive"
              @click="setWork()"
            />

            <sui-button  @click="getLogs()" primary>Logs</sui-button>
          </sui-grid>



        </sui-grid-column>
        <sui-grid-column :width="3">
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column :width="3">
        </sui-grid-column>
        <sui-grid-column :width="10">

          <sui-grid column :width="15">
            <div style="width: 800px; height:400px;overflow-y: scroll;"  v-show="this.logs" >
            <sui-table striped  >
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>Logs</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row vertical-align="top" v-for="(log, key) in this.logs" :key="key">
                  <sui-table-cell>{{log}}</sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
            </div>
          </sui-grid>




        </sui-grid-column>
        <sui-grid-column :width="3">
        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column :width="3">
        </sui-grid-column>
        <sui-grid-column :width="10">

          <sui-grid column :width="15">

            <sui-button
              compact
              :icon="'pause'"
              label-position="left"
              toggle
              content="Парсинг карт"
              :active="isActiveGameParsing"
              @click="startGamePars()"
            />

            <sui-button
              compact
              :icon="icon"
              label-position="left"
              content="Стоп"
              toggle
              :active="isActiveGameParsing"
              @click="stopGamePars()"
            />

            <sui-button  @click="getGameLogs()" primary>Logs</sui-button>
          </sui-grid>

          <div style="width: 800px; height:400px;overflow-y: scroll;" v-show="this.logsGame" >
            <sui-table striped  >
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>Logs</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row vertical-align="top" v-for="(game, key) in this.logsGame" :key="key">
                  <sui-table-cell>{{game}}</sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </div>

        </sui-grid-column>
        <sui-grid-column :width="3">
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>


  </div>
</template>

<script>
  import ru from 'vue2-datepicker/locale/ru';
  import axios from "axios";

  export default {
    name: 'PointingMenuExample',
    data() {
      return {
        icon: 'play',
        content: 'Play',
        logs: null,
        logsGame: null,
        isActive: false,
        isActiveGameParsing: false,
        lang: ru,
        date_today: null,
        items: ['Главная'],
      };
    },
    async mounted() {
      let status
      let gameParsing
      await axios({
        method: 'post',
        url: '/api/parser/status'
      }).then(function (response) {status = response.data})
      .catch(function (error) {console.log(error);});
      this.isActive = status

      await axios({
        method: 'post',
        url: '/api/game/status'
      }).then(function (response) {gameParsing = response.data})
        .catch(function (error) {console.log(error);});
      this.isActiveGameParsing = gameParsing

      console.log('gameParsing '+gameParsing)
    },
    methods: {


      theme() {
        console.log(this.date_today)
        // console.log( this.$colorMode)
        //   this.$colorMode.preference = 'dark'
        //   switchTheme(
        //     currentTheme === E_THEME.LIGHT ? E_THEME.DARK : E_THEME.LIGHT,
        //      $colorMode
        //   );
      },



      async getLogs(){
        let logs
        await axios({
          method: 'post',
          url: '/api/parser/logs'
        }).then(function (response) {logs  = response.data})
          .catch(function (error) {console.log(error);});
        this.logs = logs
      },
      async getGameLogs(){
        let gamelogs
        await axios({
          method: 'post',
          url: '/api/game/logs'
        }).then(function (response) {gamelogs  = response.data})
          .catch(function (error) {console.log(error);});
        this.logsGame = gamelogs
        console.log(this.logsGame)
      },

      async startGamePars() {
        await axios({
          method: 'post',
          url: '/api/game',
          data: {
            "work": true,
          }
        }).then(function (response) {console.log(response);})
          .catch(function (error) {console.log(error);});
        this.isActiveGameParsing = !this.isActiveGameParsing
      },

      async stopGamePars() {
        let gameParsing
        await axios({
          method: 'post',
          url: '/api/game/stop',
          data: {
            "work": false,
          }
        }).then(function (response) {  console.log(response);  })
          .catch(function (error) {  console.log(error);  });
        await axios({
          method: 'post',
          url: '/api/game/status'
        }).then(function (response) {gameParsing = response.data})
          .catch(function (error) {console.log(error);});
         this.isActiveGameParsing = gameParsing
      },

      async setDate() {

        if (this.date_today !== null) {
          if (!this.isActive) {
            this.icon = 'play'
            this.content = 'Play'
          } else {
            this.icon = 'pause'
            this.content = 'Pause'
          }
          this.isActive = !this.isActive


          await axios({
            method: 'post',
            url: '/api/parser',
            data: {
              "date": this.date_today,
              "work": this.isActive,
            }
          }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }

      },

      async setWork() {

          await axios({
            method: 'post',
            url: '/api/parser/stop',
            data: {
              "work": false,
            }
          }).then(function (response) {
            console.log(response);
          })
            .catch(function (error) {
              console.log(error);
            });

            let status
            await axios({
              method: 'post',
              url: '/api/parser/status'
            }).then(function (response) {  status = response.data  })
              .catch(function (error) {  console.log(error);  });
            this.isActive = status

      }
    },
  };
</script>


<style lang="scss">

</style>
