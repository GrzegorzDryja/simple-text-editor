let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
    selection = document.getSelection();
  })

document.getElementById("save").addEventListener("click", () => {
  const edited = {innerHTML: `${document.getElementById("editor").innerHTML}`};
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(edited)], {type: "text/plain"});
  a.href = URL.createObjectURL(file);
  a.download = `${Date()}.txt`;
  a.click();
  URL.revokeObjectURL(a.href)
})

document.getElementById("read").addEventListener("click", () => {
  const file = document.getElementById("file").files[0];
  const reader = new FileReader();

  if(document.getElementById("file").files.length == 0) {
    alert("Select file");
    return;
  }

  reader.addEventListener("load", (event) => {
    const loadedFile = JSON.parse(event.target.result)
    document.getElementById("editor2").innerHTML = loadedFile.innerHTML;
  });

  reader.addEventListener("error", function(error) {
    alert(`ERROR: ${error}`);
  });

  reader.readAsText(file);
});

function getSelection(){
  const range = new Range();    
  //for right --> left selection
  // range.setStart(selection.focusNode, selection.focusOffset);
  // range.setEnd(selection.anchorNode, selection.anchorOffset);
  range.setStart(selection.anchorNode, selection.anchorOffset);
  range.setEnd(selection.focusNode, selection.focusOffset);

  return range;
}

function format(style){
  const range = getSelection();

  if(style === "b" || style === "i"){
    try {
      let clonedRange = range.cloneContents();
      let formatedRange = document.getElementById("editor2");
      let formatHtmlElement = document.createElement(style);
      
      function checkForLastNode(parent) {        
        if (parent.childNodes.length == 0){
          formatHtmlElement.appendChild(parent.cloneNode(true));
          formatedRange.appendChild(formatHtmlElement);
          console.log(formatedRange)
        } else {
          parent.childNodes.forEach(element => {
            // formatedRange.appendChild(element.cloneNode(true));
            checkForLastNode(element);
          })
        }
      };

      // console.log(clonedRange);
      // formatHtmlElement.appendChild()
      checkForLastNode(clonedRange)


      // clonedRange.childNodes.
      //   forEach(firstNode => {
      //     let one = firstNode;

      //     if (firstNode.nodeType == 3){
      //     } else {

      //       firstNode.childNodes.
      //         forEach(secondNode => {
      //           let two = secondNode;
  
      //           if(secondNode.nodeType == 3){
      //             formatHtmlElement.appendChild(two.cloneNode(true));
      //             one.appendChild(formatHtmlElement.cloneNode(true));
      //             formatedRange.appendChild(formatHtmlElement.cloneNode(true)); 
      //           } else {
      //             one.appendChild(secondNode.cloneNode(true));
  
      //           }
  
      //           // range.deleteContents();
      //           // range.insertNode(formatHtmlElement)
      //         }) 
      //           // clonedHtmlElements.push(element)
      //           // console.log(element)
      //           // clonedHtmltextContent.push(formatHtmlElement.textContent  = element.textContent)
      //     }
      //   }) 

      // document.getElementById("editor2").appendChild(clonedRange);
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
