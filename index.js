// require('@babel/register')({
//     plugins: [
//         'dynamic-import-node',
//     ],
// })
// require('babel-polyfill')

// require('./server/index')
;(async () => {
  ;(await import('@babel/register'))()
  import('./server/index.js')
})()
