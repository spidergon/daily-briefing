const moment = require('moment')

module.exports = function (config) {
  // compress and combine js files
  config.addFilter('jsmin', require('./src/utils/minify-js.js'))

  // Date shortcode
  config.addShortcode('date', (value, country) => {
    return moment(value).locale(country.replace('us', 'en').replace('br', 'pt')).format('LLLL')
  })

  if (process.env.ELEVENTY_ENV == 'production') {
    // minify the html output when running in prod
    config.addTransform('htmlmin', require('./src/utils/minify-html.js'))
  }

  // config.setBrowserSyncConfig({
  //   https: {
  //     key: '/home/chris/localhost.key',
  //     cert: '/home/chris/localhost.crt'
  //   }
  // })

  // Static assets to pass through
  config.addPassthroughCopy('./src/site/css')

  return {
    dir: {
      input: 'src/site',
      includes: '_includes',
      output: 'dist',
    },
    passthroughFileCopy: true,
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
