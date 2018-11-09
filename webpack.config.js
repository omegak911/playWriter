const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, './client/index.js')],
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3001, // Defaults to 8080
    contentBase: path.resolve(__dirname, './client/dist'),
    watchContentBase: true,
    proxy: {
      context: () => true,
      '/': 'http://localhost:3000',
      secure: false
    }
  },
};