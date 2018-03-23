let path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/js/05-image.js'),
    output: {
        filename: "05-image.js",
        path: path.resolve(__dirname, '../dist/js')
    },
    module: {
        rules: [{
            test: /\.(jpg|jpeg|gif|png)$/,
            use: [
                {
                    // url-loader 跟 file-loader
                    // 这里的 outputPath 和 useRelativePath 两个参数在文件大于 8KB 时会传递到 file-loader 中，作为 file-loader 的配置项处理
                    loader: "url-loader?outputPath=img/&useRelativePath=true",
                    options: {
                        // 当文件小于 8KB 时，直接生成 DataURL 而不是加载文件
                        limit: 8192,
                        // 当文件大于 8KB 时，采用 file-loader 来加载文件
                        // 由于 url-loader 默认采用了 file-loader 作为次选加载器（文件大小大于指定值时的加载器）
                        // url-loader 内部封装了 file-loader，因此安装 url-loader 的时候可以不添加 file-loader
                        // fallback: 'file-loader'
                    }
                }
            ]
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
}
;