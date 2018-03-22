// 支持导入 JSON 文件，可以近似看成直接将 JSON 文件的 JSON 对象使用 export default {} 方式导出
import person from '../json/person';
import $ from 'jquery';

// 可以只导入 json 文件的某个/些变量
import {title} from '../json/book';

$('body').append($('<p/>').text(JSON.stringify(person)));
console.log(title);
