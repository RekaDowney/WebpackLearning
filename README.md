# webpack4

　　版本主要变动

- 支持零配置
- 必须通过`mode`或者`--model`选项配置`webpack`运行模式。仅支持`production`（生产环境模式）和`development`（开发环境模式）两种模式。前者注重优化，不支持自动化监听；后者注重版本迭代，支持自动化监听


## 环境搭建

　　确保已经安装了`Node`环境

```
    npm i -g webpack webpack-cli
    npm i --save-dev webpack webpack-cli
```

　　全局（局部）安装`webpack`和`webpack-cli`（`webpack4`要求同时安装`webpack`和`webpack-cli`，而`webpack3`仅需要安装`webpack`即可。）

## 打包 JS 模块

### 不配置`webpack.config.js`文件

　　在不配置`webpack.config.js`文件的情况下，可以直接通过`webpack --mode development src/js/entry.js`命令直接将`entry.js`文件及其依赖打包到`dist/main.js`文件中。

*实例*

```javascript

    // src/js/math.js
    function pow(base, exp = 2) {
        return base ** exp;
    }

    function square(base) {
        return pow(base);
    }

    function sqrt(base) {
        return pow(base, 0.5);
    }

    export {pow, sqrt, square};

    // src/js/entry.js
    import * as math from './math';
    import $ from 'jquery';

    // 引入并使用第三方包 jquery
    $('body')
        .append($('<p/>').text('2的平方 --> ' + math.square(2)))
        .append($('<p/>').text('4的开方 --> ' + math.sqrt(4)))
        .append($('<p/>').text('5的4次方 --> ' + math.pow(5, 4)));

```

　　执行`webpack --mode development src/js/entry.js`命令后，将会生成`dist/main.js`文件，将`dist/main.js`文件直接引入到`html`文件中，可以在浏览器中看到具体效果。

### 配置`webpack.config.js`文件

　　通过`webpack.config.js`文件可以配置`webpack`的打包过程

```javascript

    // webpack.config.js
    const path = require('path');

    module.exports = {
        // 指定为开发环境
        mode: "development",
        // 指定入口文件（输入）【绝对路径或者相对路径（以 ./ 或者 ../ 开头）】
        // entry: "./src/js/entry.js",
        entry: path.resolve(__dirname, "./src/js/01-entry.js"),
        // 指定打包后的文件（输出）
        output: {
            // 指定输出文件名称
            filename: "bundle.js",
            // 指定输出文件所在目录【只能够是绝对路径】
            path: path.resolve(__dirname, 'dist/js'),
        }
    };

```

　　执行`webpack`命令会搜索目录下存在的`webpack.config.js`或者`webpackfile.js`文件并执行该文件。可以通过`webpack --config ${configPath}`读取指定配置文件。

    在这里执行`webpack`命令将会`/src/js/01-entry.js`文件打包生成`dist/js/bundle.js`文件。

　　*特别注意*：一旦创建了`webpack.config.js`文件，那么之后如果再使用`webpack ${inputJsOrInputJsDir} -o ${distJs}`命令打包，那么会同时执行`webpack.config.js`的配置，从而导致部分`JS`模块的内容造成冲突。

## 打包 JSON 模块

　　`webpack`允许通过`import data/{prop} from ${jsonFile}`方式直接导入`JSON`文件，随后将`JSON`文件打包到`JS`文件中一起发布。

*例子*

```json

    // src/json/person.json
    {
      "username": "Reka",
      "age": 23,
      "gender": "male"
    }

```

```javascript

    // src/js/03-json-entry.js
    // 支持导入 JSON 文件，可以近似看成直接将 JSON 文件的 JSON 对象使用 export default {} 方式导出
    import person from '../json/person';
    import $ from 'jquery';

    // 可以只导入 json 文件的某个/些变量
    import {title} from '../json/book';

    $('body').append($('<p/>').text(JSON.stringify(person)));
    console.log(title);

```

```javascript

    // config/03-json-webpack.config.js
    const path = require('path');

    module.exports = {
        // 指定为开发环境
        mode: "development",
        // 指定入口文件（输入）【绝对路径或者相对路径（以 ./ 或者 ../ 开头）】
        // entry: "./src/js/entry.js",
        entry: path.resolve(__dirname, "../src/js/03-json-entry.js"),
        // 指定打包后的文件（输出）
        output: {
            // 指定输出文件名称
            filename: "03-json-entry.js",
            // 指定输出文件所在目录【只能够是绝对路径】
            path: path.resolve(__dirname, '../dist/js'),
        }
    };

```

　　执行`webpack --config config/03-json-webpack.config.js`命令可以将`src/js/03-json-entry.js`文件及其依赖打包成`dist/js/03-json-entry.js`。

## 打包 CSS 模块

　　`webpack`允许通过`import ${cssFile}`方式直接导入`CSS`文件，随后借助`css-loader`加载`CSS`文件并通过`style-loader`将`CSS`文件渲染到`HTML`的`style`标签。

