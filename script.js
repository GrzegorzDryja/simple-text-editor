let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
  selection = document.getSelection();

  //Check if selection is styled
  if (selection.anchorNode.parentNode.nodeName === "B"
    && selection.focusNode.parentNode.nodeName === "B"){
      bold = true;
  } else {
      bold = false;
  }

  bold ?
  document.getElementById("bold").classList.add("active")
  : document.getElementById("bold").classList.remove("active");

  if (selection.anchorNode.parentNode.nodeName === "I"
    && selection.focusNode.parentNode.nodeName === "I"){
      italic = true;
  } else {
      italic = false;
  }

  italic ?
  document.getElementById("italic").classList.add("activei")
  : document.getElementById("italic").classList.remove("activei");
})

document.getElementById("save").addEventListener("click", () => {
  const edited =
    {innerHTML: `${document.getElementById("editor").innerHTML}`};
  const a = document.createElement("a");
  const file =
    new Blob([JSON.stringify(edited)], {type: "text/plain"});
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

  try {    
    if(style === "b" && bold === false
      || style === "i" && italic === false){

      function styleTextElement(elementToStyle) {   
        let formatHtmlElement = document.createElement(style);
            formatHtmlElement.appendChild(elementToStyle);

      return formatHtmlElement;    
      }
       
      function nodeTypeCheck(tree){
        if(tree.nodeType === 11){
          tree.replaceChildren(styleTextElement(tree.cloneNode(true)));    //Will work on paragraph (parent elements) later   
        }
          range.deleteContents();
          range.insertNode(tree);
      }

      nodeTypeCheck(clonedRange);
    
    } else if( style === "b" && bold === true
        || style === "i" && italic === true){
          //Deactivate buttons
          style === "b" ? bold = false : italic = false;
          //Create new Node from selection parts and replace old one without his parent <b>
          let dady = range.commonAncestorContainer.parentNode;      
          // range.commonAncestorContainer.parentNode.parentNode.removeChild(dady);
          let dadysText = document.createTextNode(dady.textContent);
          let dadysTextContentArray = [];
          if(dadysText.textContent.substring(0, selection.anchorOffset)){
            dadysTextContentArray.push(dadysText.textContent.substring(0, selection.anchorOffset))
          }
          if(dadysText.textContent.substring(selection.anchorOffset, selection.focusOffset)){
            dadysTextContentArray.push(dadysText.textContent.substring(selection.anchorOffset, selection.focusOffset));
          }
          if(dadysText.textContent.substring(selection.focusOffset, dadysText.length)){
            dadysTextContentArray.push(dadysText.textContent.substring(selection.focusOffset, dadysText.length));
          }
          // range.insertNode(dadysText);
      }    
    } catch(e) { console.log(e) }    
  
    selection.removeAllRanges();
    selection.addRange(range);  
}
