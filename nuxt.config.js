export default async () => {

  // const port = process.env.BASE_PORT || '3000'
  // const host = process.env.BASE_HOST || '0.0.0.0'
  // const base_url = `http://${host}:${port}/`
  // const url = new URL(base_url);

  let mongoUrl = ''
  if (process.env.MONGO_CONNECT ) {
    mongoUrl = new URL(process.env.MONGO_CONNECT)
  }else{
    mongoUrl = ''
  }



  return {
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',

    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    },

    /*
    ** Global CSS
    */
    css: [
      '@/assets/main.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
      '~/plugins/global',
      '~/plugins/axios.js',
      { src: '~/plugins/vue-datepicker', ssr: false },
    ],


    // axios: {
    //   proxy: true
    // },
    // proxy: {
    //   "/api": process.env.BASE_URL
    // },
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true ,

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/dotenv'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
      // Doc: https://http.nuxtjs.org
      '@nuxt/http',
      'nuxt-basic-auth-module',
      'semantic-ui-vue/nuxt',
      '@nuxtjs/color-mode',
    ],
    /*
    ** Server Middleware
    */
    serverMiddleware: {
      '/api': '~/api'
    },


    basic: {
      name: mongoUrl.username || 'test',
      pass: mongoUrl.password || 'test',
      match: '/menu',
      enabled: true // require boolean value(nullable)
    },

    /* For deployment you might want to edit host and port
    */
      server: {
        port: 10001,     // default : 3000
        host: '0.0.0.0' // do not put localhost (only accessible from the host machine)
      },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
      transpile: [
        'animal-avatar-generator'
      ],
    }

  };


}




