document.addEventListener("DOMContentLoaded", function(event) {

	var parameters = {
		clustersPerCategory: 3
	}

	// Functionality - RWD - add mobile dropdown menu behaviors
	var buttonMobileMenu = document.getElementsByClassName("navigation__mobile-switch");

	if (buttonMobileMenu[0]) {
		buttonMobileMenu[0].addEventListener("click", function() {
			document.getElementsByClassName("navigation__mobile-hamburger")[0].classList.toggle("navigation__mobile-switch--open");
			document.getElementsByClassName("navigation")[0].classList.toggle("navigation__mobile--open")
		});
	}

	// Functionality - UI/UX - add delete button confirmation pop up
	var buttonsDelete = document.getElementsByClassName("js-buttons--delete");

	if(buttonsDelete.length > 0) {

		for (var i = 0; i < buttonsDelete.length; i++) {
			buttonsDelete[i].addEventListener("submit", function(event) {
				if (!window.confirm("You are about to permanently delete this position and all its contents. Are you sure?")) {
						event.preventDefault();
						return false;
						console.log("Form submission cancelled.")
				}
			});
		}
	}

	// Functionality - UI/UX - show only one category and its content based on the active button; hide the rest
	var categoryTriggers = document.getElementsByClassName("js-hook--category-triggers");
	var categories = document.getElementsByClassName("js-hook--categories");
	var clusters = document.getElementsByClassName("js-hook--clusters");

	setStateLoop(categoryTriggers, 1, "js-state--active");
	setStateLoop(categories, 1, "js-state--visible");
	setStateLoop(clusters, parameters.clustersPerCategory, "js-state--visible");

	for (var i = 0; i < categoryTriggers.length; i++) {

		categoryTriggers[i].addEventListener("click", function(event) {

			var name = event.target.dataset.name;
			changeStateLoop(categoryTriggers, name, "js-state--active")
			changeStateLoop(categories, name, "js-state--visible");
			changeStateLoop(clusters, name, "js-state--visible");
		});
	}

});


// ------------------------------ Re-usable functions

// Apply state to event's active element and its corresponding content, remove from the rest
function changeStateLoop(elements, datasetName, classToToggle) {
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].dataset.name === datasetName) {
			elements[i].classList.add(classToToggle);
		} else {
			elements[i].classList.remove(classToToggle);
		}
	}
}

function setStateLoop(elements, rangeNumber, classToAdd) {
	for (var i = 0; i < rangeNumber; i++) {
		elements[i].classList.add(classToAdd);
	}
}
