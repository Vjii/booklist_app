// ===================== Re-usable components =====================



// ======= Toggle Visibility =======


function toggleVisibility(catchElement, className) {
   var element = document.getElementsByClassName(catchElement);
   element[0].classList.toggle(className);
}

// ======= Toggle a Class =======

function toggleClass(catchElement, className) {
	var element = document.getElementsByClassName(catchElement);
	element[0].classList.toggle(className);
}



// ===================== Implementions =====================



// ======= Navigation - Toggle Visibility =======

var navigation = document.getElementsByClassName("navigation__hamburger");

navigation[0].addEventListener("click", function() {
	toggleVisibility("navigation__ul", "navigation__ul--show");
	toggleClass("navigation__hamburger", "navigation__mobile-open")
});
