<template>
  <div>

    <sui-menu inverted class="main-menu">
      <sui-menu-item>
        <a class="button" href="https://irinabot.ru/">
          IrInA Host B
          <sui-icon name="circle" style="margin: 0"/>
          T
        </a>
      </sui-menu-item>
      <sui-menu-item>
        <a class="button" href="/">
          Главная
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
  import ActionReplayButtons from "./../components/ActionReplayButtons";
  import NickName from "./../components/nickName";
  import replayName from "./../components/replayName";
  import replayPlayers from "./../components/replayPlayers";

  export default {
    async asyncData({$http}) {
      const replays = await $http.$get('/api/replays')
      return {
        posts: replays,
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
              key: "idrep",
              title: "ID",
              type: "number",
            },
            {
              key: "date",
              title: "Дата",
              type: "string"
            },
            {
              key: "players",
              title: "Игроки",
              component: replayPlayers,
              type: "string",
              searchable: true,
            },
            {
              key: "link",
              title: "Ник",
              component: replayName,
              type: "string"
            },
            // {
            //   key: "Games",
            //   title: "Игр",
            //   type: "number"
            // },
            // {
            //   key: "wins",
            //   title: "WIN",
            //   type: "number"
            // },
            // {
            //   key: "leavers",
            //   title: "Ливы",
            //   type: "number"
            // },
            // {
            //   key: "lose",
            //   title: "LOSE",
            //   type: "number"
            // },
            // {
            //   key: "rmk",
            //   title: "RMK"
            // },
            {
              key: "INFO",
              component: ActionReplayButtons,
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
    },
    methods: {
      handleAction(action, payload) {
        console.log(action, payload)
        window.alert("check out the console to see the data logged");
      }
    }

  }
</script>

<style src="../../assets/index.scss" lang="scss"></style>

