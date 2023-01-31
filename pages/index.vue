<template>
  <div class="container">
    <div>
      <Logo/>
      <h1 class="title">
        nuxt-express
      </h1>
      <div>
        <div class="links">
          <a
            href="/users"
            class="button--green"
          >
            Users List
          </a>
        </div>
      </div>
      <div>
          <data-table v-bind="parameters"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ActionButtons from "./components/ActionButtons";
  import NickName from "./components/nickName";

  export default {
    async asyncData({$http}) {
      const posts = await $http.$get('/api/posts')

      return {
        posts: posts,
      }
    },
    computed: {
      parameters() {
        return {
          data: this.posts,
          error: "",
          lang: "pt-br",
          actionMode: "single",
          columns: [
            {
              key: "rank",
              title: "rank",
              type: "number"
            },
            {
              key: "PTS",
              title: "PTS",
              type: "number"
            },
            {
              key: "nick",
              title: "Ник",
              component: NickName,
              sortable: false
            },
            {
              key: "Games",
              title: "Игр",
              sortable: false
            },
            {
              key: "wins",
              title: "Победы",
              sortable: false
            },
            {
              key: "leavers",
              title: "Ливы",
              sortable: false
            },
            {
              key: "lose",
              title: "Поражения",
              sortable: false
            },
            {
              key: "rmk",
              title: "RMK",
              sortable: false
            },
            {
              key: "ActionButtons",
              component: ActionButtons,
              sortable: false
            }
          ]
        };
      }
    },
    methods: {
      handleAction(action, payload) {
        console.log(action, payload)
        window.alert("check out the console to see the data logged");
      }
    }

  }
</script>

<style src="../assets/index.scss" lang="scss"></style>

