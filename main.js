import { connectLambda, getStore } from '/node_modules/@netlify/blobs/dist/main.js'

const store = getStore('my-store')

console.log(await store.get('my-key'))

let firstKey = true;
let p_number = 0;



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
  p_number += 1
  var newParagraph = document.createElement('p');
  newParagraph.id = "par_"+p_number
  document.body.appendChild(newParagraph);
  if(key != "Enter"){checkKey(key)}
}


function removeParagraph(){
  if(p_number != 0){
    var paragraph = document.getElementById("par_" + p_number);
    if(paragraph){
      paragraph.remove();
      p_number -= 1
    }
  }else{
    firstKey = true;
  }
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
  }else{
    console.log(":NO:")
  }
}

function simpleCommand(command){
  if (simpleCommands.includes(command)){
    console.log("This is a simple command")
  }else{
    setEmoji(command)
  }
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
  }else if(command == "save"){
    save(attribute)
  }else if(command == "open"){
    open(attribute)
  }

  removCommandFromText(match)
}

function removCommandFromText(match){
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

function setBackgroundColor(color){
  document.body.style.backgroundColor = color;
}

function textAlign(position){
  let paragraph = document.getElementById("par_"+p_number);
  paragraph.style.textAlign = position
}


function save(projectName){
 var snippet = '<p> THIS IS A SNIPPET <p>'
 saveHtmlSnippet(snippet)
}



function open(projectName){
  const htmlContent = get(projectName)
  console.log(htmlContent);
}

