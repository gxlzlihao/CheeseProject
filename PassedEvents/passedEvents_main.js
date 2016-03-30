/**
 * Created by gxlzlihao on 16-3-30.
 */

$(document).ready(function(){

    // set up the layout of the picture group
    $('div.picture_group').each(function(){
        var image_number = $(this).children('img').length;
        if ( image_number == 0 )
            $(this).height(0);
        else if ( image_number > 0 && image_number <= 3 )
            $(this).height(400);
        else if ( image_number > 3 && image_number <= 6 )
            $(this).height(600);
        else {
            var more_lines = ( image_number - 6 ) / 3;
            $(this).height( 600 + more_lines * 200 );
            var iter = 0;
            $(this).children('img.picture').each(function(){
                ++iter;
                if ( iter > 6 ) {
                    var new_left = ( iter - 6 ) % 3 > 0  ? ( ( iter - 6 ) % 3 - 1 ) * 320 : 640;
                    $(this).css( {'left':new_left} );
                    var new_top = ( Math.ceil( ( iter - 6 ) / 3  ) - 1 ) * 200 + 600;
                    $(this).css( {'top':new_top} );
                //    set up the other properties
                    $(this).css( {'position':'absolute', 'width':'320px', 'height':'200px'} );
                }
            });
        }
    });

    // set up animation of the showup area
    var left_click_callback = function(){
        $(this).animate({'width':'640px', 'height':'400px', 'top':'0', 'left':'370px', 'opacity':'1', 'z-index':'100'},
            'slow',
            'linear',
            function(){
                $(this).addClass('showup_focus').removeClass('showup_left');
                $(this).click(null);
            });
        $(this).siblings('img.showup_focus').animate({'width':'320px', 'height':'200px', 'top':'100px', 'left':'1060px', 'opacity':'0.7', 'z-index':'50'},
            'slow',
            'linear',
            function(){
                $(this).siblings('img.showup_prepare_right').remove();
                $(this).siblings('img.showup_right').addClass('showup_prepare_right').removeClass('showup_right');
                $(this).addClass('showup_right').removeClass('showup_focus');
            });
        var new_prepare_left = $(this).siblings('img.showup_prepare_left').clone();
        $(this).siblings('img.showup_prepare_left').animate({'z-index':'50', 'opacity':'0.7'},
            'slow',
            'linear',
            function(){
                new_prepare_left.appendTo('div.showup_area');
                // TODO: give the new_prepare_left element image source and alternative source
                $(this).addClass('showup_left').removeClass('showup_prepare_left');
                $(this).click( left_click_callback );
            });
        $(this).siblings('img.showup_prepare_right').animate({'z-index':'25', 'opacity':'0'}, 'normal');
    }
    $('img.showup_left').click( left_click_callback );
    // end of the animation setup

    // set up the hover into and outside animation of the picture
    $('img.picture').hover(function(){
        // when the mouse hover into the area
        // console.log("the mouse has entered the area");
        // $(this).animate({'width':'150%', 'height':'150%'}, 'slow');
    }, function(){
        // when the mouse hover outside the area
        // console.log("the mouse has left the area");
        // $(this).animate({'width':'100%', 'height':'100%'}, 'slow');
    });

    // set up the picture click animation
    $('img.picture').click(function(){
        //
    });

});
