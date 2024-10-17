

// HIGHLIGHT BACKGROUND
export function highlight(color, p_number){
    let paragraph = document.getElementById("par_"+ p_number);
    paragraph.style.backgroundColor = color;
};


// CHANGE  ALL TEXT COLOR
export function change_all_text_color(color){
    let paragraph = document.getElementsByTagName('div');
    for(let i = 0; i<paragraph.length; i++){
      paragraph[i].style.color = color;
    }
  }

//CHANGE PARAGRAPH COLOR
export function textColor(color, p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.color = color;
}


// BACKGROUND COLOR
export function setBackgroundColor(color){
    document.body.style.backgroundColor = color;
}

// TEXT ALIGN
export function textAlign(position, p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.textAlign = position
  }
  
// TEXT DIMENSION  
export function setTextSmaller(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontSize = "20px";
}

export function setTextSmall(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontSize = "30px";
}

export function setTextNormal(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontSize = "40px";
}

export function setTextBig(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontSize = "50px";
}

export function setTextBigger(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontSize = "60px";
    }

export function setTextHuge(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontSize = "100px";
}



//TEXT STYLE

export function setTextItalic(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    if (paragraph.style.fontStyle == "italic"){
        paragraph.style.fontStyle = "normal"
    }else{
        paragraph.style.fontStyle = "italic";
    }
}

export function setTextBold(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    if (paragraph.style.fontWeight == "bold"){
        paragraph.style.fontWeight = "normal"
    }else{
        paragraph.style.fontWeight = "bold";
    }
}



//FONT
export  function setFont(font, p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.fontFamily = font;
}



//SPACE
export function insertSpace(value, p_number){
    let paragraph = document.getElementById("par_"+p_number);
    paragraph.style.marginTop = value * 10 + "px";
}