// A filtered list of apps we actually want to show.
var appList = [];
var appCount = 0;
var tag="f";

$(document).ready(function() {

   
    chrome.management.getAll(function(info) {
    appCount = 0;
    for (var i = 0; i < info.length; i++) {if (info[i].isApp) {appCount++;}}

    // Puts only enabled apps from completeList into appList.
    appList = [];
    for (var i = 0; i < info.length; i++){
    var item = info[i];
    // Skip extensions and disabled apps.
    if (!item.isApp || !item.enabled) {
      continue;
    }
    appList.push(item);
	}
   
   var temp="nothing";
   for (var i = 0; i < appList.length; i++) {
   var item = appList[i];         //we can select many atrributes here
   tag="<li><a class=\"myApps\" href=\""+item.appLaunchUrl+"\">"+item.name+"</a></li>";
   $("#listApptags").append(tag);
   temp="\"return uninstall\(\'"+item.name+"\'\,\'"+item.id+"\'\)\"";
   tag="<li onclick="+temp+" ><a class=\"myApps\" href=\"#\"    >"+item.name+"</a></li>";
   $("#contextmenu1").append(tag);
   console.log(tag);
    }
    
  $("#listApptags").append(localStorage.tag)

  });
  
   
  
});   
  
$(document).ready(function() {
  
    $('img.link').addcontextmenu('contextmenu1');
});

  
function uninstall(name,id)
{

chrome.management.uninstall(id, function(){alert(name+" Application Unistalled"); location.reload();});

}


function appendToStorage(key, newvalue){
 
  if (localStorage.getItem(key) === null) {
 localStorage[key]=newvalue;
}
else
{
   var oldvalue = localStorage.getItem(key);
   if(oldvalue === null) oldvalue = "";
   localStorage.setItem(key, oldvalue + newvalue);
   console.log("I m HERRE");
   console.log(localStorage.tag);
}
}


function addcustomtag()
{
var a=document.getElementById('tagName').value;

var b=document.getElementById('tagURL').value;
var newentry="<li><a  href=\""+b+"\">"+a+"</a></li>";
//localStorage["tag"]= newentry;
$("#listApptags").append(newentry);
appendToStorage("tag",newentry);
$("#content_form").hide(700);

}

  
function disp(b,c,d)
{   
  
 
        if(!$(b).tagcanvas({
          textColour: '##000000',
          outlineColour: '##000000',
          reverse: true,
          depth: 0.9,
          maxSpeed: 0.05
 ,minSpeed:0.03
 ,freezeActive: true
 ,textHeight :25
        },d)
) {
          // something went wrong, hide the canvas container
          $(c).hide();
        }
 }     

function toggleMe(a,b,c,d){
 
  switch(a)
{
case "apps":
  $("#apps").toggle();
  disp(b,c,d);
  $("#Visited").hide(); 
  $("#Closed").hide(); 
  break;
case "Visited":
  $("#Visited").toggle();
  disp(b,c,d);
  $("#apps").hide(); 
  $("#Closed").hide(); 
  break;
case "Closed":
   $("#Closed").toggle();
   disp(b,c,d);
   $("#apps").hide();
   $("#Visited").hide();
default:
 
}
  

}