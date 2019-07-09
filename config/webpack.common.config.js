/* eslint-disable */
'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getClientEnvironment = require('./env');
const paths = require('./paths');
// const ManifestPlugin = require('webpack-manifest-plugin');
const formatterFriendly = require('eslint-formatter-friendly-cn');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less/;
const lessModuleRegex = /\.module\.less$/;

// Ant Design 主题
const lessToJs = require('less-vars-to-js');
const modifyVars = lessToJs(fs.readFileSync(paths.appAntD, 'utf8'));

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor, preProcessorOptions) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  // if (preProcessor) {
  //   loaders.push(require.resolve(preProcessor));
  // }
  if (preProcessor) {
    loaders.push(!preProcessorOptions ?
      require.resolve(preProcessor) : {
        loader: require.resolve(preProcessor),
        options: preProcessorOptions,
      },
    );
  }
  return loaders;
};

const optimizationConfig = {
  // Automatically split vendor and commons
  // https://twitter.com/wSokra/status/969633336732905474
  // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
  splitChunks: {
    chunks: 'all',
    name: false,
  },
  // Keep the runtime chunk seperated to enable long term caching
  // https://twitter.com/wSokra/status/969679223278505985
  runtimeChunk: true,
};

const resolveConfig = {
  // This allows you to set a fallback for where Webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebook/create-react-app/issues/253
  modules: ['node_modules'].concat(
    // It is guaranteed to exist because we tweak it in `env.js`
    process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
  ),
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebook/create-react-app/issues/290
  // `web` extension prefixes have been added for better support
  // for React Native Web.
  extensions: paths.moduleFileExtensions
    .map(ext => `.${ext}`)
    .filter(ext => useTypeScript || !ext.includes('ts')),
  alias: {
    '@': paths.appSrc,
    '#': paths.appLib,
  },
  plugins: [
    // Adds support for installing with Plug'n'Play, leading to faster installs and adding
    // guards against forgotten dependencies and such.
    PnpWebpackPlugin,
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin([paths.appSrc, paths.appLib], [paths.appPackageJson]),
  ],
};

const resolveLoaderConfig = {
  plugins: [
    // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
    // from the current package.
    PnpWebpackPlugin.moduleLoader(module),
  ],
};

const eslintLoaderConfig = {
  test: /\.(js|mjs|jsx)$/,
  enforce: 'pre',
  // exclude: /node_modules/,
  // loader: 'eslint-loader',
  // options: {
  //   fix: true,
  //   formatter: formatterFriendly,
  //   eslintPath: require.resolve('eslint'),
  // },
  use: [{
    options: {
      // fix: true,
      // formatter: require.resolve('react-dev-utils/eslintFormatter'),
      formatter: formatterFriendly,
      eslintPath: require.resolve('eslint'),
    },
    loader: require.resolve('eslint-loader'),
  }, ],
  include: paths.appSrc,
};

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const urlLaoderConfig = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

// Process application JS with Babel.
// The preset includes JSX, Flow, and some ESnext features.
const jsLaoderConfig = (compact) => {
  return {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [paths.appSrc, paths.appLib],
    loader: require.resolve('babel-loader'),
    options: {
      customize: require.resolve(
        'babel-preset-react-app/webpack-overrides'
      ),
      plugins: [
        [
          require.resolve('babel-plugin-named-asset-import'),
          {
            loaderMap: {
              svg: {
                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
              },
            },
          },
        ],
      ],
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
      // Don't waste time on Gzipping the cache
      cacheCompression: false,
      compact: compact,
    },
  }
};

// Process any JS outside of the app with Babel.
// Unlike the application JS, we only compile the standard ES features.
const outJsLoaderConfig = (cacheCompression) => {
  return {
    test: /\.(js|mjs)$/,
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      configFile: false,
      compact: false,
      presets: [
        [
          require.resolve('babel-preset-react-app/dependencies'),
          {
            helpers: true
          },
        ],
      ],
      cacheDirectory: true,
      cacheCompression: cacheCompression,

      // If an error happens in a package, it's possible to be
      // because it was compiled. Thus, we don't want the browser
      // debugger to show the original code. Instead, the code
      // being evaluated would be much more helpful.
      sourceMaps: false,
    },
  };
}

