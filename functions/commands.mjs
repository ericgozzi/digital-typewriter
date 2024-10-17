export function removeCommandFromText(match, p_number){
    var existingText;
    var paragraph = document.getElementById("par_"+p_number);
    if(paragraph){existingText = paragraph.textContent;}
    else{existingText = "";}
    var newText = existingText.replace(match[0], "");
    if(paragraph){paragraph.textContent = newText;}
}