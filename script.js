let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
    selection = document.getSelection();
 
    if (selection.anchorNode.parentNode.nodeName === "B" &&
        selection.focusNode.parentNode.nodeName === "B"){
          bold = true;
      } else {
        bold = false;
      }
      bold ? document.getElementById("bold").classList.add("active") : document.getElementById("bold").classList.remove("active")

    if (selection.anchorNode.parentNode.nodeName === "I" &&
        selection.focusNode.parentNode.nodeName === "I"){
          italic = true;
      } else {
        italic = false;
      }
      italic ? document.getElementById("italic").classList.add("activei") : document.getElementById("italic").classList.remove("activei")
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
  const clonedRange = range.cloneContents();
  let formatedRange = document.getElementById("editor2");

  try {    
    if(
      style === "b" && bold === false ||
      style === "i" && italic === false){

        function styleTextElement(parent) {   
          let formatHtmlElement = document.createElement(style);
              formatHtmlElement.appendChild(parent);

          return formatHtmlElement;    
        }
       
      function everyChild(tree){
        tree.childNodes.forEach(element => {
          if(element.nodeType == 3){
            let formated = tree.appendChild(styleTextElement(tree))

            range.deleteContents();
            range.insertNode(formated)
          }
        })
      }
      everyChild(clonedRange);
    } else if(
      style === "b" && bold === true ||
      style === "i" && italic === true){
        console.log("usuwam")
        style === "b" ? bold = false : italic = false;
      
        range.deleteContents();
        range.insertNode(clonedRange)      

      }    
          //   if(element.childNodes.length > 0){
          //     console.log(element)
          //   }
          //   everyChild(element);
          // })

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

