// A filtered list of apps we actually want to show.
var appList = [];
var appCount = 0;
var tag="f";
var wholeInfo="";
var action=0;
$(document).ready(function() {


   
    chrome.management.getAll(function(info) {
    appCount = 0;
	wholeInfo=info;
	console.log(info);
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
   var item = appList[i];         //we can select many atrributes here
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

function googleUninstall()
{
 var temp="nothing";
 var a=document.getElementById('tagName').value;

    for (var i = 0; i < wholeInfo.length; i++) {

    	if (wholeInfo[i].name===a) {
		uninstall(wholeInfo[i].name,wholeInfo[i].id)
	//temp="\"return uninstall\(\'"+wholeInfo[i].name+"\'\,\'"+wholeInfo[i].id+"\'\)\"";
	  break;
	}
 

  


}
}

 
 
 
// set actions here
function setAction(value)
{
action=value;
}
 
 
 function takeAction()
 {
 // 1 to Add    custom tag
if (action==1)
{
addcustomtag();
}
// 2 to remove custom tag or Uninstall App
else if(action==2)
{
deleteCustomTag();

}
//do nothing
else
{
console.log("Invalid Option received");
}
 }
 

    

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

localStorage[a]= newentry;

$("#listApptags").append(newentry);
appendToStorage("tag",newentry);
$("#content_form").hide(700);
location.reload();

}


function deleteCustomTag()
{
var a=document.getElementById('tagName').value;

//var newentry="<li><a  href=\""+b+"\">"+a+"</a></li>";
var newentry=localStorage.getItem(a);
if(newentry)
{
console.log(newentry);
//var oldValue=localStorage.getItem(key).replace(newEntry,"");
var oldValue=localStorage.tag.replace(newentry,"");
localStorage.setItem("tag",oldValue);
$("#content_form").hide(700);
location.reload();
}
else
{
googleUninstall();
}
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