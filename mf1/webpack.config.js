const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
// const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 5173,
  },
  output: {
    publicPath: "auto",
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
      name: "app1",
      remotes: {
        app2: "app2@http://localhost:5174/remoteEntry.js",
      },
      shared: {'react': {singleton: true}, "react-dom": {singleton: true}},
    }),
    // new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
