const { DateTime }  = require('luxon');

module.exports = function(config) {

  // Date helpers
  config.addFilter('readableDate', date => DateTime.fromISO(date, { zone: 'utc' }).toFormat('LLLL d, y - h:m'))

  // compress and combine js files
  config.addFilter("jsmin", require("./src/utils/minify-js.js") )

  if (process.env.ELEVENTY_ENV == "production") {
    // minify the html output when running in prod
    config.addTransform("htmlmin", require("./src/utils/minify-html.js") )
  }

  config.setBrowserSyncConfig({
    https: {
      key: '/home/chris/localhost.key',
      cert: '/home/chris/localhost.crt'
    }
  })

  // Static assets to pass through
  config.addPassthroughCopy("./src/site/css");

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
    passthroughFileCopy: true,
    templateFormats : ["njk"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
  }
}