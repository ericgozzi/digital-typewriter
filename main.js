let firstKey = true;
let p_number = 0;
let is_paragraph_deletable = true;
let highest_paragraph_number = p_number

let text_default_dimension = 40
let text_default_color = "black"

var simpleCommands = ["bold", "italic", "save", "animate"];


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
  checkKey(event.key);
});


function checkKey(key){
  var exceptionKeys = ["Shift", "Enter", "Backspace", "Meta", "Alt", "CapsLock", "Tab", "Control", "_"]
  if(key == "_"){return}
  if (firstKey){
    firstKey = false
    newParagraph(key)
  }
  if (!exceptionKeys.includes(key)){
    addKeyToText(key)
  }
  else if (key == "Backspace"){
    removeLastChar()
  } else if (key == "Enter"){
    newParagraph(key)
  }
}


function newParagraph(key){
  if(is_paragraph_deletable){
  p_number += 1
  var newParagraph = document.createElement('p');
  newParagraph.id = "par_"+p_number
  newParagraph.style.color = text_default_color;
  newParagraph.style.fontSize = text_default_dimension + "px";
  document.body.appendChild(newParagraph);
  //if(key != "Enter"){checkKey(key)}
  console.log(p_number)
  highest_paragraph_number = p_number
  setActiveParagraph(p_number)
  try{document.getElementById("par_"+(p_number-1)).style.borderRightStyle = "none";}catch{};
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
  console.log(p_number)
  highest_paragraph_number = p_number
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
   var existingText;

   var paragraph = document.getElementById("par_"+p_number);

   if(paragraph){existingText = paragraph.textContent;}
   else{existingText = "";}

   var newText = existingText + key;

   if(paragraph){paragraph.textContent = newText;}
   if(key == ":"){checkPattern(newText)};
}

function showParagraphNumber(){
  hideParagraphNumber()
  let paragraphs = document.getElementsByTagName('p');
  for(var i = 0; i<paragraphs.length; i++){
    let id = paragraphs[i].id;
    let number = id.split("_")[1];
    let text = paragraphs[i].textContent
    let newText = "[" + number + "]_" + text;
    paragraphs[i].textContent = newText
  }
}

function hideParagraphNumber(){
  let paragraphs = document.getElementsByTagName('p');
  for(var i = 0; i<paragraphs.length; i++){
    let text = paragraphs[i].textContent;
    if(text.includes("_")){
      let newText = text.split("_")[1];
      paragraphs[i].textContent = newText
    }
  }
}


function removeLastChar(){
  var existingText;

  var paragraph = document.getElementById("par_"+p_number);

  if(paragraph){existingText = paragraph.textContent;}
  else{existingText = "";}

  if(existingText.length == 0){
    removeParagraph()
  }else{
    var newText = existingText.slice(0, -1);

    if(paragraph){paragraph.textContent = newText;}
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

function simpleCommand(match){
  const command = match [1];
  if(command == "smaller"){
    setTextSmaller()
  }else if(command == "small"){
    setTextSmall()
  }else if(command == "normal"){
    setTextNormal()
  }else if(command == "big"){
    setTextBig()
  }else if(command == "bigger"){
    setTextBigger()
  }else if(command == "huge"){
    setTextHuge()
  }else if(command == "italic"){
    setTextItalic()
  }else if(command == "bold"){
    setTextBold()
  }else if(command == "activelast"){
    removeCommandFromText(match)
    setActiveParagraph(highest_paragraph_number)
  }else if(command == "showparid"){
    showParagraphNumber();
  }else if(command == "hideparid"){
    hideParagraphNumber();
  }else if(command == "print"){
    removeCommandFromText(match);
    printPage();
  }else if(command == "reset"){
    resetAll();
  }else if(command == "copyhtml"){
    removeCommandFromText(match)
    copyHtmlToClipboad();
  }else if(command == "commandlist"){
    window.open("https://digital-typewriter.netlify.app/?page=commands")
  }else{
    setEmoji(match)
  }
  removeCommandFromText(match)
}


function complexCommand(match){
  var command = match[1]
  var attribute = match[2]
  if(command == "highlight"){
    highlight(attribute, p_number)
  }else if(command == "color"){
    textColor(attribute)
  }else if(command == "bckcolor"){
    setBackgroundColor(attribute)
  }else if(command == "align"){
    textAlign(attribute)
  }else if(command == "textcolor"){
    change_all_text_color(attribute)
  }else if(command == "defaultcolor"){
    change_default_color(attribute)
  }else if(command == "active"){
    removeCommandFromText(match)
    setActiveParagraph(attribute)
  }else if(command == "open"){
    open(attribute)
  }

  removeCommandFromText(match)
}

function removeCommandFromText(match){
  var existingText;
  var paragraph = document.getElementById("par_"+p_number);
  if(paragraph){existingText = paragraph.textContent;}
  else{existingText = "";}
  var newText = existingText.replace(match[0], "");
  if(paragraph){paragraph.textContent = newText;}
}

async function setEmoji(command){
  var existingText;
  var paragraph = document.getElementById("par_"+p_number);
  if(paragraph){existingText = paragraph.textContent;}
  else{existingText = "";}
  const emoji = await getRightEmoji(command[1])
  var newText = existingText.replace(command[0], emoji);
  if(paragraph){paragraph.textContent = newText;}
}

async function getRightEmoji(emoji_name){
  try{
    const response = await fetch("./public/emojis.json");
    const data = await response.json();
    var emoji = data[emoji_name];
    return emoji;
  }catch{
    console.error("Error fetching data: ", error);
  }
}

function printPage(){
  hideParagraphNumber();
  document.getElementById("par_"+p_number).style.borderRightStyle = "none";
  window.print();
  document.getElementById("par_"+p_number).style.borderRightStyle = "solid";
}

function highlight(color){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.backgroundColor = color;
}

function textColor(color){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.color = color;
}

function change_all_text_color(color){
  let paragraph = document.getElementsByTagName('p');
  for(let i = 0; i<paragraph.length; i++){
    paragraph[i].style.color = color;
  }
}

function change_default_color(color){
  text_default_color = color
}

function setBackgroundColor(color){
  document.body.style.backgroundColor = color;
}

function textAlign(position){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.textAlign = position
}


function setTextSmaller(){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.fontSize = "20px";
}

function setTextSmall(){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.fontSize = "30px";
}

function setTextNormal(){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.fontSize = "40px";
}

function setTextBig(){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.fontSize = "50px";
  console.log("big")
}

function setTextBigger(){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.fontSize = "60px";
}

function setTextHuge(){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.fontSize = "100px";
}

function setTextItalic(){
  let paragraph = document.getElementById("par_"+p_number);
  if (paragraph.style.fontStyle == "italic"){
    paragraph.style.fontStyle = "normal"
  }else{
    paragraph.style.fontStyle = "italic";
  }
}

function setTextBold(){
  let paragraph = document.getElementById("par_"+p_number);
  if (paragraph.style.fontWeight == "bold"){
    paragraph.style.fontWeight = "normal"
  }else{
    paragraph.style.fontWeight = "bold";
  }
}


function resetAll(){
  document.body.innerHTML = " "
  firstKey = true;
  p_number = 0;
  is_paragraph_deletable = true;
  highest_paragraph_number = p_number
}

function copyHtmlToClipboad(){
  var html = document.body.innerHTML.toString();
  console.log()
  html = html.replace(/"/g, "'");
  navigator.clipboard.writeText(html);
}

function save(projectName){
 var snippet = '<p> THIS IS A SNIPPET <p>'
 saveHtmlSnippet(snippet)
}



async function open(pageName){
  try{
    const response = await fetch("./public/library.json");
    const data = await response.json();
    const html = data[pageName];
    const bckcolor = data[pageName + "bckColor"];
    setBackgroundColor(bckcolor);

    resetAll()
    
    document.body.innerHTML = html
    highest_paragraph_number = document.getElementsByTagName("p").length
    p_number = highest_paragraph_number;
    setActiveParagraph(highest_paragraph_number)
  }catch{
    console.error("Error fetching data: ", error);
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

