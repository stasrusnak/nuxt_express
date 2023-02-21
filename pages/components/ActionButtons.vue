<template>
    <div class="action-buttons">

        <button class="btn btn-outline-success" @click="handleAction(data)">

            <sui-icon name="users" bordered  ></sui-icon>

        </button>
    </div>
</template>
<script>
  export default {
    name: "ActionButtons",

    created() {

    },

    methods: {
      handleAction(actionName) {

        // this.$router.push({
        //   name: `users`,
        //   params: {
        //     obj: {...actionName}
        //   },
        // });


        let nick = actionName.nick
        this.$router.push({ path: `/users/${nick}` })

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
