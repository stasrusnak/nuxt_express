<template>
  <div>
<!--    <div>-->
<!--      <Logo/>-->
<!--      <h1 class="title">-->
<!--        nuxt-express-->
<!--      </h1>-->
<!--      <div>-->
<!--        <div class="links">-->
<!--          <a-->
<!--            href="/users"-->
<!--            class="button&#45;&#45;green"-->
<!--          >-->
<!--            Users List-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
    <sui-menu inverted class="main-menu">
      <sui-menu-item>
        <a class="button" href="https://irinabot.ru/">
          IrInA Host B
          <sui-icon name="circle" style="margin: 0"/>
          T
        </a>
      </sui-menu-item>
    </sui-menu>

    <div class="container">
      <div >
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
          lang: "en",
          actionMode: "single",
          sortingMode:"single",
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
              sortable: true
            },
            {
              key: "wins",
              title: "Победы",
              sortable: true
            },
            {
              key: "leavers",
              title: "Ливы",
              sortable: true
            },
            {
              key: "lose",
              title: "Поражения",
              sortable: true
            },
            {
              key: "rmk",
              title: "RMK",
              sortable: false
            },
            {
              key: "Подробнее",
              component: ActionButtons,
              sortable: false
            }
          ],
          text: {
            searchText:"Поиск",
            perPageText:"Количество :entries",
            infoText: "Отображение :first - :last из :total пользователей",
            emptyTableText: "Пользователи не найдены :(",
            infoFilteredText: "Показаны :first - :last из :filtered (отфильтровано из :total записей)",
            nextButtonText: "След.",
            previousButtonText: "Пред.",
            paginationSearchText: "Перейти на страницу",
            paginationSearchButtonText: "Ок",
            downloadText: "Экспортировать как:",
            downloadButtonText: "Загрузить",
          }
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

<style src="../assets/index.scss" lang="scss">


</style>

