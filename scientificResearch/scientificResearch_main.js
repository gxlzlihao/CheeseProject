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

});
