jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
    {
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }
    });

$(document).ready(function () {

    function animateSkills() {
        if ($('.skill').length > 0) {
            var counter = 1;
            $('.skill').each(function () {
                var el = $(this);
                var level = el.find('.level').attr('data-level');
                el.find('.level').delay(counter * 800).animate({
                    width: level + "%"
                }, 1500, "easeOutBack");
                counter++;
            });
        }
    }

    $(window).scroll(function () {
        var top_of_element = $("#skill-bars").offset().top;
        var bottom_of_element = $("#skill-bars").offset().top + $("#skill-bars").outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        var top_of_screen = $(window).scrollTop();

        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
            animateSkills();
        } else {

        }
    });


});