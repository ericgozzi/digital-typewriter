import {highlight, change_all_text_color, setBackgroundColor, textColor} from "./functions/format.mjs";
import { textAlign, setFont} from "./functions/format.mjs";
import { setTextSmaller, setTextSmall, setTextNormal, setTextBig, setTextBigger, setTextHuge } from "./functions/format.mjs";
import { setTextItalic, setTextBold} from "./functions/format.mjs";
import { insertSpace } from "./functions/format.mjs";

import { setEmoji, generateZoo } from "./functions/emojis.mjs";

import { strobe, rave, slide, periodic} from "./functions/style.mjs";

import { removeCommandFromText } from "./functions/commands.mjs";

import { showParagraphNumber, hideParagraphNumber } from "./functions/paragraphs.mjs";

import { printPage } from "./functions/io.mjs";
import { copyHtmlToClipboad } from "./functions/io.mjs";














let firstKey = true;
let p_number = 0;
let is_paragraph_deletable = true;
let highest_paragraph_number = p_number
let type = true;

let text_default_dimension = 40
let text_default_color = "black"



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var pageToOpen = urlParams.get('page');
if(pageToOpen){
  console.log(pageToOpen)
  pageToOpen = pageToOpen.replace(/"/g, "")
  console.log(pageToOpen)
  open(pageToOpen);
}



document.addEventListener('keydown', function(event) {
  if(type){checkKey(event.key);};
});


function checkKey(key){
    var exceptionKeys = ["Shift", "Enter", "Backspace", "Meta", "Alt", "CapsLock", "Tab", "Control", "_", "Escape", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]
    if(key == "_"){return}
    if (firstKey){
      firstKey = false
      newParagraph()
    }
    if (!exceptionKeys.includes(key)){
      addKeyToText(key)
    }
    else if (key == "Backspace"){
      removeLastChar()
    } else if (key == "Enter"){
      newParagraph()


    }else if (key == "ArrowUp"){
      if(p_number == 1){
        {return}
      }else{
        setActiveParagraph(p_number-1)
      }



    }else if(key == "ArrowDown"){
      if (p_number + 1 == highest_paragraph_number){
        setActiveParagraph(highest_paragraph_number)
        p_number = highest_paragraph_number
      }else if(p_number == highest_paragraph_number){
        return
      }else{
        setActiveParagraph(p_number + 1)
      }
    }

    console.log(p_number)
}



async function simpleCommand(match){
  const command = match [1];
  if(command == "smaller"){
    setTextSmaller(p_number)
  }else if(command == "small"){
    setTextSmall(p_number)
  }else if(command == "normal"){
    setTextNormal(p_number)
  }else if(command == "big"){
    setTextBig(p_number)
  }else if(command == "bigger"){
    setTextBigger(p_number)
  }else if(command == "huge"){
    setTextHuge(p_number)
  }else if(command == "italic"){
    setTextItalic(p_number)
  }else if(command == "bold"){
    setTextBold(p_number)
  }else if(command == "activelast"){
    removeCommandFromText(match, p_number)
    setActiveParagraph(highest_paragraph_number)
  }else if(command == "showparid"){
    showParagraphNumber();
  }else if(command == "hideparid"){
    hideParagraphNumber();
  }else if(command == "print"){
    removeCommandFromText(match, p_number);
    hideParagraphNumber();
    printPage(p_number);
  }else if(command == "reset"){
    resetAll();
  }else if(command == "paste"){
    paste();
  }else if(command == "copyhtml"){
    removeCommandFromText(match, p_number)
    copyHtmlToClipboad();
  }else if(command == "link"){

    getLink(p_number)

  }else if(command == "strobe"){
    strobe(p_number);
  }else if(command == "rave"){
    rave(p_number);
  }else if(command == "slide"){
    slide(p_number);
  }else if(command == "periodic"){
    periodic(p_number);
  }else if(command == "commandlist"){
    window.open("https://digital-typewriter.netlify.app/?page=commands")
  }else if(command == "save"){
    removeCommandFromText(match, p_number)
    downloadPage();   
  }else{
    setEmoji(match, p_number)
  }
  removeCommandFromText(match, p_number)
}


function complexCommand(match){
  var command = match[1]
  var attribute = match[2]
  if(command == "highlight"){
    highlight(attribute, p_number)
  }else if(command == "color"){
    textColor(attribute,p_number)
  }else if(command == "bckcolor"){
    setBackgroundColor(attribute)
  }else if(command == "align"){
    textAlign(attribute, p_number)
  }else if(command == "textcolor"){
    change_all_text_color(attribute)
  }else if(command == "defaultcolor"){
    change_default_color(attribute)
  }else if(command == "active"){
    removeCommandFromText(match, p_number)
    setActiveParagraph(attribute)
  }else if(command == "open"){
    open(attribute)
  }else if(command == "space"){
    insertSpace(attribute, p_number)
  }else if(command == "font"){
    setFont(attribute, p_number)
  }else if(command == "zoo"){
    const zoo = generateZoo(attribute)
    addKeyToText(zoo)
  }
  removeCommandFromText(match, p_number)
}



function change_default_color(color){
  text_default_color = color
}













function resetAll(){
  document.body.innerHTML = " "
  firstKey = true;
  p_number = 0;
  is_paragraph_deletable = true;
  highest_paragraph_number = p_number
  setBackgroundColor("white")
}

async function paste(){
  try{
    const text = await navigator.clipboard.readText();
    addKeyToText(text)
  }catch{}
}

function save(projectName){
 var snippet = '<p> THIS IS A SNIPPET <p>'
 saveHtmlSnippet(snippet)
}

async function open(pageName){
  resetAll()
  try{
    const response = await fetch("./public/library/" + pageName + ".json");
    const data = await response.json();
    const html = data["html"];
    let bckcolor = data["backgroundColor"];
    const bodyClasses = data["bodyClasses"];

    if(bckcolor === ""){bckcolor = "white"}
    setBackgroundColor(bckcolor);

    
    document.body.innerHTML = html
    highest_paragraph_number = document.getElementsByTagName('div').length
    p_number = highest_paragraph_number;
    setActiveParagraph(highest_paragraph_number)

    console.log(bodyClasses)
    console.log(Object.keys(bodyClasses).length)

    for(var i = 0; i<Object.keys(bodyClasses).length; i++){
      console.log(bodyClasses[i])
      document.body.classList.add(bodyClasses[i])
    }
    
  }catch{
    console.error("Error fetching data");
  }
}


async function readJsonFile(){
  try{
    const response = await fetch("./public/library.json");
    const data = await response.json();
    return data;
  }catch{
    console.error("Error fetching data: ", error);
  }
}







function newParagraph(){
  try{var  paragraph = document.getElementById("par_"+p_number);
     if(is_paragraph_deletable && paragraph.innerHTML != ""){
       p_number += 1
       var newParagraph = document.createElement('div');
       newParagraph.id = "par_"+p_number
       newParagraph.style.color = text_default_color;
       newParagraph.style.fontSize = text_default_dimension + "px";
       document.body.appendChild(newParagraph);
       highest_paragraph_number = p_number
       setActiveParagraph(p_number)
       try{document.getElementById("par_"+(p_number-1)).style.borderRightStyle = "none";}catch{};
     }
  }catch{
   if(is_paragraph_deletable){
     p_number += 1
     var newParagraph = document.createElement('div');
     newParagraph.id = "par_"+p_number
     newParagraph.style.color = text_default_color;
     newParagraph.style.fontSize = text_default_dimension + "px";
     document.body.appendChild(newParagraph);
     highest_paragraph_number = p_number
     setActiveParagraph(p_number)
     try{document.getElementById("par_"+(p_number-1)).style.borderRightStyle = "none";}catch{};
   }
  }
 }
 
 
 function removeParagraph(){
   if(is_paragraph_deletable){
   if(p_number > 1){
     var paragraph = document.getElementById("par_" + p_number);
     if(paragraph){
       paragraph.remove();
       p_number -= 1
     }
   }else{
     firstKey = true;
   }
   highest_paragraph_number = p_number
   setActiveParagraph(highest_paragraph_number);
 }
 }
 
 function setActiveParagraph(goalNumber){
   var old_p = p_number;
   var new_p = goalNumber;
 
   var old_paragraph = document.getElementById("par_" + old_p);
   var new_paragraph = document.getElementById("par_" + new_p);
 
   old_paragraph.style.borderRightStyle = "none";
   new_paragraph.style.borderRightStyle = "solid";
   new_paragraph.style.borderWidth = "10px";
   new_paragraph.style.borderColor = "gray";
   p_number = new_p
   if(p_number == highest_paragraph_number){is_paragraph_deletable = true}
   else{is_paragraph_deletable = false}
 }
 
 
 
 function addKeyToText(key){
  var paragraph = document.getElementById("par_"+p_number);
  paragraph.append(key)
  if(key == ":"){checkPattern(paragraph.innerText)};
 }


 function removeLastChar(){
  var paragraph = document.getElementById("par_"+p_number);
  console.log(paragraph.childNodes.length)

  if(paragraph.innerHTML == ""){
    removeParagraph();
    return
  }

  for(let i = paragraph.childNodes.length -1 ; i>=0; i--){
    const node = paragraph.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length>0){
      node.nodeValue = node.nodeValue.slice(0, -1);
      break;
    }
    
    if(node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'a'){
      paragraph.removeChild(node);
      break;
    }
  }
}



