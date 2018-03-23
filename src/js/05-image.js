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

