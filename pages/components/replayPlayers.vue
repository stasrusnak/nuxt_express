<template>
  <div style="max-width: 350px;">
    <sui-list v-for="(player, key) in data.players" :key="key" horizontal>
      <sui-list-item class="list_item" :style="'background-color:'+ setColor(player.color)">
        <span>{{player.playerName}}</span>
      </sui-list-item>
    </sui-list>
  </div>
</template>
<script>


  export default {
    data() {
      return {
        html: "",
      }
    },
    methods: {
      setColor(colour) {
        switch (colour) {
          case 'red':
            return "rgb(255 90 90 / 61%)";
          case 'green':
            return "rgb(126 237 126 / 61%)";
          case 'blue':
            return "rgb(65 131 196 / 61%)";
          case 'orange':
            return "rgb(255 196 87 / 61%)";
          case 'purple':
            return "rgb(187 72 187 / 61%)";
          case 'yellow':
            return "rgb(255 255 0 / 61%)";
          case 'pink':
            return "rgb(255 188 200 / 61%)";
          case 'teal':
            return "rgb(23 241 241 / 61%)";
          default:
            return "";
        }
      }
    },
    name: "replayName",
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  };
</script>


<style lang="scss">
  .list_item {
    border-radius: 4px;
    margin-left: 0;
    margin-right: 1em;
    color: #ffffff;

    span {
      font-size: 14px;
      padding: 5px;
      color: #000000;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.03);
      font-weight: 550;
    }
  }

</style>

