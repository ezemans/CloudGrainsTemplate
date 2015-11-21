(function(){
	var loadCSS = require('./lib/loadCSS');
	var clickMobile = document.getElementById("clickM");
	var menuMobile = document.getElementById("menuM");
	clickMobile.addEventListener('click', onClickMobile);
	function onClickMobile(){
		menuMobile.classList.toggle("header__modules__menu__container--on")
	}

	loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css');
	loadCSS('https://fonts.googleapis.com/css?family=Open+Sans:400,300,600');
	}());