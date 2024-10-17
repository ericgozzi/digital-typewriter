

export async function setEmoji(command, p_number){
    var existingText;
    var paragraph = document.getElementById("par_"+p_number);
    if(paragraph){existingText = paragraph.textContent;}
    else{existingText = "";}
    const emoji = await getRightEmoji(command[1])
    var newText = existingText.replace(command[0], emoji);
    if(paragraph){paragraph.textContent = newText;}
}


export async function getRightEmoji(emoji_name){
    try{
      const response = await fetch("./public/emojis.json");
      const data = await response.json();
      var emoji = data[emoji_name];
      return emoji;
    }catch{
      console.error("Error fetching data: ", error);
    }
}


export function generateZoo(number){
    const animals = ["🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🫎", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🦂",
      "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🪼", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🦭", "🐊", "🐅", "🐆", "🦓", "🦍", 
      "🦧", "🦣", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🦬", "🐃", "🐂", "🐄", "🫏", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🐈",
      "🐈‍⬛", "🐓", "🦃", "🦤", "🦚", "🦜", "🦢", "🦩", "🐇", "🦝", "🦨", "🦡", "🦫", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔", "🐉"]
    let zoo = ""
    for(var i = 0; i < number; i++){
      const randomIndex = Math.floor(Math.random() * animals.length);
      const randomAnimal = animals[randomIndex];
      zoo = zoo + randomAnimal
    }
    return zoo
  }
  