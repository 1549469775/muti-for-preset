/**
 * 该文件是对文件加载器的抽取
 * ******
 * 有关loaders的加载顺序
 * ['css-loader','style-loader']
 * 这样是先用style-loader解析，然后再用css-loader解析文件。
 * 这样的解析顺序会有问题，此时就需要反过来用：
 * ['style-loader','css-loader']
 * ******
 * loader推荐
 * 官方：https://www.webpackjs.com/loaders/
 * ******
 */

// 提取CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 判断环境
const devMode = process.env.NODE_ENV !== 'production'
const rules = [
	// 对css,scss,sass进行解析，同时用postcss进行了处理
	{
		test: /\.(css|scss|sass)$/,
		use: [
			// style-loader 将模块的导出作为样式添加到 DOM 中
			// mini-css-extract-plugin 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
			devMode ? 'style-loader' : {
				loader: MiniCssExtractPlugin.loader,
				options: {
					// you can specify a publicPath here
					// by default it use publicPath in webpackOptions.output
					publicPath: '../'
				}
			},
			'css-loader',
			'postcss-loader',
			'sass-loader',
		]
	},
	// 使用babel处理js文件
	{
		test: /\.js$/,
		use: ["babel-loader"],
		// 不检查node_modules下的js文件
		// exclude: "/node_modules/"
	},
	// 对图片进行处理
	{
		test: /\.(png|jpg|gif)$/,
		use: [{
			// 需要下载file-loader和url-loader
			loader: "url-loader",
			options: {
				limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
				// 图片文件输出的文件夹
				outputPath: "images"
			}
		}]
	},
	// 字体文件加载器
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
		}
	},
	// 可以打包img标签中引用的图片
	{
		test: /\.html$/,
		// html中的img标签
		use: ["html-withimg-loader"]
	},
	// 支持处理less文件
	{
		test: /\.less$/,
		use: [
			devMode ? 'style-loader' : {
				loader: MiniCssExtractPlugin.loader,
				options: {
					// you can specify a publicPath here
					// by default it use publicPath in webpackOptions.output
					publicPath: '../'
				}
			},
			'css-loader',
			'postcss-loader',
			'less-loader',
		]
	},
];
module.exports = rules;