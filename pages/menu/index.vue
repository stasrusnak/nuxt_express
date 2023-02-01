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
              :icon="icon"
              label-position="left"
              :content="content"
              toggle
              :active="isActive"
              @click="setDate()"
            />

          </sui-grid>


        </sui-grid-column>
        <sui-grid-column :width="3">
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>


  </div>
</template>

<script>
  import ru from 'vue2-datepicker/locale/ru';
  export default {
    name: 'PointingMenuExample',
    data() {
      return {
        icon: 'play',
        content: 'Play',
        isActive: true,
        lang: ru,
        date_today: null,
        items: ['Главная'],
      };
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

      setDate() {

        if (this.date_today !== null) {
          if (!this.isActive) {
            this.icon = 'play'
            this.content = 'Play'
          } else {
            this.icon = 'pause'
            this.content = 'Pause'
          }
          this.isActive = !this.isActive
        }

      }


    },
  };
</script>


<style lang="scss">

</style>
