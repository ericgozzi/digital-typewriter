export function printPage(p_number){
    document.getElementById("par_"+p_number).style.borderRightStyle = "none";
    window.print();
    document.getElementById("par_"+p_number).style.borderRightStyle = "solid";
}





export async function getLink(p_number){
    var div = document.createElement("div");
    var paragraph = document.getElementById("par_" + p_number);
    div.id = 'pasteLinkDiv';
    var html = "<textarea id='pastedLink'>Paste link here...</textarea><button id='button'> OK </button>";
    div.innerHTML = html;
    document.body.appendChild(div);
    var button = document.getElementById("button");
    button.addEventListener("click", ()=> insertLink(p_number));
}


async function insertLink(p_number){
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
};



export function copyHtmlToClipboad(){
    var html = document.body.innerHTML.toString();
    html = html.replace(/"/g, "'");
    navigator.clipboard.writeText(html);
}


