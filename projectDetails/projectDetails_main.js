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
    }

    var image_hover_out_callback = function() {
        // when the mosue move outside the image
    }

    $('img.background-image').hover( image_hover_in_callback, image_hover_out_callback );
    $('img.top-image').hover( image_hover_in_callback, image_hover_out_callback );

});
