export function printPage(p_number){
    document.getElementById("par_"+p_number).style.borderRightStyle = "none";
    window.print();
    document.getElementById("par_"+p_number).style.borderRightStyle = "solid";
}

export function copyHtmlToClipboad(){
    var html = document.body.innerHTML.toString();
    html = html.replace(/"/g, "'");
    navigator.clipboard.writeText(html);
}


