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
  var size=list.length;
  var index= Math.floor(Math.random() * size);
  document.getElementById("truth_dare_content").innerHTML = list[index];
}

function showall(){
  var ul = document.querySelector("ul");

for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var listItem = document.createElement("li");
    var card=document.createElement("div");
    var cardcontent=document.createElement("div");
    var t= document.createTextNode(item);
    card.setAttribute("class","card");
    listItem.setAttribute("class", "list-item");
    cardcontent.setAttribute("class","card_content");
    card.appendChild(cardcontent);
    cardcontent.appendChild(t);
    listItem.appendChild(card);
    ul.appendChild(listItem);
  }
}


function add(){
    var text= document.getElementById("truth_dare_content").value;
    list.push(text);
}
