/**
 * Created by gxlzlihao on 16-4-7.
 */

$(document).ready(function(){

    var div_content_index = 0;
    $('div.content').each(function(){
        div_content_index = div_content_index + 1;
        if ( div_content_index % 2 != 0 ) {
            $(this).css({'background-color':'#fe0e0e0'});
        }
    });

    $('div.content').each(function(){

        var item_number = $(this).children('div.item').length;
        $(this).css({ 'height': Math.ceil(item_number / 3) * 370 - 20 });

        $(this).children('div.item').each(function(){
            var row_index = Math.ceil( ( $(this).index() + 1 ) / 3 );
            var col_index = ( $(this).index() + 1 ) % 3 == 0? 3 : ( $(this).index() + 1 ) % 3;
            $(this).css({ 'top': ( row_index - 1)  * 370, 'left': ( col_index - 1 ) * 368 });
        });

    });

    $('div.item').mouseenter(function(){
        $(this).children('div.item_cover').css({'display':'block'}).animate({'opacity':'0.8'}, 'slow');
    });

    $('div.item').mouseleave(function(){
        $(this).children('div.item_cover').animate({'opacity':'0'}, 'slow', 'linear', function(){
            $(this).css({'display':'none'});
        });
    });

});
