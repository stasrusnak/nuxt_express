import axios from 'axios'

export default async () => {

  let body = {
    "collection": "coll",
    "database": "WC3_STATS",
    "dataSource": "Cluster0",
    "projection": {}
  }

  let data = {}

  await axios({
    method: 'post',
    url: process.env.MONGO_DATA_API,
    data: body,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_API_KEY,
    }
  }).then(function (response) {
    data = response.data.document
  })
    .catch(function (error) {
      console.log(error);
    });


  // console.log(data)


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
    css: [],

    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
      '~/plugins/global',
      '~/plugins/axios.js'
    ],

    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,

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
      'nuxt-basic-auth-module'
    ],

    /*
    ** Server Middleware
    */
    serverMiddleware: {
      '/api': '~/api'
    },


    basic: {
      name: data.name,
      pass: data.pass,
      match: '/users',
      enabled: true  // require boolean value(nullable)
    },

    /* For deployment you might want to edit host and port
    */
    // server: {
    //  port: 8000, // default: 3000
    //  host: '0.0.0.0' // default: localhost
    // },

    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {}
  };


}




