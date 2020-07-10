"use strict";
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.config.base.cjs");
const { resolve, join } = require("path");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const QiniuUploadPlugin = require("qiniu-upload-plugin");
const { qiniu } = require("../conf/qiniu");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const prod = process.env.NODE_ENV === "production";

const config = merge(base, {
  mode: prod ? "production" : "development",
  devtool: prod ? false : "source-map",
  entry: {
    app: [resolve(__dirname, "../../front/pages/index/client-entry.js")]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                css: [
                  prod ? MiniCssExtractPlugin.loader : "vue-style-loader",
                  "happypack/loader?id=css"
                ],
                stylus: [
                  prod ? MiniCssExtractPlugin.loader : "vue-style-loader",
                  "happypack/loader?id=stylus"
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "vue-style-loader",
          "happypack/loader?id=css"
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "vue-style-loader",
          "happypack/loader?id=stylus"
        ],
        exclude: [resolve(__dirname, "../../node_modules")]
      }
    ]
  },
  output: {
    path: resolve(__dirname, "../../public/dist"),
    filename: "[name].[hash:8].js",
    publicPath: "/"
  },
  optimization: {
    //包清单
    runtimeChunk: {
      name: "manifest"
    },
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        //项目公共组件
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },

        //第三方组件
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": "\"client\""
    }),
    new VueSSRClientPlugin(),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            {
              source: resolve(__dirname, "../../public/dist/vue-ssr-client-manifest.json"),
              destination: resolve(__dirname, "../server-build/vue-ssr-client-manifest.json")
            }
          ]
        }
        // {
        //   delete: [
        //     "./dist/bundle.js"
        //   ]
        // }
      ]
    })
  ]
});

// config.entry['app'].unshift('webpack-hot-middleware/client?reload=true');

if (prod) {
  // config.entry['app'].shift();

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].client.[hash:8].css"
      // chunkFilename: '[id].[hash:8].css'
    }),
    new OfflinePlugin({
      autoUpdate: true,
      responseStrategy: "cache-first",
      safeToUseOptionalCaches: true,
      relativePaths: false,
      publicPath: "https://static.kalecgos.top/",
      caches: {
        main: [],
        additional: [":rest:", ":externals:"],
        optional: ["*.chunk.js"]
      },
      externals: ["https://static.kalecgos.top", "https://lib.baomitu.com/vue/2.6.10/vue.min.js",
        "https://lib.baomitu.com/vue-router/3.0.7/vue-router.min.js"],
      ServiceWorker: {
        output: "index.sw.js",
        minify: true
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: join(
        __dirname,
        "../../public/dist/report-" + Date.now() + ".html"
      ),
      defaultSizes: "gzip",
      openAnalyzer: true,
      statsFilename: "stats.json"
    })
  );
  // 删除devtool
  delete config.devtool;
  config.plugins = config.plugins.concat([
    new QiniuUploadPlugin({
      publicPath: "https://static.kalecgos.top/",
      accessKey: qiniu.AK,
      secretKey: qiniu.SK,
      bucket: "static",
      zone: "Zone_z0",
      cover: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            },
            normalizeUnicode: false
          }
        ]
      },
      canPrint: true
    })
    // new UglifyJsPlugin({
    //     // 使用外部引入的新版本的js压缩工具
    //     parallel: true,
    //     uglifyOptions: {
    //         ie8: false,
    //         ecma: 6,
    //         warnings: false,
    //         mangle: true,
    //         output: {
    //             comments: false,
    //             beautify: false
    //         },
    //         compress: {
    //             // 在UglifyJs删除没有用到的代码时不输出警告
    //             warnings: false,
    //             // 删除所有的 `console` 语句
    //             // 还可以兼容ie浏览器
    //             drop_console: true,
    //             // 内嵌定义了但是只用到一次的变量
    //             collapse_vars: true,
    //             // 提取出出现多次但是没有定义成变量去引用的静态值
    //             reduce_vars: true
    //         }
    //     }
    // })
  ]);

  config.optimization.minimizer = [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
      // 等等详细配置见官网
    })
  ];
}

module.exports = config;
