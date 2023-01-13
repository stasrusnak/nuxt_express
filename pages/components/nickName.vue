<template>
    <div>
        <div style="display:flex;" v-html="html" v-if="html" :key="this.data.nick"/>
        <span v-else>{{this.data.nick}}</span>
    </div>
</template>
<script>
  function hexToRgb(hex) {
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return r + "," + g + "," + b;
  }

  export default {
    data() {
      return {
        html: "",
      }
    },
    name: "NickName",
    methods: {
      setnick() {
        let pref = ""
        if (this.data.nick.indexOf('|') === 0) {
          let arr = this.data.nick.split('|');
          if (arr[0] !== "") {
            pref = arr[0]
            this.html += `<p>${pref}</p>`
          }
          arr.forEach(a => {
            let color = a.match(/^(.{9})(.*?)$/);
            if (color) {
              this.html += `<p style="color: rgb(${hexToRgb(color[1])});">${color[2]}</p>`
            }
          })
        }
      }
    },
    mounted() {
      this.setnick()
    },
    watch: {
      data() {
        this.html = ""
        this.setnick()
      }
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  };
</script>
