// 通过 css-loader 加载 css 文件
import '../css/04-style.css';

import $ from 'jquery';


$('body').append($('<p/>').addClass('bgRed').addClass("fgYellow").css('font-size', '40px').text('这是一个p标签'));