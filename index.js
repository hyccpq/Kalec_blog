require('@babel/register')({
    plugins: [
        'dynamic-import-node',
    ],
})
// require('babel-polyfill')

require('./server/index')
