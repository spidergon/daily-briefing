const { minify } = require('terser')

// module.exports = code => {
//   const minified = minify(code)
//   console.log(code, minified)
//   if (minified.error) {
//     console.log('Terser error: ', minified.error)
//     return code
//   }
//   return minified.code
// }

module.exports = async (code, callback) => {
  try {
    const minified = await minify(code)
    callback(null, minified.code)
  } catch (err) {
    console.error('Terser error: ', err)
    // Fail gracefully.
    callback(null, code)
  }
}