*例子*

```stylesheet

    // src/css/04-style.css
    * {
        margin: 0;
        padding: 0;
    }

    body {
        background: antiquewhite;
    }

    .fgYellow {
        color: yellow;
    }

    .bgRed {
        background-color: red;
    }

```

```javascript

    // src/js/04-css.js
    // 通过 css-loader 加载 css 文件
    import '../css/04-style.css';

    import $ from 'jquery';

    $('body').append($('<p/>').addClass('bgRed').addClass("fgYellow").css('font-size', '40px').text('这是一个p标签'));

```

```javascript

    // config/04-css-webpack.config.js
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

```

　　首先执行`npm i -D css-loader style-loader`安装`css-loader`和`style-loader`开发依赖。

　　执行`webpack --config config/04-css-webpack.config.js`命令可以将`src/js/04-css.js`文件及其依赖打包成`dist/js/04-css.js`。

## 打包 IMAGE 模块

　　`webpack`允许通过`import ${img} from ${imgFile}`方式直接导入图片文件。或者通过直接在`CSS`文件中导入图片。

```css

    // src/css/05-table.css
    * {
        margin: 0;
        padding: 0;
    }

    table {
        clear: both;
        margin: 5px auto;
        text-align: center;
        width: 700px;
        border-collapse: collapse;
    }

    table th {
        padding: 3px;
        background: url("../img/blue.jpg") repeat-x;
        border: 1px solid lightgray;
    }

    table td {
        padding: 3px;
        background: url("../img/yellow.jpg") repeat-x;
        border: 1px solid lightgray;
    }

    .imgBox {
        width: 400px;
        height: 200px;
        background: url("../img/gt8.jpg") no-repeat;
    }

```

```javascript

    // src/js/05-table.css
    import '../css/05-table.css';

    import $ from 'jquery';

    let tbl = '<table>' +
        '<thead><tr><th>ID</th><th>名称</th><th>性别</th></tr></thead>' +
        '<tbody>' +
        '<tr><td>1</td><td>小明</td><td>男</td></tr>' +
        '<tr><td>2</td><td>小红</td><td>女</td></tr>' +
        '<tr><td>3</td><td>小白</td><td>男</td></tr>' +
        '</tbody>' +
        '</table>';

    $('body').append($(tbl)).append($('<div/>').addClass('imgBox'));

```

```javascript

    // config/05-image-webpack.config.js
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
    };

```

　　首先执行`npm i -D url-loader`安装`url-loader`开发依赖。

　　执行`webpack --config config/05-image-webpack.config.js`命令可以将`src/js/05-image.js`文件及其依赖打包成`dist/js/05-image.js`。

　　随后将`html`文件直接放在`dist/js`目录下。可以看到表格样式的两张图片是以`DataURL`方式存在（小于8KB），而另一张图片则从当前`html`文件所在目录下搜索。

## 插件

### clean-webpack-plugin 和 html-webpack-plugin 插件

*实例*

```javascript

    // src/js06-plugin.js
    import $ from 'jquery';
    import '../css/05-table.css';

    let tbl = '<table>' +
        '<thead><tr><th>ID</th><th>名称</th><th>性别</th></tr></thead>' +
        '<tbody>' +
        '<tr><td>1</td><td>小明</td><td>男</td></tr>' +
        '<tr><td>2</td><td>小红</td><td>女</td></tr>' +
        '<tr><td>3</td><td>小白</td><td>男</td></tr>' +
        '</tbody>' +
        '</table>';

    $('body').prepend($(tbl));

```

```html

    // src/html/06-webpack-plugin.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>webpack 插件</title>
        <!--
            执行 webpack --config config/06-plugin-webpack.config.js 打包模块并
            通过 html-webpack-plugin 插件将当前 html 文件复制到 dist/js 目录下，同时添加必要的 script 标签
        -->
    </head>
    <body>

    <div class="imgBox">
    </div>
    </body>
    </html>

```

```javascript

    // config/06-plugin-webpack.config.js
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

```

　　首先执行`npm i -D clean-webpack-plugin html-webpack-plugin`安装`clean-webpack-plugin`和`html-webpack-plugin`开发依赖。

　　执行`webpack --config config/06-plugin-webpack.config.js`命令，`CleanWebpackPlugin`会先清空目录，然后`HtmlWebpackPlugin`会根据`html`模板生成`dist/js/index.html`文件，同时在`body`末尾添加`script`标签引入`06-plugin.js`文件。

　　同时对`JS`、`CSS`以及图片进行模块化打包。最后可以直接访问`dist/js/index.html`看到效果。

```txt

    // CleanWebpackPlugin 执行日志
    clean-webpack-plugin: L:\Code\WebStorm_Code\WebpackLearning\dist has been removed.
    clean-webpack-plugin: 1 file(s) excluded - img

```