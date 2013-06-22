(function(){
	if(localStorage.smallface){
		var el = document.createElement('link');
		el.href = 'css/smallface.css';
		el.rel = 'stylesheet';
		document.getElementsByTagName('head')[0].appendChild(el);
	}
})();