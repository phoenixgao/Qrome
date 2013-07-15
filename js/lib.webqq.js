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
        js_ver: 10034
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
     * 验证码code 
     */
    verifycode: null,
    
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
        chrome.cookies.get({name: 'verifysession', url: 'https://*.qq.com'}, function(cookie){
            that.verifysession = cookie.value;
        });    
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
                    that.veridyCode = response[2];
                    this.login(this.gPassword, this.gStatus);
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
    
    doLogin: function() {
        var that = this;
        $.ajax({
            url: that.URI_LOGIN_SSL,
            data: {
                u: that.account,
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
     */
    _logLogin: function() {
        
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
    }
};
