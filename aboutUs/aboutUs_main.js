/**
 * Created by lihao on 3/29/16.
 */

$(document).ready(function(){

    var longer = false;
    var tempSum = 0;

    $('div.aboutUs_content').each(function(){
        tempSum = tempSum + parseInt( $(this).css('height') ) + 20;
        if ( tempSum >= 360 ) longer = true;
        if ( longer == true ) $(this).width(660);
    });

});