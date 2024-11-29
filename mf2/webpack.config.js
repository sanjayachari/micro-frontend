const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
// const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 5174,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: ['.js', '.jsx'],  
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
        
      },
      {
        test: /\.css$/,  // Rule for CSS files
        use: ["style-loader", "css-loader"],  // Use the loaders
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    // new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
