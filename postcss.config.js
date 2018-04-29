module.exports = {
  plugin: [
    require('autoprefixer')({ browsers: ['>10%'] }),
    // require('cssnano')({
    //   preset: ['default', {
    //     discardComments: {
    //       removeAll: true
    //     },safe: true
    //   },{
    //     zindex: {
    //       exclude: true
    //     }
    //   }]
    // })
  ]
}
