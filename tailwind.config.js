// See https://tailwindcss.com/docs/configuration for details
module.exports = {
   purge: ['./src/**/*.tsx'],
   theme: {
      fontFamily: {
         primary: ['Oxanium', 'sans-serif'],
         secondary: ['KoHo', 'sans-serif'],
      },
      extend: {
         colors: {
            'black-mimi': '#333333',
            'orange-mimi': '#FE9C42',
            'violet-mimi': '#7E21F5',
            'green-mimi': '#46BA3C',
            'white-mimi': '#FFF2DF ',
            'mimi-disabled': '#968E7D',
         },
      },
   },
   variants: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
   },
   plugins: [],
};
