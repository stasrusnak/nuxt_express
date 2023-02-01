// const DEFAULT_THEME = 'light'
//
// export const E_THEME = {
//   LIGHT:"light",
//   DARK:"dark",
// }
//
// const themeKeyInLocalStorage = "theme";
//
// export const currentTheme = (() => {
//   let E_THEME
//   if(process.client){
//    E_THEME  = localStorage.getItem(themeKeyInLocalStorage);
//   }
//
//
//   return (
//     (E_THEME) || ( DEFAULT_THEME)
//   );
// })();
//
// /** Загрузка темы из semantic-ui-sass
//  *
//  * @param {E_THEME} themeName Название темы (dark, light и т.д)
//  */
// // export const loadTheme = () => {
// //   return import(`./semantic-ui-sass/${currentTheme}/_index.scss`);
// // };
//
// /** Переключение темы сайта
//  *
//  * @param {E_THEME} themeName Название темы (dark, light и т.д)
//  */
// export const switchTheme = (E_THEME,mode) => {
//
//   if(process.client){
//     localStorage.setItem(themeKeyInLocalStorage, E_THEME);
//   }
//   document.location.reload();
// };
