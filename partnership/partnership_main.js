/**
 * Created by gxlzlihao on 16/4/18.
 */

$(document).ready(function(){

    // reset the height of the night description section
    var div_height = $('div.section#night_description').height();
    var img_height = $('div.section#night_description').children('img.background_image').height();
    if ( div_height != img_height ) {
        $('div.section#night_description').children('img.background_image').css({ 'height':div_height });
    }

    $('div.section#introduction').children('button.join_button').click(function(){
        $("html,body").animate({ 'scrollTop':$("div.section#registration").offset().top }, 'slow' );
    });

});
