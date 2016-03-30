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

});
