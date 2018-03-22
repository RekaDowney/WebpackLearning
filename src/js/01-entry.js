import * as math from './util/math';
import $ from 'jquery';

$('body')
    .append($('<p/>').text('2的平方 --> ' + math.square(2)))
    .append($('<p/>').text('4的开方 --> ' + math.sqrt(4)))
    .append($('<p/>').text('5的4次方 --> ' + math.pow(5, 4)));
