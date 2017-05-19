
// ======= Toggle Visibility =======


function toggleVisibility(className) {
    var element = document.getElementsByClassName(className);
   element[0].classList.toggle("navigation_display");
}

function classSwitch(className) {
	var element = document.getElementsByClassName(className);
	element[0].classList.toggle("navigation__mobile-open");
}

// ======= Navigation - Toggle Visibility =======

var navigation = document.getElementsByClassName("navigation__hamburger");

navigation[0].addEventListener("click", function() {
	toggleVisibility("navigation__ul");
	classSwitch("navigation__hamburger")
});
