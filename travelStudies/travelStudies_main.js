/**
 * Created by gxlzlihao on 16-4-7.
 */

function scroll(obj) {
    var tmp = (obj.scrollLeft)++;
    //当滚动条到达右边顶端时
    if (obj.scrollLeft==tmp) obj.innerHTML += obj.innerHTML;
    //当滚动条滚动了初始内容的宽度时滚动条回到最左端
    if (obj.scrollLeft>=obj.firstChild.offsetWidth) obj.scrollLeft=0;
}

function left( obj ){
    var _wrap= $(obj);
    var _interval= 1200;//定义滚动间隙时间
    var _moving;
    _wrap.hover(function(){
        if(_moving) clearInterval(_moving);
    },function(){
        _moving=setInterval(function(){
            var _field=_wrap.children(':first-child');
            var _h=_field.width();
            _field.animate({marginTop:-_h+'px'},600,function(){
                _field.css('marginTop',0).appendTo(_wrap);
            });
        },_interval);
    }).trigger('mouseleave');
};

$(document).ready(function(){

    $('div.showup_window').each(function(){
        var item_number = $(this).children('ul').children('li').children('div.showup_item').length;
        $(this).css({ 'width': ( item_number * 276 - 16 ) + 'px' });
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

    var scroll_to_left_function = function( wrap ){
        var obj = wrap.children(':first-child');
        var new_left = parseInt( obj.css('left').replace('px','').replace('-','') );
        obj.animate({ 'left':'-' + ( new_left + 100 ) + 'px' }, 'slow', 'linear', function(){
            var now_left = parseInt( obj.css('left').replace('px','').replace('-','') );
            if ( now_left > obj.width() ) {
                var new_obj = obj.clone();
                new_obj.css({'left':'0'});
                new_obj.appendTo( wrap );
                obj.remove();
            }
        });
    };

// var target_window;
//     $('img.left_guide').onmouseover(function(){
//
//         $('div.showup_window:first-of-type').clone().css({'left':'0'}).appendTo( $('div.showup_window:first-of-type').parent() );
//         setInterval( scroll_to_left_function( $('div.showup_window:first-of-type').parent() ), 20 );
//
//     });
//
//     $('img.left_guide').mouseleave(function(){
//         $(this).siblings('div.showup_area').children('div.showup_window').marquee('pause');
//     });
//
//     $('img.right_guide').mouseenter(function(){
//
//         // var target_window = $(this).siblings('div.showup_area').children('div.showup_window');
//         // target_window.direction = 'right';
//         target_window.marquee({
//             direction: 'right'
//         });
//         target_window.marquee('resume');
//
//     });
//
//     $('img.right_guide').mouseleave(function(){
//         $(this).siblings('div.showup_area').children('div.showup_window').marquee('pause');
//     });

});
