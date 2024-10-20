
export function strobe(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    if(paragraph.classList.contains("strobe")){
        paragraph.classList.remove("strobe");
    }else{
        paragraph.classList.add("strobe")
    }
}



export function rave(p_number){
    if(document.body.classList.contains("rave")){
        document.body.classList.remove("rave");
    }else{
        document.body.classList.add("rave");
    }
}



export function slide(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    if(paragraph.classList.contains("slide")){
        paragraph.classList.remove("slide");
    }else{
        paragraph.classList.add("slide")
    }
}


export function periodic(p_number){
    let paragraph = document.getElementById("par_"+p_number);
    if(paragraph.classList.contains("periodic")){
        paragraph.classList.remove("periodic");
    }else{
        paragraph.classList.add("periodic")
    }
}







