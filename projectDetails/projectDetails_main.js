/**
 * Created by gxlzlihao on 16-4-1.
 */

$(document).ready(function(){

    $('div#introduction_options').children('div.bar_option').click(function(){
        $('div#introduction_options').children('div.bar_option').each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        // adjustment for the following fragments
        var index = $(this).index();
        $('div#introduction_fragments').children('div.fragment').each(function(){
            if ( $(this).index() == index )
                $(this).addClass('active');
            else
                $(this).removeClass('active');
        });
    });

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

});
