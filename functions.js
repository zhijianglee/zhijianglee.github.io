function openMenu(menuname) {
  var i;
  var x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(menuname).style.display = "block";
  if(menuname=="show"){
    showall();
  }
}

function generate(){
  shuffle(list);
  var size=list.length;
  var index= Math.floor(Math.random() * size);
  document.getElementById("truth_dare_content").innerHTML = list[index];
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function showall(){
  var ul = document.querySelector("ul");

for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var listItem = document.createElement("li");
    var t= document.createTextNode(item);
    listItem.setAttribute("class", "list-item");
    listItem.appendChild(t);
    ul.appendChild(listItem);
  }
}


function showinalert(){
  var x =document.querySelector("alert-dialog-content")
  var ul = document.createElement("ul");

for (var i = 0; i < list.length; i++) {
    var item = list[i] +"\n";
  }
   var dialog = document.getElementById('my-alert-dialog');
   document.getElementById("alert-dialog-content").innerHTML =item;
}

var createAlertDialog = function() {
  var dialog = document.getElementById('my-alert-dialog');

  if (dialog) {
    showinalert();
    dialog.show();
  } else {
    ons.createElement('alert-dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var hideAlertDialog = function() {
  document
    .getElementById('my-alert-dialog')
    .hide();
};


function add(){
    var text= document.getElementById("truth_dare_content").innerHTML;
    writefile(text);
}
