document.addEventListener("DOMContentLoaded", function(event) {

	var buttonMobileMenu = document.getElementsByClassName("navigation__mobile-switch");

	if (buttonMobileMenu[0]) {
		buttonMobileMenu[0].addEventListener("click", function() {
			document.getElementsByClassName("navigation__mobile-hamburger")[0].classList.toggle("navigation__mobile-switch--open");
			document.getElementsByClassName("navigation")[0].classList.toggle("navigation__mobile--open")
		});
	}

});
