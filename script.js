let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
    selection = document.getSelection();
  })

function format(style){
  if(style === "b" || style === "i"){
    const range = new Range();    
    //for right --> left selection
    // range.setStart(selection.focusNode, selection.focusOffset);
    // range.setEnd(selection.anchorNode, selection.anchorOffset);
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.focusNode, selection.focusOffset);

    try {
      const formatHtmlElement = document.createElement(style);
      let clonedHtmlElements = [];
      let clonedHtmltextContent = [];

      range.cloneContents().childNodes.
          forEach(element => {
            console.log(element);
            
              // element.appendChild(formatHtmlElement);
              formatHtmlElement.textContent = element.textContent;
              range.deleteContents(); //usuwa pierwsze dziecko
              console.log(formatHtmlElement)
              range.insertNode(formatHtmlElement)
              // clonedHtmlElements.push(element)
              // console.log(element)
              // clonedHtmltextContent.push(formatHtmlElement.textContent  = element.textContent)
            
          })     
      // console.log(clonedHtmlElements); //traci dzieci
      // console.log(clonedHtmltextContent);
      // clonedHtmlElements.forEach((element, i) => {
      //   element.textContent = clonedHtmltextContent[i]
        // console.log(element)
         //Taka logika dodaje pusty łamacz wiersza w czystym tekście, usuwa ostatni znak i dodaje akapit
      // })    
      
         
    
    } catch(e) { console.log(e) }    
  
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

document.getElementById("save").addEventListener("click", () => {
  const edited = {innerHTML: `${document.getElementById("editor").innerHTML}`};
  console.log(edited)
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(edited)], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = "mój plik. jsosn.txt";
  a.click();
  URL.revokeObjectURL(a.href)
})
