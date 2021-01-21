var times = [];
var jsonText, obj;

function checkComment(){
 
var url = window.location.href;

    var contestId = "";
    var i = url.indexOf("contest") + 8;
    if(i == -1) return;
    for(; i < url.length; i++){
        
        if(url.charAt(i) < '0' || url.charAt(i) > '9')
            break;
        contestId += url.charAt(i);
    }
    if(contestId == "") return;
    console.log(contestId);
    url = `https://vjudge.net/comment/thread?path=contest/${contestId}`;
    console.log("url : " + url + "\n");
    function makeHttpObject() {
      try {return new XMLHttpRequest();}
      catch (error) {}
      try {return new ActiveXObject("Msxml2.XMLHTTP");}
      catch (error) {}
      try {return new ActiveXObject("Microsoft.XMLHTTP");}
      catch (error) {}

      throw new Error("Could not create HTTP request object.");
    }
    
    jsonText = "";
    var request = makeHttpObject();
    request.open("GET", url, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4){
          //console.log(request.responseText);
        alert(request.responseText);
          jsonText = request.responseText;
          obj = JSON.parse(jsonText);
      }
    };
    
}

function check(){
    if(window.navigator.onLine){console.log("Done.\n"); checkComment();}
}

var myVar = setInterval(check, 1000);
