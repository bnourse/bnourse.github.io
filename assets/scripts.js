window.addEventListener("load", function() {
	addNavToggleListener();
});

function addNavToggleListener() {
	nav_toggle = document.getElementsByClassName("nav-toggle")[0];
	nav_toggle.addEventListener("click", navToggleClicked);
}

function navToggleClicked(e) {
	e.preventDefault();	
	var nav_area = document.getElementsByClassName("nav-area")[0];
	var cur_display = nav_area.style.display;
	if(cur_display == "") {
		cur_display = window.getComputedStyle(nav_area).getPropertyValue("display");
	}
	setNavAreaTop();
	toggleDisplay(nav_area, cur_display);

}

function setNavAreaTop() {
	var title_area = document.getElementsByClassName("title-area")[0];
	title_area_height = title_area.offsetHeight;
	var nav_area = document.getElementsByClassName("nav-area")[0];
	nav_area.style.top = title_area_height + "px";
}

function toggleDisplay(node, cur_display) {
	if(cur_display == "none") {
		node.style.display = "flex"
	}
	else {
		node.style.display = "none"
	}
}