function checkPattern(text){
  const regexSimple = /\:(\w+)\:/;
  const matchSimpleCommand = text.match(regexSimple);
  const regexComplex = /:([^:>]+)>([^:]+):/;
  const matchComplexCommand = text.match(regexComplex);
  if(matchSimpleCommand && matchSimpleCommand[1]){
    simpleCommand(matchSimpleCommand)
  }else if(matchComplexCommand && matchComplexCommand[1]){
    complexCommand(matchComplexCommand)
  }
}








function getLink(p_number){
  type = false;
  var div = document.createElement("div");
  var paragraph = document.getElementById("par_" + p_number);
  div.id = 'pasteLinkDiv';
  var html = "<textarea id='pastedLink' placeholder='paste link here...'></textarea><button id='button'> ✔ </button><button id='cancelButton'> ✖ </button>";
  div.innerHTML = html;
  document.body.appendChild(div);
  var button = document.getElementById("button");
  button.addEventListener("click", ()=> insertLink(p_number));
  var cancel = document.getElementById("cancelButton");
  cancel.addEventListener("click", ()=> cancelLink());
}


function insertLink(p_number){
  const linkElement = document.createElement('a');
  const textarea = document.getElementById("pastedLink");
  const link = textarea.value;
  linkElement.href = link
  linkElement.innerText = ">>"
  linkElement.style.color = document.getElementById("par_" + p_number).style.color;
  linkElement.style.textDecoration = "none"
  const paragraph = document.getElementById("par_" + p_number);
  paragraph.append(linkElement)
  document.getElementById("pasteLinkDiv").remove()
  type = true
  
};


function cancelLink(){
  document.getElementById("pasteLinkDiv").remove()
  type = true
};




function downloadPage(){
  const page = {
    html: document.body.innerHTML.toString().replace(/"/g, "'"),
    backgroundColor: document.body.style.backgroundColor,
    bodyClasses: document.body.classList
  }

  const jsonString = JSON.stringify(page);
  console.log(jsonString)



   // Create a Blob object with the JS content
   const blob = new Blob([jsonString], { type: 'application/json' });


    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'page.json'; // The name of the downloaded file

    // Append the link to the body (not displayed)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

   // Remove the link from the document
   document.body.removeChild(link);
}