<template>
    <div>
         LTD x20 -prccah +{{data.idrep}}
    </div>
</template>
<script>
  export default {
    data() {
      return {
        html: "",
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
