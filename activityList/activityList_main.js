/**
 * Created by gxlzlihao on 16-4-8.
 */

$(document).ready(function(){

    var colors = [ '#f25555', 'orange', 'blue', 'green'];

    $('div.item').each(function(){
        var iter = $(this).index();
        // console.log( iter + ' -- test' );
        $(this).children('div.right').children('div.seperation_bar').css({'background-color':colors[ iter % colors.length ]});
    });

});
