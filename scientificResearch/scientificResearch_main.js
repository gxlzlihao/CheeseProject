/**
 * Created by gxlzlihao on 16-4-8.
 */

$(document).ready(function(){

    $('div.item').mouseenter(function(){

        $(this).children('div.item_cover').css({'display':'block'}).animate({'opacity':'0.8'}, 'slow');

    });

    $('div.item').mouseleave(function(){

        $(this).children('div.item_cover').stop().animate({'opacity':'0'}, 'slow', 'linear', function(){
            $(this).css({'display':'none'});
        });

    });

    $('div#main div.section div.content').children('div.item').each(function(){
        var item_index = $(this).index();
        if ( item_index > 2 ) {
            var col_number = item_index % 3;
            var row_number = Math.floor( item_index / 3 );
            var new_top = row_number == 0 ? 0 : ( 420 * row_number );
            var new_left = col_number == 0 ? 0 : ( 368 * col_number );
            $(this).css({'z-index':'-1', 'top':new_top, 'left':new_left});
        }
    });

    $('div#main div.section').children('div.more_bar').click(function(){
        var is_close = $(this).hasClass('close');
        var item_number = $(this).prev().children('div.item').length;
        if ( is_close ) {
            // expand the content section
            if ( item_number > 3 ) {
                var new_height = Math.floor( item_number / 3 ) * 420 + 400;
                $(this).prev().animate({ 'height':new_height }, 'slow', 'linear', function(){
                    $(this).children('div.item').each(function(){
                        if ( $(this).index() > 2 ) {
                            $(this).css({'z-index':'0'});
                        }
                    });
                    $(this).next().removeClass('close').addClass('open');
                    $(this).next().children('div.more_button').children('img').attr('src','scientificResearch/arrow_up_icon.png');
                    $(this).next().children('div.more_button').children('span').html('收起');
                });
            }
        } else {
            // close the content section
            $(this).prev().children('div.item').each(function(){
                if ( $(this).index() > 2 ) {
                    $(this).css({'z-index':'-1'});
                }
            });
            $(this).prev().animate({'height':'400px'},'slow','linear',function(){
                $(this).next().removeClass('open').addClass('close');
                $(this).next().children('div.more_button').children('img').attr('src','scientificResearch/arrow_down_icon.png');
                $(this).next().children('div.more_button').children('span').html('查看更多');
            });
        }
    });

});
