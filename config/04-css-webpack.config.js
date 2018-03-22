const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, '../src/js/04-css.js'),
    output: {
        filename: "04-css.js",
        path: path.resolve(__dirname, '../dist/js')
    },
    module: {
        rules: [{
            // 当文件名称满足 /\.css$/ 正则表达式时，执行 style-loader 和 css-loader
            test: /\.css$/,
            use: [
                // 只有先通过 css-loader 加载完毕 CSS 之后才能够执行 style-loader 创建 style 标签
                // 由于 webpack loader 的特性是：一组链式的 loader 将按照相反的顺序执行
                // 因此 style-loader 必须放在 css-loader 前面，这样 css-loader 才能够先于 style-loader 执行
                {
                    // style-loader 负责将 css-loader 加载的 CSS 样式通过使用 <style> 注入到我们的 HTML 页面中
                    loader: 'style-loader'
                },
                {
                    // css-loader 负责加载通过 import 引入的 CSS 样式
                    loader: 'css-loader'
                },
            ]
        }]
    }
};