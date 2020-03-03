import webpack from "webpack"
import path from "path"
import qs from "querystring"
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

process.env.NODE_ENV = process.env.NODE_ENV || "development"

export default {
	mode: process.env.NODE_ENV,
	devtool: "#eval-source-map",
	entry: ["webpack-hot-middleware/client", "./client/app.js"],
	output: {
		path: __dirname,
		filename: "bundle.js",
		publicPath: "/"
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: "./client/index.html",
			hash: true
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ["css/*.*", "js/*.*", "fonts/*.*", "images/*.*"]
		})
	],
	resolve: {
		extensions: ["*", ".js", ".jsx"],
		alias: {
			request: "browser-request"
		}
	},
	module: {
		rules: [
			// Javascript
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: path.join(__dirname, "client"),
				query: {
					env: {
						development: {
							plugins: ["react-hot-loader/babel"]
						}
					}
				}
			},
			{
				// config for es6 jsx
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: { localIdentName: "[path][name]-[local]" }
						}
					}
				]
			},
			{
				// config for images
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "images"
						}
					}
				]
			},
			{
				// config for fonts
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "fonts"
						}
					}
				]
			},
			{
				test: /\.(mp4|webm)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000
					}
				}
			}
		]
	}
}
