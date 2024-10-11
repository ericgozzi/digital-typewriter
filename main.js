let firstKey = true;
let p_number = 0;
let is_paragraph_deletable = true;
let highest_paragraph_number = p_number

let text_default_dimension = 40
let text_default_color = "black"

var simpleCommands = ["bold", "italic", "save", "animate"];



document.addEventListener('keydown', function(event) {
  checkKey(event.key);
});


function checkKey(key){
  var exceptionKeys = ["Shift", "Enter", "Backspace", "Meta", "Alt", "CapsLock", "Tab", "Control"]
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
  }else{
    setEmoji(match)
  }
  removeCommandFromText(match)
}


function complexCommand(match){
  var command = match[1]
  var attribute = match[2]
  if(command == "highlight"){
    highligth(attribute)
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

function setEmoji(command){
  var existingText;
  var paragraph = document.getElementById("par_"+p_number);
  if(paragraph){existingText = paragraph.textContent;}
  else{existingText = "";}
  var emoji = getRightEmoji(command[1])
  var newText = existingText.replace(command[0], emoji);
  if(paragraph){paragraph.textContent = newText;}
}

function getRightEmoji(command){
  if(command == "happy"){return "😄"}
  else if(command == "coffee"){return "☕️"}
  else if(command == "flower"){return "🌸"}
  else if(command == "sad"){return "🙁"}
  else if(command == "house"){return "🏠"}
  else if(command == "rhino"){return "🦏"}
  else if(command == "beer"){return "🍺"}
  else if(command == "grasshopper"){return "🦗"}
  else if(command == "ladybug"){return "🐞"}
  else if(command == "heart"){return "❤"}
  else if(command == "earth"){return "🌍"}
  else if(command == "kiwi"){return "🥝"}
  else if(command == "arrow"){return "➡"}
  else if(command == "barrow"){return "⬅"}
  else if(command == "tarrow"){return "⬆"}
  else if(command == "darrow"){return "⬇"}
  else if(command == "bike"){return "🚲"}
  else if(command == "car"){return "🚗"}
  else if(command == "star"){return "⭐"}
  else if(command == "moon"){return "🌙"}
  else if(command == "sun"){return "☀"}
  else if(command == "rain"){return "🌧"}
  else if(command == "storm"){return "⛈"}
  else if(command == "cloud"){return "☁"}
  else if(command == "snow"){return "🌨"}
  else if(command == "hot"){return "🥵"}
  else if(command == "cold"){return "🥶"}
  else if(command == "fire"){return "🔥"}
  else if(command == "water"){return "💧"}
  else if(command == "cool"){return "😎"}
  else if(command == "inlove"){return "😍"}
  else if(command == "asleep"){return "😴"}
  else if(command == "yeah"){return "😜"}
  else if(command == "kaboom"){return "🤯"}
  else if(command == "cowboy"){return "🤠"}
  else if(command == "devil"){return "😈"}
  else if(command == "angel"){return "😇"}
  else if(command == "alien"){return "👽"}
  else if(command == "ohh"){return "😲"}
  else if(command == "thinking"){return "🤔"}
  else if(command == "sick"){return "🤒"}
  else{return ""};
}


function highligth(color){
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


function save(projectName){
 var snippet = '<p> THIS IS A SNIPPET <p>'
 saveHtmlSnippet(snippet)
}



function open(projectName){
  const htmlContent = get(projectName)
  console.log(htmlContent);
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

