$(function(){
    showBackground();
    resizeWindow();
    autocompleteForAccount();
    
    // 选择登录状态
    $('#stateList li').each(function(){
        $(this).click(function(){
            $('#state').attr('state', $(this).attr('state'));
            $('#stateList').hide();
            return false;
        });
    });
});

/**
 * 根据时间段显示不同登录背景
 */
function showBackground(){
    var timeClass = '';
    
    var time = new Date();
    var hours = time.getHours();
    if (0 <= hours && hours < 4) {
        timeClass = 'night';
    }
    else if (4 <= hours && hours < 5) {
        timeClass = 'beforedawn';
    }
    else if (5 <= hours && hours < 7) {
        timeClass = 'dawn';
    }
    else if (7 <= hours && hours < 10) {
        timeClass = 'morning';
    }
    else if (10 <= hours && hours < 14) {
        timeClass = 'noon';
    }
    else if (14 <= hours && hours < 17) {
        timeClass = 'afternoon';
    }
    else if (17 <= hours && hours < 19) {
        timeClass = 'dusk';
    }
    else if (19 <= hours && hours < 22) {
        timeClass = 'evening';
    }
    else if (22 <= hours && hours < 24) {
        timeClass = 'night';
    }
    
    $('body').addClass(timeClass);
}

/**
 * 重新计算登录窗口大小
 */
function resizeWindow(){
    chrome.windows.getCurrent(function(w) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var fwidth = w.width;
        var fheight = w.height;
        console.log(fwidth);
        console.log(fheight);
        
        if(width != 380){
            var fullWidth = fwidth + 380 - width;
            console.log(fullWidth);
        }
        if(height != 292){
            var fullHeight = fheight + 292 - height;
            console.log(fullHeight);
        }
        
        chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
            width: fullWidth,
            height: fullHeight
        });
    });
}

/**
 * 号码自动提示
 */
function autocompleteForAccount(){
    // @todo: 读取本地号码历史
    var historyAccounts = [
       { value: '55033782', data: '55033782' },
       { value: '123456789', data: '123456789' },
       { value: '113132', data: '113132' },
       { value: '1021333312', data: '1021333312' },
       { value: '15555555', data: '15555555' },
       { value: '441444444', data: '441444444' },
       { value: '439121681', data: '439121681' },
       { value: '219433681', data: '219433681' },
       { value: '6666666', data: '6666666' }
    ];
    
    $('#account').autocomplete({
        lookup: historyAccounts,
        maxHeight: 118,
        autoSelectFirst: true
    });
}

var login = false;
var stateListHover = false;

window.onunload = function(){
	chrome.extension.sendMessage('clogin');
}

document.getElementById('regacc').onclick = function(){
	window.open('http://ptlogin2.qq.com/qq_signup', '_blank');
}

document.getElementById('fgtpwd').onclick = function(){
	window.open('http://ptlogin2.qq.com/forget_pwd', '_blank');
}

chrome.extension.onMessage.addListener(function(request, sender) {
	if(request == 'finish'){
		self.close();
	}
	else if(request == 'cancel'){
		if(!localStorage.logout && localStorage.autoLogin && localStorage.account && localStorage.password){
			localStorage.autoShow = 'true';
		}
		login = false;
		document.getElementById('loginButtonInner').innerHTML = '登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录';
		document.getElementById('beforeLogin').style.display = 'block';
		document.getElementById('afterLogin').style.display = 'none';
	}
});

var logining = location.search.substr(1);
if(logining == '101'){
	login = true;
	document.getElementById('loginButtonInner').innerHTML = '取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消';
	document.getElementById('beforeLogin').style.display = 'none';
	document.getElementById('afterLogin').style.display = 'block';
}

if(localStorage.rememberPwd){
	document.getElementById('rememberPwd').checked = 'checked';
}

if(localStorage.autoLogin){
	document.getElementById('autoLogin').checked = 'checked';
}

if(localStorage.account){
	document.getElementById('account').value = localStorage.account;
}

if(localStorage.password){
	document.getElementById('password').value = encodeURIComponent(localStorage.password);
}

if(localStorage.state){
	document.getElementById('state').setAttribute('state', localStorage.state);
}

document.getElementById('loginButtonInner').onclick = doLogin;

document.getElementById('state').onclick = function(){
	document.getElementById('stateList').style.display = 'block';
}

document.getElementById('state').onmouseover = function(){
	stateListHover = true;
}

document.getElementById('state').onmouseout = function(){
	stateListHover = false;
}

document.getElementById('account').onkeydown = function(){
	if(event.keyCode==13){
		doLogin();
		return false;
	}
}

document.getElementById('password').onkeydown = function(){
	if(event.keyCode==13){
		doLogin();
		return false;
	}
}

document.getElementById('rememberPwd').onclick = function(){
	if(this.checked){
		localStorage.rememberPwd = 'true';
	}
	else{
		localStorage.rememberPwd = '';
		localStorage.account = '';
		localStorage.password = '';
		localStorage.state = '';
		localStorage.autoLogin = '';
		document.getElementById('autoLogin').checked = '';
	}
}

document.getElementById('autoLogin').onclick = function(){
	if(this.checked){
		localStorage.autoLogin = 'true';
		document.getElementById('rememberPwd').checked = 'checked';
	}
	else{
		localStorage.autoLogin = '';
	}
}

window.onclick = function(){
	if(!stateListHover){
		document.getElementById('stateList').style.display = 'none';
	}
}

function doLogin(){
	if(login){
		chrome.extension.sendMessage('cancel');
		return;
	}
	var account = document.getElementById('account').value;
	var password;
	try{
		password = decodeURIComponent(document.getElementById('password').value);
	}
	catch(e){
		password = document.getElementById('password').value;
	}
	var state = document.getElementById('state').getAttribute('state');
	if(!account) {
	    $('#account').focus();
	    return;
	}
	if(!password) {
	    $('#password').focus();
	    return;
	}
	if(account && password){
		if(document.getElementById('rememberPwd').checked){
			localStorage.account = account;
			localStorage.password = password;
			localStorage.state = state;
		}
		login = true;
		document.getElementById('loginButtonInner').innerHTML = '取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消';
		document.getElementById('beforeLogin').style.display = 'none';
		$('#currentAccount').html('（'+account+'）');
		document.getElementById('afterLogin').style.display = 'block';
		chrome.extension.sendMessage('login;'+encodeURIComponent(account)+';'+encodeURIComponent(password)+';'+encodeURIComponent(state));
	}
}