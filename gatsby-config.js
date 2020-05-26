const tailwindConfig = require('./tailwind.config.js');

module.exports = {
   siteMetadata: {
      title: `iBox - Functional Training Box`,
      description: `iBox - Functional Training Box App`,
      author: `Miguel Rodriguez Serrano & Milan Matic`,
   },
   plugins: [
      `gatsby-plugin-eslint`,
      {
         resolve: `gatsby-plugin-postcss`,
         options: {
            postCssPlugins: [
               require(`tailwindcss`)(tailwindConfig),
               require(`autoprefixer`),
               ...(process.env.NODE_ENV === `production`
                  ? [require(`cssnano`)]
                  : []),
            ],
         },
      },
      {
         resolve: `gatsby-plugin-favicon`,
         options: {
            logo: './src/assets/images/gatsby-icon.png',
            icons: {
               android: true,
               appleIcon: true,
               appleStartup: true,
               coast: false,
               favicons: true,
               firefox: true,
               yandex: false,
               windows: false,
            },
         },
      },
   ],
};
