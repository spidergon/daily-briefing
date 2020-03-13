module.exports = function(config) {

  config.setBrowserSyncConfig({
    https: {
      key: '/home/chris/localhost.key',
      cert: '/home/chris/localhost.crt'
    }
  })

  config.addPassthroughCopy("src/js")

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    }
  }
}