var WebQQ = {
    /**
     * 登录api
     * @param u =QQ号码 
     * @param p =encoded password
     */
    URI_LOGIN_SSL : 'https://ssl.ptlogin2.qq.com/login', 
    
    /**
     * QQ帐号 
     */
    account: null,
    
    /**
     * 在线状态 
     */
    status: null,
    
    doLogin: function() {
        
    },
    
    /**
     * 记录登录日志
     * @todo 使用chrome.storage替代localStorage 可直接存取对象
     */
    _logLogin: function() {
		var loginHistory = localStorage.loginHistory;
		if (typeof(loginHistory) == 'undefined') {
		    var arrLoginHistory = [];
		}
		else {
		    var arrLoginHistory = JSON.parse(loginHistory);
		}
		if(arrLoginHistory.indexOf(WebQQ.account) != -1) {
			arrLoginHistory.splice(arrLoginHistory.indexOf(WebQQ.account), 1);
		}
		arrLoginHistory.push(WebQQ.account);
		localStorage.setItem('loginHistory', JSON.stringify(arrLoginHistory));
    }
};
