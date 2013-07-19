/**
 * WebQQ Lib for Qrome
 * 
 * @author phoenix.x.gao@gmail.com 
 */
var WebQQ = {
    define: {
        appid: 1003903,
        webqq_type: 10,
        ptlang: 2052,
        daid: 164,
        jstype: 0,
        js_ver: 10034,
        action: '5-27-43286'
    },
    /**
     * QQ帐号 
     */
    account: null,
    
    /**
     * 在线状态 
     */
    status: null,
    
    /**
     * 密码
     */
    password: null,
    encodedPassword: null,
    
    /**
     * 验证码code 
     */
    verifyCode: null,
    
    /**
     * login_sig
     */
    verifysession: null,
    
    /**
     * 登录api
     * @param u =QQ号码 
     * @param p =encoded password
     * @param verifycode
     * @param webqq_type =10
     * @param remember_uin =1
     * @param login2qq =1
     * @param aid =1003903
     * @param u1 =http://web2.qq.com/loginproxy.html?login2qq=1&webqq_type=10
     * @param h =1
     * @param ptredirect =0
     * @param ptlang =2052
     * @param daid =164
     * @param from_ui =1
     * @param pttype =1
     * @param dumy =
     * @param fp =loginerroralert
     * @param action =5-27-43286
     * @param mibao_css =m_webqq
     * @param t =1
     * @param g =1
     * @param jstype =0
     * @param js_ver =10034
     * @param login_sig =s6XaewL3ENJGbtQLwkhkhEMCHRGye7CJGGFbmkftMi70*jSpxry81n3vl5gD*XzZ
     * 
     * @return javascript ptuiCB(a1, a2, url, a4, message, nickname);
     */
    URI_LOGIN_SSL: 'https://ssl.ptlogin2.qq.com/login', 
    
    /**
     * 获取验证码api 
     * @param uin =QQ号码
     * @param appid =1003903
     * @param js_ver =10034
     * @param js_type =0
     * @param login_sig =s6XaewL3ENJGbtQLwkhkhEMCHRGye7CJGGFbmkftMi70*jSpxry81n3vl5gD*XzZ
     * @param u1 =http://web2.qq.com/loginproxy.html
     * @param r =0.03229580190964043
     * 
     * @return javascript ptui_checkVC('0','!WLG','\x00\x00\x00\x00\x09\x32\xfe\xe3');
     */
    URI_GETVC_SSL: "https://ssl.ptlogin2.qq.com/check",
    
    getVerifyCode: function(account) {
        if (!account) {
            return false;
        };
        this.account = account;
        
        var that = this;
        $.ajax({
            url: that.URI_GETVC_SSL,
            data: {
                uin: account,
                appid: that.define.appid,
                js_ver: that.define.js_ver,
                js_type: that.define.js_type,
                login_sig: that.verifysession,
                ul: 'http://web2.qq.com/loginproxy.html',
                r: Math.random()
            },
            type: 'get',
            dataType: 'text',
            success: function(text){
                var response = that._getArgsArray(text);
                if(response[0] == "0") {
                    that.verifyCode = response[2];
                    that.doLogin(that.password, that.status);
                }
                else if(response[0] == "1") {
                    that.showVerifyCode(response[2]);
                };
            }
        });
    },
    
    /**
     *  
     */    
    showVerifyCode: function(verifyCode){
        chrome.windows.create({
            url: 'captcha.html?'+this.account+'&'+verifyCode,
            width: 160,
            height: 140,
            focused: true,
            type: 'popup'
        });
    },
    
    doLogin: function(password, status) {
        var encodedPassword = this._getEncodedPassword(password);
        
        var that = this;
        $.ajax({
            url: that.URI_LOGIN_SSL,
            data: {
                u: that.account,
                p: encodedPassword,
                verifycode: that.verifyCode,
                webqq_type: that.define.webqq_type,
                remember_uin: 1,
                login2qq: 1,
                aid: that.define.appid,
                u1: "http://web2.qq.com/loginproxy.html?login2qq=1&webqq_type=10",
                h: 1,
                ptredirect: 0,
                ptlang: that.define.ptlang,
                daid: that.define.daid,
                from_ui: 1,
                pttype: 1,
                dumy: '',
                fp: "loginerroralert",
                action: that.define.action,
                mibao_css: "m_webqq",
                t: 1,
                g: 1,
                jstype: that.define.jstype,
                js_ver: that.define.js_ver,
                login_sig: ''
            },
            type: 'get',
            dataType: 'text',
            success: function(text){
                var response = that._getArgsArray(text);
                // 登录成功
                if(response[0] === 0) {
                    
                }
                console.log(response);
            }
        });
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
    },
    
    /**
     * @param string "functionName(arg1, arg2, ...);"
     * 
     * @return array [arg1, arg2, ...]
     */
    _getArgsArray: function(string) {
        return string.substring(string.indexOf('(') + 1, string.lastIndexOf(')')).split(/,\s*/).map(function(s){
            return !isNaN(s) ? +s : s.substring(1, s.length - 1);
        });
    },
    
    _getEncodedPassword: function(password){
    	var encodedPassword = null;
		if(password.substr(0, 1) != String.fromCharCode(16)){
			password = password.substr(0,16);
			this.password = md5(password);
			encodedPassword = md5(md5(this.hexChar2Bin(this.password)+this.uin)+this.verifyCode.toUpperCase());
			if(localStorage.password){
				localStorage.password = String.fromCharCode(16) + this.md5(this.hexChar2Bin(this.password)+this.uin);
			}
		}
		else{
			encodedPassword = md5(password.substr(1)+this.verifyCode.toUpperCase());
		}
		
		return encodedPassword;
	},
	
	hexChar2Bin: function(str) {
		var arr = "", temp = "";
		for (var i = 0; i < str.length; i = i + 2) {
			temp = str.substr(i, 2);
			temp = parseInt(temp, 16);
			arr += String.fromCharCode(temp);
		}
		return arr;
	},
	
	uin2Hex: function(uin) {
		var maxLength = 16;
		uin = parseInt(uin);
		var hex = uin.toString(16);
		var len = hex.length;
		for (var i = len; i < maxLength; i++) {
			hex = "0" + hex;
		}
		var arr = "", temp = "";
		for (var j = 0; j < maxLength; j += 2) {
			temp = hex.substr(j, 2);
			temp = parseInt(temp, 16);
			arr += String.fromCharCode(temp);
		}
		return arr;
	},
};
