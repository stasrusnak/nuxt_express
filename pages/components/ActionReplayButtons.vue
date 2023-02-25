<template>
    <div class="action-buttons">
      <button class="btn btn-outline-success" @click="handleActionDown(data)">
        <sui-icon name="download" bordered  ></sui-icon>
      </button>
        <button class="btn btn-outline-success" @click="handleAction(data)">
            <sui-icon name="users" bordered  ></sui-icon>
        </button>
    </div>
</template>
<script>
  export default {
    name: "ActionReplayButtons",

    created() {

    },

    methods: {
      handleActionDown(actionName) {
        window.open('https://replays.irinabot.ru/94545/'+actionName.link,'_blank');

      },
      handleAction(actionName) {

        let link = actionName.link
        console.log(link)
        this.$router.push({ path: `/replays/${link}` })

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
