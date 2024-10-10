let firstKey = true;
let p_number = 0;

document.addEventListener('keydown', function(event) {
  console.log('Key pressed: ', event.key);
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
   findWordBetweenDots(newText);
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


function findWordBetweenDots(text){
  const regex = /\:(\w+)\:/;
  const match = text.match(regex);
  if(match && match[1]){
    console.log(":YES:")
    console.log(match)
    console.log(match[1])
    changeTextWithEmoji(match)
  }else{
    console.log(":NO:")
  }
}

function changeTextWithEmoji(match){
  var existingText;

  var paragraph = document.getElementById("par_"+p_number);

  if(paragraph){existingText = paragraph.textContent;}
  else{existingText = "";}

  var emoji = getRightEmoji(match[1])

  var newText = existingText.replace(match[0], emoji);

  if(paragraph){paragraph.textContent = newText;}
}

function getRightEmoji(match){
  if(match == "happy"){return "😄"}
  else if(match == "coffee"){return "☕️"}
  else if(match == "flower"){return "🌸"}
  else if(match == "sad"){return "🙁"}
  else if(match == "house"){return "🏠"}
  else if(match == "rhino"){return "🦏"}
}