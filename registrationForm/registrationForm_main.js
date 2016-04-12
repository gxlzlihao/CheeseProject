/**
 * Created by gxlzlihao on 16-4-10.
 */

$(document).ready(function(){

    var resume = function(){

        if ( $('div.project_small_item_options').css('display') == 'block' ) {
            $('div.project_small_item_options').css({ 'display' : 'none'});
            $('div.project_small_item_chooser').children('img.arrow').attr('src', 'registrationForm/select_arrow_down.png');
        }
        $('div.project_big_item_options').each(function() {
            if ($(this).css('display') == 'block') {
                $(this).css({'display': 'none'});
                $('div.project_big_item_chooser').children('img.arrow').attr('src', 'registrationForm/select_arrow_down.png');
            }
        });
        $('div#body_cover').css({'display':'none'});

    }

    $('div#body_cover').click( resume );

    $('div.project_small_item_chooser').click(function(){

        if ( $('div.project_small_item_options').css('display') == 'none' ) {

            $('div#body_cover').css({ 'width':$('body').width(), 'height':$('body').height(), 'display':'block' });

            var father_offset_left = document.getElementsByClassName('project_small_item_chooser')[0].offsetLeft;
            $(this).children('img.arrow').attr('src', 'registrationForm/select_arrow_up.png');
            $('div.project_small_item_options').css({'display': 'block', 'left': father_offset_left, 'top': '45px'});
        }
    });

    $('div.project_small_item_options').children('ul').children('li').click(function(){

        var target_item_index = $(this).index();

        var target_text = $(this).children('div.front_cover').text();
        $(this).parent().parent().siblings('div.project_small_item_chooser').children('span.result').text( target_text );

        $('div.project_big_item_options').each(function(){
            $(this).removeClass('target');
        });
        var default_value = null;
        $('div.project_big_item_options').each(function(){
            if ( ( $(this).index() - 4) == target_item_index ) {
                $(this).addClass('target');
                default_value = $(this).children('ul').children('li:first-child').children('div.front_cover').text();
            }
        });
        if ( default_value != null ) {
            $('div.project_big_item_chooser').children('span.result').text( default_value );
        }

        resume();

    });

    $('div.project_big_item_chooser').click(function(){

        if ( $('div.project_big_item_options.target').css('display') == 'none' ) {

            $('div#body_cover').css({ 'width':$('body').width(), 'height':$('body').height(), 'display':'block' });

            var father_offset_left = document.getElementsByClassName('project_big_item_chooser')[0].offsetLeft;
            $(this).children('img.arrow').attr('src', 'registrationForm/select_arrow_up.png');
            $('div.project_big_item_options.target').css({'display': 'block', 'left': father_offset_left, 'top': '45px'});
        }
    });

    $('div.project_big_item_options').children('ul').children('li').click(function(){

        var target_text = $(this).children('div.front_cover').text();
        $(this).parent().parent().siblings('div.project_big_item_chooser').children('span.result').text( target_text );
        resume();

    });

    var isNumber = function( obj ){
        return /^\d+$/.test( obj );
    }

    var isEmailAddress = function( obj ) {
        var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
        return Regex.test( obj );
    }

    $('div.form_item.submit_button').click(function(){
        $('h3.error_remind').each(function(){
            $(this).css({'opacity':'0'});
        });
        // check each input filed has error or is empty?
        var all_correct = false;
        $('div.form_item').each(function(){
            if ( $(this).children('input[type=text]').length > 0 ) {
                var input_text = $(this).children('input[type=text]').val();

                if ( $(this).children('span').text() == 'NAME' ) {
                    // for name
                    if ( input_text == '' ) {
                        $(this).next().text('Please input your name, and please do not leave the NAME field blank!').css({'opacity':'1'});
                        all_correct = false;
                    }
                } else if ( $(this).children('span').text() == 'PHONE' ) {
                    // for phone number
                    if ( input_text == '' ) {
                        $(this).next().text('Please input your phone number, and please do not leave the PHONE field blank!').css({'opacity':'1'});
                        all_correct = false;
                    } else if ( !isNumber( input_text ) ) {
                        $(this).next().text('Please input your phone number only using digital numbers!').css({'opacity':'1'});
                        all_correct = false;
                    }
                } else if ( $(this).children('span').text() == 'E-MAIL' ) {
                    // for email address
                    if ( input_text == '' ) {
                        $(this).next().text('Please input your email, and please do not leave the E-MAIL field blank!').css({'opacity':'1'});
                        all_correct = false;
                    } else if ( !isEmailAddress( input_text ) ) {
                        $(this).next().text('Please input your email address in the right formal!').css({'opacity':'1'});
                        all_correct = false;
                    }
                }
            }
        });

        if ( all_correct == true ) {

        //    TODO: submit the form

        }
    });

});
