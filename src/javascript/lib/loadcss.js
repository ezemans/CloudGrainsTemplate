var loadCSS = function(url){
	var loadStyles = document.createElement('link');
	loadStyles.rel = "stylesheet";
	loadStyles.href= url;
	document.head.appendChild(loadStyles);
	}
module.exports= loadCSS;