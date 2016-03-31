/**
 * Created by gxlzlihao on 16-3-30.
 */

$(document).ready(function(){

    var picture_array = new Array();
    var target_picture = -1;

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
    var right_click_callback = function(){

        if ( target_picture == 0 || target_picture == -1 ) return;

        target_picture = target_picture - 1;

        $(this).parent().children('img.showup_left').animate({'width':'640px', 'height':'400px', 'top':'0', 'left':'370px', 'right':'370px', 'opacity':'1', 'z-index':'100'},
            'slow',
            'linear',
            function(){
                $(this).addClass('showup_focus').removeClass('showup_left');
            });
        $(this).siblings('img.showup_focus').animate({'width':'320px', 'height':'200px', 'top':'100px', 'left':'1060px', 'right':'0', 'opacity':'0.7', 'z-index':'50'},
            'slow',
            'linear',
            function(){
                $(this).addClass('showup_right').removeClass('showup_focus').css({'cursor':'pointer'});
                $(this).off( 'click' );
                $(this).one( 'click', right_click_callback );
            });
        var new_prepare_left = null;
        if ( target_picture - 1 >= 0 && $(this).siblings('img.showup_prepare_left').length > 0 &&
            ( $(this).siblings('img.showup_prepare_left').css('display') == 'none' || $(this).siblings('img.showup_prepare_left').attr('src') == null) ) {
            $(this).siblings('img.showup_prepare_left').css({'display':'block', 'opacity':'0'});
            $('img.showup_prepare_left').attr('src', picture_array[target_picture - 1]);
            $('img.showup_prepare_left').attr('alt', picture_array[target_picture - 1]);
        }
        $(this).siblings('img.showup_prepare_left').animate({'z-index': '50', 'opacity': '0.7'},
            'slow',
            'linear',
            function () {
                $(this).addClass('showup_left').removeClass('showup_prepare_left');
                new_prepare_left = $('<image class="showup_prepare_left"></image>');
                if (target_picture - 2 >= 0) {
                    new_prepare_left.appendTo('div.showup_area').css({'opacity': '0', 'z-index': '25'});
                    new_prepare_left.css({'display': 'block'});
                    new_prepare_left.attr('src', picture_array[target_picture - 2]);
                    new_prepare_left.attr('alt', picture_array[target_picture - 2]);
                } else {
                    new_prepare_left.appendTo('div.showup_area').css({'opacity': '0', 'z-index': '25'});
                    new_prepare_left.css({'display': 'none'});
                    new_prepare_left.attr('src', null);
                    new_prepare_left.attr('alt', null);
                }
                $(this).off( 'click' );
                $(this).one( 'click', left_click_callback );
            });

        $(this).parent().children('img.showup_right').animate({'z-index':'25', 'opacity':'0'},
            'normal',
            'linear',
            function(){
                $(this).siblings('img.showup_prepare_right').remove();
                $(this).addClass('showup_prepare_right').removeClass('showup_right');
            });

    };
    if ( $('img.showup_right').css('display') != 'none' )
        $('img.showup_right').one( 'click', right_click_callback );
    if( $('img#showup_right_arrow').css('display') != 'none' )
        $('img#showup_right_arrow').click( 'click', right_click_callback );

    var left_click_callback = function() {

        if ( target_picture == picture_array.length - 1 ) return;

        target_picture = target_picture + 1;

        $(this).parent().children('img.showup_right').animate({'width':'640px', 'height':'400px', 'top':'0', 'left':'370px', 'right':'370px', 'opacity':'1', 'z-index':'100'},
            'slow',
            'linear',
            function(){
                $(this).addClass('showup_focus').removeClass('showup_right');
            });
        $(this).siblings('img.showup_focus').animate({'width':'320px', 'height':'200px', 'top':'100px', 'left':'0', 'right':'1060px', 'opacity':'0.7', 'z-index':'50'},
            'slow',
            'linear',
            function(){
                $(this).addClass('showup_left').removeClass('showup_focus').css({'cursor':'pointer'});
                $(this).off( 'click' );
                $(this).one( 'click', left_click_callback );
            });
        $(this).parent().children('img.showup_left').animate({'z-index':'25', 'opacity':'0'},
            'normal',
            'linear',
            function(){
                $(this).siblings('img.showup_prepare_left').remove();
                $(this).addClass('showup_prepare_left')
                    .removeClass('showup_left')
                    .css({'opacity':'0', 'z-index':'25'});
            });
        var new_prepare_right = null;
        if ( target_picture + 1 < picture_array.length && $(this).siblings('img.showup_prepare_right').length > 0 &&
            ( $(this).siblings('img.showup_prepare_right').css('display') == 'none' || $(this).siblings('img.showup_prepare_right').attr('src') == null) ) {
            $(this).siblings('img.showup_prepare_right').css({'display':'block', 'opacity':'0'});
            $('img.showup_prepare_right').attr('src', picture_array[target_picture + 1]);
            $('img.showup_prepare_right').attr('alt', picture_array[target_picture + 1]);
        }
        $(this).siblings('img.showup_prepare_right').animate({'z-index':'50', 'opacity':'0.7'},
            'slow',
            'linear',
            function(){
                $(this).addClass('showup_right').removeClass('showup_prepare_right');
                new_prepare_right = $('<image class="showup_prepare_right"></image>');
                if (target_picture + 2 < picture_array.length) {

                    new_prepare_right.appendTo('div.showup_area').css({'opacity': '0', 'z-index': '25'});
                    new_prepare_right.css({'display': 'block'});
                    new_prepare_right.attr('src', picture_array[target_picture + 2]);
                    new_prepare_right.attr('alt', picture_array[target_picture + 2]);
                } else {
                    new_prepare_right.appendTo('div.showup_area').css({'opacity': '0', 'z-index': '25'});
                    new_prepare_right.css({'display': 'none'});
                    new_prepare_right.attr('src', null);
                    new_prepare_right.attr('alt', null);
                }
                $(this).off( 'click' );
                $(this).one( 'click', right_click_callback );
            });

    };
    if ( $('img.showup_left').css('display') != 'none' )
        $('img.showup_left').one( 'click', left_click_callback );
    if( $('img#showup_left_arrow').css('display') != 'none' )
        $('img#showup_left_arrow').click( 'click', left_click_callback );
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
    function setup_picture_image( node_name, picture_source ) {
        $( node_name ).attr( {'src': picture_source} );
        $( node_name ).attr( {'alt': picture_source} );
        if ( picture_source == null )
            $( node_name ).css( {'display':'none'} );
        else
            $( node_name ).css( {'display':'block'} );
    }

    $('img.picture').click(function(){

        picture_array = new Array();

        $(this).parent().children('img.picture').each(function() {
            picture_array.push( $(this).attr('src') );
        });

        target_picture = $(this).index();

        // set up the picture source url of the showup area
        setup_picture_image( 'img.showup_focus', picture_array[ target_picture ] );

        if ( target_picture - 1 >= 0 )
            setup_picture_image( 'img.showup_left', picture_array[target_picture - 1] );
        else
            setup_picture_image( 'img.showup_left', null );

        if ( target_picture - 2 >= 0 )
            setup_picture_image( 'img.showup_prepare_left', picture_array[target_picture - 2] );
        else
            setup_picture_image( 'img.showup_prepare_left', null );

        if ( target_picture + 1 < picture_array.length )
            setup_picture_image( 'img.showup_right', picture_array[target_picture + 1] );
        else
            setup_picture_image( 'img.showup_right', null );

        if ( target_picture + 2 < picture_array.length )
            setup_picture_image( 'img.showup_prepare_right', picture_array[target_picture + 2] );
        else
            setup_picture_image( 'img.showup_prepare_right', null );

        var top_offset = $(this).parent().parent().offset().top + 100;
        $('div.showup_area').css( {'top': top_offset} );
        $('div.showup_area').css({'display':'block'}).animate( {'opacity':'1'}, 'slow' );

        $('div#top_picture').animate( {'opacity':'0.25'}, 'slow' );
        $('div.content').each(function(){
            $(this).animate( {'opacity':'0.25'}, 'slow' );
        });
        var document_height = $(document).height();
        var document_width = $(document).width();
        $('div#cover').css({'display':'block', 'width':document_width, 'height':document_height});

    });

    var resume_callback = function(){

        $('div.showup_area').animate( {'opacity':'0'}, 'slow', 'linear', function(){ $('div.showup_area').css({'display':'none'}) } );
        $('div#top_picture').animate( {'opacity':'1'}, 'slow' );
        $('div.content').each(function(){
            $(this).animate( {'opacity':'1'}, 'slow' );
        });
        $('div#cover').css({'display':'none', 'width':0, 'height':0});

    };

    $('div#cover').click( resume_callback );

    $('div.showup_area').click( function(){

        var click_x = event.pageX;
        var click_y = event.pageY;
        var inside_image = false;

        $(this).children('img').each(function(){
            if ( $(this).css('display') != 'none' ) {

                if ( click_x >= $(this).offset().left && click_x <= ( $(this).offset().left + $(this).width() ) &&
                        click_y >= $(this).offset().top && click_y <= ( $(this).offset().top + $(this).height() ) )
                    inside_image = true;

            }
        });

        if ( inside_image == false )
            resume_callback();

    } );

});
