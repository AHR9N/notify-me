var text;
var managers = ["M0D4", "MuhammadJ", "ahmed_magdy1", "Redhwan", "AIC", "Abdeltwab"];

function getJsonText(){
    var f1 = window.document.body.innerText.includes("Elapsed");
    var f2 = window.document.body.innerText.includes("Running");
    var f3 = window.document.body.innerText.includes("Remaining");
    if(!f1 || !f2 || !f3) return;
	
    text = "";
    var url = window.location.href;
    var contestId = "";
    var i = url.indexOf("contest") + 8;
    
    if(i == -1) return;
    
    for(; i < url.length; i++){
        
        if(url.charAt(i) < '0' || url.charAt(i) > '9')
            break;
        contestId += url.charAt(i);
    }
    
    if(!contestId) return;
    
    //console.log(contestId);
    
    url = `https://vjudge.net/comment/thread?path=contest/${contestId}`;
    //console.log("url : " + url + "\n");
    
    function makeHttpObject() {
      try {
          return new XMLHttpRequest();
      }
      catch (error) {
          
      }
      try {
          return new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (error) {
          
      }
      try {
          return new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (error) {
          
      }

      throw new Error("Could not create HTTP request object.");
    }
    
    var request = makeHttpObject();
    request.open("GET", url, true);
    request.send(null);
    request.responseType = "text";
    request.onreadystatechange = function() {
      if (request.readyState == 4){
            var x = request.responseText;
            check(x);
      }
    };
    text = request.responseText;
}

function isAdmin(author){
    return managers.indexOf(author) != -1;
}

function check(text){
    if(window.navigator.onLine){
        if(text.length == 0) return;
        var obj = JSON.parse(text);
        if(obj["id"] == 0) return; //no comments
        var posts = obj["posts"];
        for(var i = 0; i < posts.length; i++){
            if(!isAdmin(posts[i]["author"])) continue;
            if(posts[i]["content"] == undefined) continue;
            if(posts[i]["parentId"] != 0) continue;
            if(localStorage.getItem(posts[i]["id"]) != null) continue;
            localStorage.setItem(posts[i]["id"], posts[i]["id"]);
            alert(posts[i]["content"]);
        }
    }
}


var myVar = setInterval(getJsonText, 1000);
