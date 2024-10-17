export function showParagraphNumber(){
    hideParagraphNumber()
    let paragraphs = document.getElementsByTagName('div');
    for(var i = 0; i<paragraphs.length; i++){
      let id = paragraphs[i].id;
      let number = id.split("_")[1];
      let text = paragraphs[i].textContent
      let newText = "[" + number + "]_" + text;
      paragraphs[i].textContent = newText
    }
  }
  
export function hideParagraphNumber(){
    let paragraphs = document.getElementsByTagName('div');
    for(var i = 0; i<paragraphs.length; i++){
      let text = paragraphs[i].textContent;
      if(text.includes("_")){
        let newText = text.split("_")[1];
        paragraphs[i].textContent = newText
      }
    }
  }