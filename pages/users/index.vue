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
            <sui-card-header>{{this.nick}}</sui-card-header>
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

        <div style="width: 800px; height:400px;overflow-y: scroll;"  v-show="this.maps" >


          <sui-table single-line>
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell>Name</sui-table-header-cell>
                <sui-table-header-cell>Registration Date</sui-table-header-cell>
                <sui-table-header-cell>E-mail address</sui-table-header-cell>
                <sui-table-header-cell>Premium Plan</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>

            <sui-table-body v-for="(log, key) in this.maps" :key="key" >
              <sui-table-row>
                <sui-table-cell>{{log.idrep}}</sui-table-cell>
                <sui-table-cell>{{log.date}}</sui-table-cell>
                <sui-table-cell>

<!--                  v-on:click="openGame(log)"-->

                  <a is="sui-list-header" @click.native="toggle(log)" >{{getNameMap(log.idrep)}}</a>
                  <sui-list-icon name="download" link size="large" v-on:click="downloadRep(log.link)" >
                  </sui-list-icon>
                </sui-table-cell>
                <sui-table-cell>{{log.time}} </sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>


<!--          <sui-table striped  >-->
<!--            <sui-table-header>-->
<!--              <sui-table-row>-->
<!--                <sui-table-header-cell>Архив игр</sui-table-header-cell>-->
<!--              </sui-table-row>-->
<!--            </sui-table-header>-->

<!--&lt;!&ndash;            date:"2023-02-09_01-15"&ndash;&gt;-->
<!--&lt;!&ndash;            date_insert:"2023-02-09T15:26:47.608Z"&ndash;&gt;-->
<!--&lt;!&ndash;            idrep:237&ndash;&gt;-->
<!--&lt;!&ndash;            leavers:[]&ndash;&gt;-->
<!--&lt;!&ndash;            link :"GHost++_2023-02-09_01-15_Legion_TD_x20_-prccah_+237_(46m31s).w3g"&ndash;&gt;-->
<!--&lt;!&ndash;            losers:[{nick: "rad004", PTS: 1017, prevPTS: 1024}, {nick: "A._.D", PTS: 1017, prevPTS: 1024},…]&ndash;&gt;-->
<!--&lt;!&ndash;            pars :1&ndash;&gt;-->
<!--&lt;!&ndash;            rmk:[]&ndash;&gt;-->
<!--&lt;!&ndash;            time : "46:31"&ndash;&gt;-->
<!--&lt;!&ndash;            winners:&ndash;&gt;-->
<!--            <sui-table-body>-->
<!--              <sui-table-row vertical-align="top" v-for="(log, key) in this.maps" :key="key">-->
<!--                <sui-table-cell>{{log}}</sui-table-cell>-->
<!--                <sui-table-cell>{{log}}</sui-table-cell>-->
<!--              </sui-table-row>-->
<!--            </sui-table-body>-->
<!--          </sui-table>-->

        </div>


        <nuxt-link class="button" to="/">
          Главная
        </nuxt-link>

        <sui-modal v-model="open" v-if="modelLog">
          <sui-modal-header v-show="modelLog.idrep">{{getNameMap(modelLog.idrep)}}</sui-modal-header>
          <sui-modal-content>
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
                  <sui-table-row   v-for="(log, key) in modelLog.losers" :key="key">
                    <sui-table-cell>{{log.nick}} {{log.prevPTS}} -> {{log.PTS}}</sui-table-cell>
                  </sui-table-row>
                  <sui-table-row  v-for="(lo, k) in modelLog.winners" :key="k">
                    <sui-table-cell>{{lo.nick}} {{lo.prevPTS}} -> {{lo.PTS}}</sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </div>

            <sui-modal-description>
              <sui-header>Default Profile Image</sui-header>
              <p>
                We've found the following gravatar image associated with your e-mail
                address.
              </p>
              <p>Is it okay to use this photo?</p>
            </sui-modal-description>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="toggle">
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
  import axios from 'axios'
  export default {
    data: () => ({
      posts: [],
      nick: null,
      obj: null,
      maps: null,
      open: false,
      modelLog: null
    }),

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
      openGame(log){
        this.$router.push({
          name: `games`,
          params: {
            obj: {...log}
          },
        });

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
