/**
 * Created by gxlzlihao on 16-4-7.
 */

$(document).ready(function(){

    $('div.showup_window').each(function(){
        var item_number = $(this).children('ul').children('li').children('div.showup_item').length;
        $(this).css({ 'width': ( item_number * 276 + 4 ) + 'px' });
        if ( item_number < 4 && item_number > 0 ) {
            $(this).css({'margin-left':'auto', 'margin-right':'auto'});
            $(this).parent().siblings('img.left_guide').css({'display':'none'});
            $(this).parent().siblings('img.right_guide').css({'display':'none'});
        }
    });

    $('div.showup_item').mouseenter(function(){
        $(this).children('div.item_cover').css({'display':'block'}).animate({'opacity':'0.8'}, 'slow');
    });

    $('div.showup_item').mouseleave(function(){
        $(this).children('div.item_cover').animate({'opacity':'0'}, 'slow', 'linear', function(){
            $(this).css({'display':'none'});
        });
    });

    var scroll_left_callback = function(){

        var target_showup_window = $(this).siblings('div.showup_area').children('div.showup_window');
        var item_number = target_showup_window.children('ul').children('li').children('div.showup_item').length;
        var max_left_positive_value = item_number * 276 - 16 - 1090;
        var now_left_value = target_showup_window.css('left').replace('px','').replace('-','');

        if ( parseInt( now_left_value ) < parseInt( max_left_positive_value ) ) {
            target_showup_window.animate( {'left':'-' + ( parseInt(now_left_value) + 276) + 'px'}, 'slow' );
        }

    };

    var scroll_right_callback = function(){

        var target_showup_window = $(this).siblings('div.showup_area').children('div.showup_window');
        var item_number = target_showup_window.children('ul').children('li').children('div.showup_item').length;
        var now_left_value = target_showup_window.css('left').replace('px','').replace('-','');

        if ( parseInt( now_left_value ) > 0 ) {
            target_showup_window.animate( {'left':'-' + ( parseInt(now_left_value) - 276) + 'px'}, 'slow' );
        }

    };

    $('img.left_guide').click( scroll_left_callback );
    $('img.right_guide').click( scroll_right_callback );


});
