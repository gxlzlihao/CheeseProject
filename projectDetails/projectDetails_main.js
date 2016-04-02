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

});
