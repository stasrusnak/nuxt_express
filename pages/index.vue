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
      <sui-menu-item>
        <a class="button" href="/replays">
          Архив игр
        </a>
      </sui-menu-item>

      <sui-menu-item  >
          <a class="button" @click="setColor">
            <sui-icon :name="this.icon"  />
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
        icon:'moon'
      }
    },
    methods: {
      setColor() {
        let theme =   $nuxt.$colorMode.preference
        if(theme === 'system' || theme === 'light'){
          $nuxt.$colorMode.preference = 'dark'
          this.icon = 'sun'
        }else{
          $nuxt.$colorMode.preference = 'light'
          this.icon = 'moon'
        }
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
              title: "RANK",
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
              type: "string"
            },
            {
              key: "Games",
              title: "Игр",
              type: "number"
            },
            {
              key: "wins",
              title: "WIN",
              type: "number"
            },
            {
              key: "leavers",
              title: "Ливы",
              type: "number"
            },
            {
              key: "lose",
              title: "LOSE",
              type: "number"
            },
            {
              key: "winRate",
              title: "WinRate",
              type: "number"
            },
            {
              key: "INFO",
              component: ActionButtons,
              sortable:false
            }
          ],
          text: {
            searchText:"Поиск",
            perPageText:"Кол-во :entries",
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
    }

  }
</script>

<style src="../assets/index.scss" lang="scss"></style>

