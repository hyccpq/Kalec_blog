"use strict";
const path = require("path");
// const glob = require('glob')
const WebpackBar = require("webpackbar");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length - 1 ? os.cpus().length - 1 : 1
});
const { VueLoaderPlugin } = require("vue-loader");
const prod = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, "../../front", dir);
}

// const postCssLoader = {
//   loader: "postcss-loader",
//   options: {
//     // ident: "postcss",
//     plugins: [
//       require('autoprefixer')({ browsers: ['>10%'] })
//
//     ]
//   }
// }

const conf = {
  context: path.resolve(__dirname, "../"),
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("/")
    }
  },
  module: {
    rules: [
      {
        test: /iview\/.*?js$/,
        loader: "happypack/loader?id=babel"
      },
      {
        test: /\.js$/,
        loader: "happypack/loader?id=babel",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 具体配置见插件官网
              limit: 10000,
              name: "[name]-[hash:5].[ext]",
              outputPath: "img/" // outputPath所设置的路径，是相对于 webpack 的输出目录。
              // publicPath 选项则被许多webpack的插件用于在生产模式下更新内嵌到css、html文件内的 url , 如CDN地址
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: false,
                quality: 75
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
              // // the webp option will enable WEBP
              // webp: {
              //     quality: 75
              // }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter"
  },
  plugins: [
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: "babel",
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ["babel-loader?cacheDirectory"],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: "vue",
      loaders: ["vue-loader"],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: "stylus",
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ["css-loader?minimize", "stylus-loader"],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: "css",
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ["css-loader?minimize"],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool
    }),
    new VueLoaderPlugin(),
    new WebpackBar()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};

module.exports = conf;
