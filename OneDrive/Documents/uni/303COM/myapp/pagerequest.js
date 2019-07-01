var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function httpPost(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

httpPost('http://localhost:3000/playeradd');
setInterval(httpPost, 1000*60*60, ('http://localhost:3000/playeradd'));