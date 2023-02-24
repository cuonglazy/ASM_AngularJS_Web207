;(function ($) {
    'use strict'

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show')
            }
        }, 1)
    }
    spinner()

    // Initiate the wowjs
    new WOW().init()

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px')
        } else {
            $('.sticky-top').css('top', '-100px')
        }
    })

    // Dropdown on mouse hover
    const $dropdown = $('.dropdown')
    const $dropdownToggle = $('.dropdown-toggle')
    const $dropdownMenu = $('.dropdown-menu')
    const showClass = 'show'

    $(window).on('load resize', function () {
        if (this.matchMedia('(min-width: 992px)').matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this)
                    $this.addClass(showClass)
                    $this.find($dropdownToggle).attr('aria-expanded', 'true')
                    $this.find($dropdownMenu).addClass(showClass)
                },
                function () {
                    const $this = $(this)
                    $this.removeClass(showClass)
                    $this.find($dropdownToggle).attr('aria-expanded', 'false')
                    $this.find($dropdownMenu).removeClass(showClass)
                }
            )
        } else {
            $dropdown.off('mouseenter mouseleave')
        }
    })

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow')
        } else {
            $('.back-to-top').fadeOut('slow')
        }
    })
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo')
        return false
    })

    // Header carousel
    $('.header-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>',
        ],
    })

    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    })
})(jQuery)
// Login 
// const signUpButton = document.getElementById('signUp')
// const signInButton = document.getElementById('signIn')
// const container = document.getElementById('container')

// signUpButton.addEventListener('click', () => {
//     container.classList.add('right-panel-active')
// })

// signInButton.addEventListener('click', () => {
//     container.classList.remove('right-panel-active')
// })
 
function ShowLoginForm(){
	
	SetTitle("Login");

	ShowHideForm("LoginFrom","Show");
	ShowHideForm("RegistrationFrom","Hide");
	ShowHideForm("ForgotPasswordForm","Hide");

	ActiveInactiveBtn("ShowLoginBtn","Active");
	ActiveInactiveBtn("ShowRegistrationBtn","Inactive");

	ShowHideFromSwitchBtn("Show");
};

function ShowRegistrationForm(){
	debugger;
	SetTitle("Registration");

	ShowHideForm("RegistrationFrom","Show");
	ShowHideForm("LoginFrom","Hide");
	ShowHideForm("ForgotPasswordForm","Hide");

	ActiveInactiveBtn("ShowLoginBtn","Inactive");
	ActiveInactiveBtn("ShowRegistrationBtn","Active");

	ShowHideFromSwitchBtn("Show");
};

function ShowForgotPasswordForm() {
	
	SetTitle("Đổi mật khẩu");

	ShowHideForm("RegistrationFrom","Hide");
	ShowHideForm("LoginFrom","Hide");
	ShowHideForm("ForgotPasswordForm","Show");

	ActiveInactiveBtn("ShowLoginBtn","Inactive");
	ActiveInactiveBtn("ShowRegistrationBtn","Inactive");
	ShowHideFromSwitchBtn("Hide");
}

function SetTitle(Title){
	var formTitle = document.getElementById('formTitle');
	formTitle.innerHTML = Title;
}

function ShowHideForm(FormID,ShowOrHide){
	var Form = document.getElementById(FormID);

	if(ShowOrHide == "Show"){
		Form.style.display = 'block';
	}else{
		Form.style.display = 'none';
	}
}

function ActiveInactiveBtn(ButtonID,ActiveORInactive) {
	debugger;
	var Button = document.getElementById(ButtonID);

	if(ActiveORInactive == "Active"){
		Button.classList.add('active');
	}else{
		Button.classList.remove('active');
	}
}

function ShowHideFromSwitchBtn(ShowOrHide) {
	var formSwitchBtn = document.getElementById('formSwitchBtn');
	if(ShowOrHide == 'Show'){
		formSwitchBtn.style.display = '';
	}else{
		formSwitchBtn.style.display = 'none';
	}
}

// end