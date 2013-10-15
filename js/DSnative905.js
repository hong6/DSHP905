

    var RLDSFall2013 = RLDSFall2013 || {};

    RLDSFall2013.DSpageSlider = function () {

        var cfDSSlideMoving = false,
        $divBack = jQuery("#divDSBack"),
        $divForward = jQuery("#divDSForward"),
        $nav = jQuery(".nav"),
        $divMain905 = jQuery("#divMain905"),
        $divinterview = jQuery("#divinterview"),
        $divSlide = jQuery("#divDSpageSlideList"),
        $divContainer = jQuery("#divDSpageSlideList"),

        init = function () {

            $divBack.css('cursor', 'pointer').click(function () {
                if (!cfDSSlideMoving) {
                    cfDSSlideMoving = true;
                    slideLeft();
                }
            });

            $divForward.css('cursor', 'pointer').click(function () {
                if (!cfDSSlideMoving) {
                    cfDSSlideMoving = true;
                    slideRight();
                }
            });

            $nav.css('cursor', 'pointer').click(function () {
                var id = jQuery(this).attr('id').substr(3, 1);
                slide((id - 1) * 940);
                $nav.removeClass("active");
                jQuery(this).addClass("active");
            });

            jQuery('.fbvevovideo').css('cursor', 'pointer').click(function (e) {
                e.preventDefault();
                showCustomLightbox('http://www.ralphlauren.com/graphics/media/polo/vevo_dns/indexvevo2.html', 940, 530);
            });
        },

        slideLeft = function () {
            var currentPostion = $divSlide.scrollLeft();
            slide(currentPostion - 940);
        },

        slideRight = function () {
            var currentPostion = $divSlide.scrollLeft();
            slide(currentPostion + 940);
        },

        slide = function (posX) {
            var indx = posX / 940 + 1;
            $nav.removeClass("active");
            jQuery('#nav' + indx).addClass("active");

            if (posX > 1) {
                $divBack.show();
            }
            else {
                $divBack.hide();
            }
            $divContainer.css("width", "940px");

            if (posX == 940) {
                $divForward.hide();
                $divContainer.css("width", "940px");
            }
            else {
                $divForward.show();
            }

            $divSlide.animate({ scrollLeft: posX }, "slow", function () {
                cfDSSlideMoving = false;
            });
        };

        return {
            init: init
        };
    } ();

    jQuery(document).ready(function () {
        jQuery('img.swapback').hover(function () { this.src = 'images/left_on.png'; }, function () { this.src = 'images/left_off.png'; });
        jQuery('img.swapforward').hover(function () { this.src = 'images/right_on.png'; }, function () { this.src = 'images/right_off.png'; });
        RLDSFall2013.DSpageSlider.init();
    });
