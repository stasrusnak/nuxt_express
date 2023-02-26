import Vue from "vue"
import DataTable from "@andresouzaabreu/vue-data-table";
import "@andresouzaabreu/vue-data-table/dist/DataTable.css";
import 'semantic-ui-css/semantic.min.css';
import SuiVue from 'semantic-ui-vue';

Vue.use(SuiVue);
Vue.component("data-table", DataTable);


  // let E_THEME
  // if(process.client){
  //   E_THEME  = localStorage.getItem('theme');
  //   if(!E_THEME){
  //     localStorage.setItem('theme', 'light')
  //   }
  // }