const cssLoaderConfig = (shouldUseSourceMap) => [
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // `MiniCSSExtractPlugin` extracts styles into CSS
  // files. If you use code splitting, async bundles will have their own separate CSS chunk file.
  // By default we support CSS Modules with the extension .module.css
  {
    test: cssRegex,
    exclude: cssModuleRegex,
    loader: getStyleLoaders({
      importLoaders: 1,
      sourceMap: shouldUseSourceMap,
    }),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
  },
  // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
  // using the extension .module.css
  {
    test: cssModuleRegex,
    loader: getStyleLoaders({
      importLoaders: 1,
      sourceMap: shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    }),
  },
  // Opt-in support for SASS. The logic here is somewhat similar
  // as in the CSS routine, except that "sass-loader" runs first
  // to compile SASS files into CSS.
  // By default we support SASS Modules with the
  // extensions .module.scss or .module.sass
  {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders({
        importLoaders: 2,
        sourceMap: true,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
        camelCase: 'dashes',
      },
      'sass-loader',
    ),
  },
  // Adds support for CSS Modules, but using SASS
  // using the extension .module.scss or .module.sass
  {
    test: sassModuleRegex,
    use: getStyleLoaders({
        importLoaders: 2,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
      },
      'sass-loader',
    ),
  },
  // 添加 less-loader 处理 Ant Design 样式文件
  {
    test: lessRegex,
    exclude: paths.appSrc,
    include: paths.appNodeModules,
    use: getStyleLoaders({
        importLoaders: 2,
      },
      'less-loader', {
        modifyVars,
        javascriptEnabled: true,
      },
    ),
  },
  {
    test: lessModuleRegex,
    use: getStyleLoaders({
        importLoaders: 2,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
      },
      'less-loader', {
        javascriptEnabled: true,
      },
    ),
  },
];

// "file" loader makes sure assets end up in the `build` folder.
// When you `import` an asset, you get its filename.
// This loader doesn't use a "test" so it will catch all modules
// that fall through the other loaders.
const fileLoaderConfig = {
  loader: require.resolve('file-loader'),
  // Exclude `js` files to keep "css" loader working as it injects
  // it's runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const tsPlugin = useTypeScript &&
  new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }),
    async: false,
    checkSyntacticErrors: true,
    tsconfig: paths.appTsConfig,
    compilerOptions: {
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'preserve',
    },
    reportFiles: [
      '**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!src/setupProxy.js',
      '!src/setupTests.*',
    ],
    watch: paths.appSrc,
    silent: true,
    formatter: typescriptFormatter,
  });

const nodeConfig = {
  dgram: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty',
};

module.exports = {
  fs,
  path,
  resolve,
  webpack,
  PnpWebpackPlugin,
  HtmlWebpackPlugin,
  CaseSensitivePathsPlugin,
  InterpolateHtmlPlugin,
  WatchMissingNodeModulesPlugin,
  ModuleScopePlugin,
  getCSSModuleLocalIdent,
  getClientEnvironment,
  paths,
  formatterFriendly,
  ModuleNotFoundPlugin,
  ForkTsCheckerWebpackPlugin,
  typescriptFormatter,

  useTypeScript,

  modifyVars,
  getStyleLoaders,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
  lessRegex,
  lessModuleRegex,

  optimizationConfig,
  resolveConfig,
  resolveLoaderConfig,

  eslintLoaderConfig,
  urlLaoderConfig,
  jsLaoderConfig,
  outJsLoaderConfig,
  cssLoaderConfig,
  fileLoaderConfig,

  tsPlugin,

  nodeConfig
}