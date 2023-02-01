<template>
  <div>
    <sui-menu inverted class="main-menu">

      <sui-menu-item as={NavLink} to="/" color="black">
        IrInA Host B
        <sui-icon name="circle" style="margin: 0"/>
        T
      </sui-menu-item>
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item)"
        :key="item"
        :content="item"
        @click="select(item)"
      />

<!--      <sui-button basic color="green" @click="theme()">Black</sui-button>-->

    </sui-menu>

    <sui-segment>
      <docs-wireframe name="paragraph"/>
    </sui-segment>
  </div>
</template>

<script>
  import { switchTheme, E_THEME, currentTheme } from "../../assets/Theme";


  export default {
    name: 'PointingMenuExample',
    data() {
      return {
        active: 'Home',
        items: ['Home', 'Messages', 'Friends'],
      };
    },
    methods: {


      // theme(){
      //   console.log( this.$colorMode)
      //     this.$colorMode.preference = 'dark'
      //     switchTheme(
      //       currentTheme === E_THEME.LIGHT ? E_THEME.DARK : E_THEME.LIGHT,
      //        $colorMode
      //     );
      // },
      //
      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },
    },
  };
</script>


<style lang="scss">
  .main-menu {
    border-radius: 0px !important;
  }

</style>
