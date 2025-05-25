const path = require('path');
// Create an automatic index.html that loads your bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Clean the dist/ folder before each build (otherwise obsolete files)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app/main.tsx', //departure file for depandancy graph
  output: {
    // Where to generate the bundle, with a hash for cache busting
    filename: 'bundle.[contenthash].js', //
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    // To make Webpack understand .ts, .tsx, .js files without having to specify the extension in imports
    extensions: ['.tsx', '.ts', '.js'], // to understand
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@entities': path.resolve(__dirname, 'src/entities/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@widgets': path.resolve(__dirname, 'src/widgets/'),
      '@data': path.resolve(__dirname, 'src/data/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
      '@app': path.resolve(__dirname, 'src/app/'),
    },
  },
  module: {
    rules: [
      // Rules for transforming different file types:
      {
        test: /\.tsx?$/,
        use: 'ts-loader', // Using ts-loader to compile TypeScript
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader', // Load SCSS with sass-loader → css-loader → style-loader
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'], // Load SCSS with sass-loader → css-loader → style-loader
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource', // Import image files as web assets
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    // Development server configuration (localhost:3000, auto-refresh)
    historyApiFallback: true,
    port: 3000,
  },
  mode: 'development', // later, we will put production for the production launch
};
