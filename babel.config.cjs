"use strict";

module.exports = function(api) {
  api.cache(true)
  const serverMode = process.env.BUILD_ENV === "server";
  console.log(serverMode, process.env.BUILD_ENV)

  const envOptsNoTargets = {
    loose: serverMode,
    // modules: 'auto',
    modules: serverMode ? false : 'auto',
    // exclude: ["transform-typeof-symbol"]

    // "useBuiltIns": "usage",
    // "corejs": 3,
    // "module": false,
    targets: serverMode ? {
      node: "13.2.0"
    } : {
      chrome: "58",
      ie: "11"
    }


  };
  const envOpts = Object.assign({}, envOptsNoTargets);

  const config = {
    // comments: false,
    presets: [["@babel/preset-env", envOpts]],
    plugins: [
      "@babel/plugin-transform-runtime",
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      "@babel/plugin-proposal-class-properties",
      [
        "import",
        {
          "libraryName": "iview",
          "libraryDirectory": "src/components"
        }
      ],
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions"
    ].filter(Boolean)
    // overrides: [
    //   {
    //     test: "packages/babel-parser",
    //     plugins: [
    //       "babel-plugin-transform-charcodes",
    //       ["@babel/transform-for-of", { assumeArray: true }],
    //     ],
    //   },
    //   {
    //     test: ["./packages/babel-cli", "./packages/babel-core"],
    //     plugins: [
    //       // Explicitly use the lazy version of CommonJS modules.
    //       convertESM
    //         ? ["@babel/transform-modules-commonjs", { lazy: true }]
    //         : null,
    //     ].filter(Boolean),
    //   },
    //   {
    //     test: "./packages/babel-polyfill",
    //     presets: [["@babel/env", envOptsNoTargets]],
    //   },
    //   {
    //     test: unambiguousSources,
    //     sourceType: "unambiguous",
    //   },
    // ].filter(Boolean),
  };

  // we need to do this as long as we do not test everything from source
  // if (includeCoverage) {
  //   config.auxiliaryCommentBefore = "istanbul ignore next";
  //   config.plugins.push("babel-plugin-istanbul");
  // }

  return config;
};
