var CommentsIds = [], text;

function getJsonText(){
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
    
    console.log(contestId);
    
    url = `https://vjudge.net/comment/thread?path=contest/${contestId}`;
    console.log("url : " + url + "\n");
    
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
    var authors = ["M0D4", "MuhammadJ", "ahmed_magdy1", "Redhwan", "AIC", "Abdeltwab"];
    for(var i = 0; i < authors.length; i++){
        if(authors[i] == author)
            return true;
    }
    return false;
}
function check(text){
    if(window.navigator.onLine){
        console.log("Online.\n"); 
        //console.log("text: " + text);
        if(text.length == 0) return;
        //alert(text);
        var obj = JSON.parse(text);
        //console.log(obj["id"]);
        if(obj["id"] == 0) return; //no comments
        console.log("phase 2");
        var posts = obj["posts"];
        for(var i = 0; i < posts.length; i++){
            console.log(isAdmin(posts[i]["author"]));
            if(!isAdmin(posts[i]["author"])) continue;
            if(CommentsIds.indexOf(posts[i]["id"]) != -1) continue;
            if(posts[i]["content"] == undefined) continue;
            CommentsIds.push(posts[i]["id"]);
            alert(posts[i]["content"]);
        }
    }
}


var myVar = setInterval(getJsonText, 1000);
