/**
 * Created by gxlzlihao on 16-4-1.
 */

var fragment2_initialized = false;
var fragment3_initialized = false;

$(document).ready(function(){

    $('div#introduction_options').children('div.bar_option').click(function(){
        $('div#introduction_options').children('div.bar_option').each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        // adjustment for the following fragments
        var index = $(this).index();
        $('div#introduction_fragments').children('div.fragment').each(function(){
            if ( $(this).index() == index ) {
                $(this).addClass('active');

                if ( index == 1 && fragment2_initialized == false) {
                    initialize_fragment2();
                    fragment2_initialized = true;
                }
                if ( index == 2 && fragment3_initialized == false) {
                    initialize_fragment3();
                    fragment3_initialized = true;
                }
            } else {
                $(this).removeClass('active');
            }
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

//    setup the initialization of the highlight moments browser images
    var moments = new Array();
    var focus_left_iter = null;
    var focus_right_iter = null;
    $('ul#highlight_alternatives').children('li').each(function(){
        moments.push( $(this).text() );
    });
    if ( moments.length == 0 ) {
        $('div#highlight_moments').css({'display':'none'});
    } else {
        $('img.prepare_left').css({'display':'none'});
        $('img.ready_left').css({'display':'none'});
        $('img.focus_left').css({'display':'inline-block'}).attr('src',moments[0]).attr('alt', moments[0]);
        focus_left_iter = 0;
        if ( moments.length > 1 ) {
            $('img.focus_right').css({'display':'inline-block'}).attr('src',moments[1]).attr('alt', moments[1]);
            focus_right_iter = 1;
        }
        if ( moments.length > 2 )
            $('img.ready_right').css({'display':'inline-block'}).attr('src',moments[2]).attr('alt', moments[2]);
        if ( moments.length > 3 )
            $('img.prepare_right').css({'display':'inline-block', 'z-index':'1', 'opacity':'0'}).attr('src',moments[3]).attr('alt', moments[3]);
    }

//    setup animation for the highlight moments browser
    var right_guide_callback = function() {
        console.log( "The highlight moments shift from left to right" );
        if ( $('img.ready_left').css('display') == 'none' ) return;
        $('img.prepare_right').remove();
        $('img.ready_right').css({'z-index':'1'}).animate({'opacity':'0'},'slow','linear',function(){
            $(this).removeClass('ready_right').addClass('prepare_right');
        });
        $('img.focus_right').animate({'opacity':'0.5', 'left':'1077px', 'right':'-468px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_right').addClass('ready_right');
            });
        focus_right_iter = focus_left_iter;
        $('img.focus_left').animate({'right':'47px', 'left':'562px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_left').addClass('focus_right');
            });
        focus_left_iter = focus_left_iter - 1;
        $('img.ready_left').animate({'opacity':'1', 'right':'562px', 'left':'47px'},
            'slow',
            'linear',function(){
                $(this).removeClass('ready_left').addClass('focus_left');
            });
        $('img.prepare_left').css({'z-index':'2'}).animate({'opacity':'0.5'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('prepare_left').addClass('ready_left');
                $('<image class="show_window prepare_left"></image>').appendTo('div#image_browser');
                if ( focus_left_iter - 2 >= 0 ) {
                    $('img.prepare_left').css({'display':'inline-block'}).attr( 'src', moments[focus_right_iter - 2] ).attr( 'alt', moments[focus_right_iter - 2] );
                } else {
                    $('img.prepare_left').css({'display':'none'})
                }
                $('img.prepare_left').css({'right':'1077px', 'left':'-468px', 'z-index':'1', 'opacity':'0'});
            });
    }
    var left_guide_callback = function() {
        console.log( "The highlight moments shift from right to left" );
        if ( $('img.ready_right').css('display') == 'none' ) return;
        $('img.prepare_left').remove();
        $('img.ready_left').css({'z-index':'1'}).animate({'opacity':'0'},'slow','linear',function(){
            $(this).removeClass('ready_left').addClass('prepare_left');
        });
        $('img.focus_left').animate({'opacity':'0.5', 'left':'-468px', 'right':'1077px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_left').addClass('ready_left');
            });
        focus_left_iter = focus_right_iter;
        $('img.focus_right').animate({'left':'47px', 'right':'562px'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('focus_right').addClass('focus_left');
            });
        focus_right_iter = focus_right_iter + 1;
        $('img.ready_right').animate({'opacity':'1', 'left':'562px', 'right':'47px'},
            'slow',
            'linear',function(){
                $(this).removeClass('ready_right').addClass('focus_right');
            });
        $('img.prepare_right').css({'z-index':'2'}).animate({'opacity':'0.5'},
            'slow',
            'linear',
            function(){
                $(this).removeClass('prepare_right').addClass('ready_right');
                $('<image class="show_window prepare_right"></image>').appendTo('div#image_browser');
                if ( focus_right_iter + 2 < moments.length ) {
                    $('img.prepare_right').css({'display':'inline-block'}).attr( 'src', moments[focus_right_iter + 2] ).attr( 'alt', moments[focus_right_iter + 2] );
                } else {
                    $('img.prepare_right').css({'display':'none'})
                }
                $('img.prepare_right').css({'left':'1077px', 'right':'-468px', 'z-index':'1', 'opacity':'0'});
            });
    }
    $('img#left_guide').click( left_guide_callback );
    $('img#right_guide').click( right_guide_callback );

});

var initialize_fragment2 = function() {

    //    The animation for the certificate gallery section
    var alternative_number = $('div#certificate_gallery').children('div.alternatives').children('ul').children('li').length;

        if ( alternative_number == 0 ) $('div#certificate_gallery').css({'display':'none'});
        if ( alternative_number == 1 ) {
            $('div#certificate_gallery').children('img.certificate_image.middle_left').css({'opacity':'0'});
            $('div#certificate_gallery').children('img.certificate_image.middle_right').css({'opacity':'0'});
            $('div#certificate_gallery').children('img.certificate_image.most_right').css({'opacity':'0'});
            $('div#certificate_gallery').children('img.certificate_image.most_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:first-child').text()
            ).css({'left':'593px'});
        }
        if ( alternative_number == 2 ) {
            $('div#certificate_gallery').children('img.certificate_image.most_right').css({'opacity':'0'});
            $('div#certificate_gallery').children('img.certificate_image.most_left').css({'opacity':'0'});
            $('div#certificate_gallery').children('img.certificate_image.middle_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:first-child').text()
            );
            $('div#certificate_gallery').children('img.certificate_image.middle_right').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:last-child').text()
            );
        }
        if ( alternative_number == 3 ) {
            $('div#certificate_gallery').children('img.certificate_image.most_right').css({'opacity':'0'});
            $('div#certificate_gallery').children('img.certificate_image.most_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:first-child').text()
            ).css({'left':'317px', 'right':'868px'});
            $('div#certificate_gallery').children('img.certificate_image.middle_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(2)').text()
            ).css({'left':'593px', 'right':'592px'});
            $('div#certificate_gallery').children('img.certificate_image.middle_right').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(3)').text()
            ).css({'left':'868px', 'right':'317px'});
        }
        if ( alternative_number >= 4 ) {

            $('div#certificate_gallery').children('img.certificate_image.most_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:first-child').text()
            );
            $('div#certificate_gallery').children('img.certificate_image.middle_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(2)').text()
            );
            $('div#certificate_gallery').children('img.certificate_image.middle_right').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(3)').text()
            );
            $('div#certificate_gallery').children('img.certificate_image.most_left').attr('src',
                $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(4)').text()
            );

            var left_iter = 1;
            var right_iter = 4;

            var btn_left = $('div#certificate_gallery').children('img.guide.left_arrow');
            var btn_right = $('div#certificate_gallery').children('img.guide.right_arrow');

            btn_left.click(function(){

                var hide_left = $('div#certificate_gallery').children('img.certificate_image.hide_left');
                var most_left = $('div#certificate_gallery').children('img.certificate_image.most_left');
                var middle_left = $('div#certificate_gallery').children('img.certificate_image.middle_left');
                var middle_right = $('div#certificate_gallery').children('img.certificate_image.middle_right');
                var most_right = $('div#certificate_gallery').children('img.certificate_image.most_right');
                var hide_right = $('div#certificate_gallery').children('img.certificate_image.hide_right');

                if ( right_iter < alternative_number ) {
                    hide_left.remove();
                    most_left.animate({'opacity':'0', 'left':'-95px', 'right':'1280px'}, 'slow', 'linear', function(){
                        $(this).removeClass('most_left').addClass('hide_left');
                    });
                    middle_left.animate({'left':'180px', 'right':'1005px'}, 'slow', 'linear', function(){
                        $(this).removeClass('middle_left').addClass('most_left');
                    });
                    middle_right.animate({'left':'455px', 'right':'730px'}, 'slow', 'linear', function(){
                        $(this).removeClass('middle_right').addClass('middle_left');
                    });
                    most_right.animate({'left':'730px', 'right':'455px'}, 'slow', 'linear', function(){
                        $(this).removeClass('most_right').addClass('middle_right');
                    });
                    hide_right.animate({'opacity':'1', 'left':'1005px', 'right':'180px'}, 'slow', 'linear', function(){
                        $(this).removeClass('hide_right').addClass('most_right');
                    });
                    right_iter = right_iter + 1;
                    left_iter = left_iter + 1;
                    var new_image_src = $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(' + right_iter + ')').text();
                    var new_hide_right = $("<image class='certificate_image hide_right'></image>");
                    new_hide_right.attr( 'src', new_image_src ).attr( 'alt', new_image_src );
                    new_hide_right.appendTo('div#certificate_gallery');
                }
            });

            btn_right.click(function(){

                var hide_left = $('div#certificate_gallery').children('img.certificate_image.hide_left');
                var most_left = $('div#certificate_gallery').children('img.certificate_image.most_left');
                var middle_left = $('div#certificate_gallery').children('img.certificate_image.middle_left');
                var middle_right = $('div#certificate_gallery').children('img.certificate_image.middle_right');
                var most_right = $('div#certificate_gallery').children('img.certificate_image.most_right');
                var hide_right = $('div#certificate_gallery').children('img.certificate_image.hide_right');

                if ( left_iter > 1 ) {
                    hide_right.remove();
                    most_right.animate({'opacity':'0', 'right':'-95px', 'left':'1280px'}, 'slow', 'linear', function(){
                        $(this).removeClass('most_right').addClass('hide_right');
                    });
                    middle_right.animate({'right':'180px', 'left':'1005px'}, 'slow', 'linear', function(){
                        $(this).removeClass('middle_right').addClass('most_right');
                    });
                    middle_left.animate({'right':'455px', 'left':'730px'}, 'slow', 'linear', function(){
                        $(this).removeClass('middle_left').addClass('middle_right');
                    });
                    most_left.animate({'right':'730px', 'left':'455px'}, 'slow', 'linear', function(){
                        $(this).removeClass('most_left').addClass('middle_left');
                    });
                    hide_left.animate({'opacity':'1', 'right':'1005px', 'left':'180px'}, 'slow', 'linear', function(){
                        $(this).removeClass('hide_left').addClass('most_left');
                    });
                    right_iter = right_iter - 1;
                    left_iter = left_iter - 1;
                    var new_image_src = $('div#certificate_gallery').children('div.alternatives').children('ul').children('li:nth-child(' + left_iter + ')').text();
                    var new_hide_left = $("<image class='certificate_image hide_left'></image>");
                    new_hide_left.attr( 'src', new_image_src ).attr( 'alt', new_image_src );
                    new_hide_left.appendTo('div#certificate_gallery');
                }

            });
        }

};

var initialize_fragment3 = function() {
//    To initialize the background-color and the location of each opinion area
    $('div.fragment').children('div.discussion_area').children('div.opinion').each(function(){
        var index = $(this).index();
        if ( index % 4 == 0 ) {
            $(this).children('div.opinion_area').css({'background-color':'#f25555'});
        } else if ( index % 4 == 1 ) {
            $(this).children('div.opinion_area').css({'background-color':'#faac46'});
            $(this).children('img.avatar').css({'right':'0', 'left':'810px'});
        } else if ( index % 4 == 2 ) {
            $(this).children('div.opinion_area').css({'background-color':'#3d96e3'});
        } else if ( index % 4 == 3 ) {
            $(this).children('div.opinion_area').css({'background-color':'#66ccbb'});
            $(this).children('img.avatar').css({'right':'0', 'left':'810px'});
        }
    });
};
