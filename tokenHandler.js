/**
 * simple JWT Token Handler
 * + cross domain data handling with cookie
 * created by https://github.com/MrQuery
 */

TH = {
    getSet : function(response) {
        var domain = (function(){
            var i=0,domain=document.domain,p=domain.split('.'),s='_gd'+(new Date()).getTime();
            while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
                domain = p.slice(-1-(++i)).join('.');
                document.cookie = s+"="+s+";domain="+domain+";";
            }
            document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
            return domain;
        })();
        var token = response.headers("Authorization");
        document.cookie = 'JWT_TOKEN_TH='+token+';expires=Thu, 30 Jul 2999 11:59:59 GMT;domain='+domain+'; path=/;';
        return token;
    },
    getCookie : function() {
        var name = 'JWT_TOKEN_TH',
            value = "; " + document.cookie,
            parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    },
    getFromStorage : function() {
        return TH.getCookie();
    },
    checkToken : function() {
        var tokenExists = TH.getFromStorage();
        if ( tokenExists === "null" || tokenExists === null || tokenExists === undefined ) {
            return false;
        } else {
            return TH.validate(TH.decode(tokenExists));
        }
    },
    decode : function decode (token, onlyOutput) {
        if ( onlyOutput != '1' ) {
            var parts = token.split('.'),
                output = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            var  decodedToken = decodeURIComponent(escape(window.atob(output)));
            return JSON.parse(decodedToken);
        } else {
            return wholeToken = token.replace('Bearer ', '');
        }
    },
    validate : function validate(value) {
        var d = new Date(),
            exp = new Date(0); // 0 sets time to 00:00:00
        exp.setUTCSeconds(value.exp); // time 0 + exp time
        return d < exp;
    },
    deleteToken : function deleteToken() {
        var domain = (function(){
            var i=0,domain=document.domain,p=domain.split('.'),s='_gd'+(new Date()).getTime();
            while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
                domain = p.slice(-1-(++i)).join('.');
                document.cookie = s+"="+s+";domain="+domain+";";
            }
            document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
            return domain;
        })();
      //  document.cookie = 'JWT_TOKEN_TH=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'JWT_TOKEN_TH=;expires='+new Date(0).toUTCString()+';domain='+domain+';path=/';
    }
};

/*---------------------------------------------
 getFromStorage:
 returns token value from cookie or Null

 checkToken:
 token valid?
 returns true/false

 getSet:
 gets token from request header
 saves value to cookie
 returns token value

 getCookie:
 searches token name in cookies
 returns value

 decode:
 splits token
 decodes payload data
 returns data as json-obj

 validate:
 get timestamp
 get exp date from token
 check both
 returns true/false

 deleteToken:
 deletes cookie from storage

 ------------
 -- USAGE: --
 ------------

 refresh token within request success/error:
 =>  TH.decode(TH.getSet(RESPONSE_VAR_WITH_HEADER_INFORMATION));

 Check Token (checkToken()) before calling http-request,
 if true returns, send the token from storage with the request-header.

 header information for request header:
 =>  headers: {'Authorization' : TH.getFromStorage()}

 ---------------------------------------------*/
