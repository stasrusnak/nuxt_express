<template>
    <div class="action-buttons">

        <button class="btn btn-outline-success" @click="handleAction(data)">
            <i class="fa fa-eye"></i>
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
        /* when the user clicks a button, that will trigger a mutation on our Vuex store
        The mutation may show a form for editing a resource, or maybe a popup box asking
        the user to confirm deleting a resource, or open a new page for the user to view
        a resource.
         */
        // this.$store.commit(actionName, this.data)

        console.log(actionName)
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
