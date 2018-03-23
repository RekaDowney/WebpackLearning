let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/js/06-plugin.js'),
    output: {
        filename: "06-plugin.js",
        path: path.resolve(__dirname, '../dist/js/')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 将 src/html/06-webpack-plugin.html 文件作为模板一起打包到 dist/js 目录下，同时自动添加 script 标签引入 06-plugin.js 文件
        // 注意 plugin 是从项目根目录下开始搜索文件
        new HtmlWebpackPlugin({template: './src/html/06-webpack-plugin.html'}),
        // 清除之前打包的文件（即清空 root 下的 dist 目录）
        new CleanWebpackPlugin(['dist'], {
            // 通过 root 指定根路径（必须是绝对路径）
            root: path.resolve(__dirname, '../'),
            // 可以通过 exclude 排除不删除的目录
            // exclude: ['img']
        })
    ]
};