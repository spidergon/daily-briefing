module.exports = function (config) {
  config.addFilter('jsmin', require('./src/utils/minify-js.js')) // compress and combine js files

  config.addShortcode('date', (value, country) => {
    return require('moment')(value).locale(country.replace('us', 'en').replace('br', 'pt')).format('LLLL')
  })

  if (process.env.ELEVENTY_ENV == 'production') {
    config.addTransform('htmlmin', require('./src/utils/minify-html.js'))
  }

  // config.setBrowserSyncConfig({
  //   https: {
  //     key: '/home/chris/localhost.key',
  //     cert: '/home/chris/localhost.crt'
  //   }
  // })

  config.addPassthroughCopy('./src/site/css')

  return {
    dir: {
      input: 'src/site',
      includes: '_includes',
      output: 'dist'
    },
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
