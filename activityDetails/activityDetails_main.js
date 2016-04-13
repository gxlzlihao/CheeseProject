/**
 * Created by gxlzlihao on 16-4-1.
 */

$(document).ready(function(){

    var image_hover_in_callback = function() {
        // when the mouse move inside the image
        $(this).siblings('div.image-cover').stop().css({'display':'block'}).animate({'opacity':'0.8'}, 'slow');
    };

    var image_hover_out_callback = function( event ) {
        // when the mosue move outside the image
        var _X = $(this).siblings('div.image-cover').offset().left;
        var _Y = $(this).siblings('div.image-cover').offset().top;
        var _width = $(this).siblings('div.image-cover').width();
        var _height = $(this).siblings('div.image-cover').height();
        if ( !( event.pageX > _X && event.pageX < _X + _width && event.pageY > _Y && event.pageY < _Y + _height ) )
            $(this).siblings('div.image-cover').stop().animate({'opacity':'0'}, 'slow', 'linear', function(){
                $(this).css({'display':'none'});
            });
    };

    $('img.background-image').mouseover( image_hover_in_callback );
    $('img.background-image').mouseout( image_hover_out_callback );
    $('img.top-image').mouseover( image_hover_in_callback );
    $('img.top-image').mouseout( image_hover_out_callback );
    $('div.recommendation_item').children('span').mouseover( image_hover_in_callback );
    $('div.recommendation_item').children('span').mouseout( image_hover_out_callback );
    $('div.image-cover').mouseover( null );
    $('div.image-cover').mouseout( null );

//    setup the initialization of the highlight moments browser images
    var moments = new Array();
    var focus_left_iter = null;
    var focus_right_iter = null;
    $('ul#highlight_alternatives').children('li').each(function(){
        moments.push( $(this).text() );
    });
    if ( moments.length == 0 ) {
        $('div#highlight_moments').css({'display':'none'});
    } else {
        $('img.prepare_left').css({'display':'none'});
        $('img.ready_left').css({'display':'none'});
        $('img.focus_left').css({'display':'inline-block'}).attr('src',moments[0]).attr('alt', moments[0]);
        focus_left_iter = 0;
        if ( moments.length > 1 ) {
            $('img.focus_right').css({'display':'inline-block'}).attr('src',moments[1]).attr('alt', moments[1]);
            focus_right_iter = 1;
        }
        if ( moments.length > 2 )
            $('img.ready_right').css({'display':'inline-block'}).attr('src',moments[2]).attr('alt', moments[2]);
        if ( moments.length > 3 )
            $('img.prepare_right').css({'display':'inline-block', 'z-index':'1', 'opacity':'0'}).attr('src',moments[3]).attr('alt', moments[3]);
    }

//    setup animation for the highlight moments browser
    var right_guide_callback = function() {
        console.log( "The highlight moments shift from left to right" );
        if ( $('img.ready_left').css('display') == 'none' ) return;
        $('img.prepare_right').remove();
        $('img.ready_right').css({'z-index':'1'}).animate({'opacity':'0'},'slow','linear',function(){
            $(this).removeClass('ready_right').addClass('prepare_right');
        });
        $('img.focus_right').animate({'opacity':'0.5', 'left':'1077px', 'right':'-468px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_right').addClass('ready_right');
            });
        focus_right_iter = focus_left_iter;
        $('img.focus_left').animate({'right':'47px', 'left':'562px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_left').addClass('focus_right');
            });
        focus_left_iter = focus_left_iter - 1;
        $('img.ready_left').animate({'opacity':'1', 'right':'562px', 'left':'47px'},
            'slow',
            'linear',function(){
                $(this).removeClass('ready_left').addClass('focus_left');
            });
        $('img.prepare_left').css({'z-index':'2'}).animate({'opacity':'0.5'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('prepare_left').addClass('ready_left');
                $('<image class="show_window prepare_left"></image>').appendTo('div#image_browser');
                if ( focus_left_iter - 2 >= 0 ) {
                    $('img.prepare_left').css({'display':'inline-block'}).attr( 'src', moments[focus_right_iter - 2] ).attr( 'alt', moments[focus_right_iter - 2] );
                } else {
                    $('img.prepare_left').css({'display':'none'})
                }
                $('img.prepare_left').css({'right':'1077px', 'left':'-468px', 'z-index':'1', 'opacity':'0'});
            });
    }
    var left_guide_callback = function() {
        console.log( "The highlight moments shift from right to left" );
        if ( $('img.ready_right').css('display') == 'none' ) return;
        $('img.prepare_left').remove();
        $('img.ready_left').css({'z-index':'1'}).animate({'opacity':'0'},'slow','linear',function(){
            $(this).removeClass('ready_left').addClass('prepare_left');
        });
        $('img.focus_left').animate({'opacity':'0.5', 'left':'-468px', 'right':'1077px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_left').addClass('ready_left');
            });
        focus_left_iter = focus_right_iter;
        $('img.focus_right').animate({'left':'47px', 'right':'562px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_right').addClass('focus_left');
            });
        focus_right_iter = focus_right_iter + 1;
        $('img.ready_right').animate({'opacity':'1', 'left':'562px', 'right':'47px'},
            'slow',
            'linear',function(){
                $(this).removeClass('ready_right').addClass('focus_right');
            });
        $('img.prepare_right').css({'z-index':'2'}).animate({'opacity':'0.5'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('prepare_right').addClass('ready_right');
                $('<image class="show_window prepare_right"></image>').appendTo('div#image_browser');
                if ( focus_right_iter + 2 < moments.length ) {
                    $('img.prepare_right').css({'display':'inline-block'}).attr( 'src', moments[focus_right_iter + 2] ).attr( 'alt', moments[focus_right_iter + 2] );
                } else {
                    $('img.prepare_right').css({'display':'none'})
                }
                $('img.prepare_right').css({'left':'1077px', 'right':'-468px', 'z-index':'1', 'opacity':'0'});
            });
    }
    $('img#left_guide').click( left_guide_callback );
    $('img#right_guide').click( right_guide_callback );

    $('span#bigger_map').click(function(){

        var document_width = $(document).width();
        var document_height = $(document).height();

        $('div#body_cover').css({ 'display':'block', 'width':document_width, 'height':document_height });
        $('div#map_browser').css( { 'display':'block', 'position':'absolute', 'top': $(document).scrollTop() + 100, 'left': '400px' } );
        $('div#map_browser').animate({'opacity':'1'}, 'slow');
    });

    $('div#body_cover').click(function(){
        $('div#map_browser').animate({'opacity':'0'}, 'slow', 'linear', function(){
            $(this).css({'display':'none'});
            $('div#body_cover').css({'display':'none'});
        });
    });

});
