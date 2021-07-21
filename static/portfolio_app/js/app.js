$(document).ready(() => {
    $(window).on('resize', function () {
        screen = window.innerWidth;
        if (screen >= 958 && $('.open-cls-side-bar').hasClass('change')) {
            $(".open-cls-side-bar").removeClass('change')
            $('#check').prop('checked', false)
            $("body").removeClass('lock-screen')
            $('.nav-open').removeClass('nav-overlay')
        }
        if (screen && !$('.open-cls-side-bar').hasClass('change') && $('.vid-container').is(":visible")) {
            $("body").addClass('lock-screen')
        }
    })


    $(".side-lft-nd-main-nav").on("click", "li", function (e) {
        $("body").removeClass('lock-screen')
        $(".open-cls-side-bar").removeClass('change')
        $('#check').prop('checked', false)
        $('.nav-open').removeClass('nav-overlay')
    })
    $(".open-cls-side-bar").on("click", function (e) {
        $(this).toggleClass('change')
        $('.nav-open').toggleClass('nav-overlay')
        $("body").toggleClass('lock-screen')
    })
    $(window).on("click", function (e) {
        if ($(e.target).hasClass('nav-overlay')) {
            $('.nav-open').removeClass('nav-overlay')
            $(".open-cls-side-bar").removeClass('change')
            $('#check').prop('checked', false)
            $("body").removeClass('lock-screen')
        }
    })
    $(".watch").each(function (index, value) {
        $(value, index).on("click", function (e) {
            $(".close-vid-modal").removeClass('change')
            $('html, body').animate({ scrollTop: $(e.target).offset().top - 550 }, 1);
            $(".vid-container").eq(index).css('display', 'flex')
            $(".video-open").eq(index).addClass("video-overlay")
            $(".vid-container video").eq(index).css('transform', 'scale(1)')
            $(".right").css('z-index', '-1')
            $("body").addClass('lock-screen')
        })
    })

    $(".vid-container").each(function (index, value) {
        $(value, index).on("click", function (e) {
            if (this == value) {
                $(".vid-container").css({ 'display': 'none' })
                $(".vid-container video").eq(index).css('transform', 'scale(0)')
                $(".vid-container video").eq(index).get(0).pause()
                $("body").removeClass('lock-screen')
                $(".right").css('z-index', '1')
                $(".video-open").eq(index).removeClass("video-overlay")
            }
        })
    })
    $("#content-email").submit(function (e) {
        e.preventDefault();
        $successful = $(".contact-msg-sucess")
        let value_pro = []
        input_field = $(this).find("input,textarea")
        $.each(input_field, (index, value) => {
            value_pro.push($(value).val())
        });
        $.ajax({
            type: "POST",
            data: { csrfmiddlewaretoken: value_pro[0], name: value_pro[1], email: value_pro[2], subject: value_pro[3], message_box: value_pro[4] },
            dataType: "json",
            success: function (data, status, xhr) {
                $successful.css({ "display": "block" })
                $successful.toggle(1000, () => {
                    $successful.css({ "display": "block", "transition": "0.5" })
                })
                $(".contact-msg-sucess i").on('click', function (event) {
                    $(this).parent().css('display', "none")
                })
                $("#content-email")[0].reset()
            },
        })

    })
})
