# smallTokenHandler
simple JavaScript JWT Token Handler and cross domain data handling with cookie


 <b>getFromStorage:</b><br>
 returns token value from cookie or Null
 
<b>checkToken:</b><br>
 token valid?
 returns true/false
 
 <b>getSet:</b><br>
 gets token from request header
 saves value to cookie
 returns token value
 
 <b>getCookie:</b><br>
 searches token name in cookies
 returns value
 
 <b>decode:</b><br>
 splits token
 decodes payload data
 returns data as json-obj
 
 <b>validate:</b><br>
 get timestamp
 get exp date from token
 check both
 returns true/false
 
 <b>deleteToken:</b><br>
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
