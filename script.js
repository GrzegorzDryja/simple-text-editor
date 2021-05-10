let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
    selection = document.getSelection();
  })

function format(style){
  if(style === "b" || style === "i"){
    //Yep... crazy logic for handling left-right/right-left selection to pass in Range
    const startOfSelectedText = selection.anchorOffset <= selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
    const endOfSelectedText = startOfSelectedText == selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;
    const firstTextNode = startOfSelectedText == selection.anchorOffset ? selection.anchorNode : selection.focusNode;
    const lastTextNode = firstTextNode == selection.anchorNode ? selection.focusNode : selection.anchorNode;
  
    const range = new Range();    
          range.setStart(firstTextNode, startOfSelectedText);
          range.setEnd(lastTextNode, endOfSelectedText)
    
    try {
      const formatHtmlElement = document.createElement(style);
      const clonedHtmlSelection = [];

      if(range.cloneContents().hasChildNodes()){
        range.cloneContents().childNodes.
          forEach(element => clonedHtmlSelection.push(element.textContent))     
      } else {
        clonedHtmlSelection.push(range.commonAncestorContainer.parentElement.childNodes[0]);
        range.commonAncestorContainer.parentElement.nextElementSibling.childNodes.
          forEach(element => clonedHtmlSelection.push(element.textContent))
      }
      
      console.log(clonedHtmlSelection)

      // let formatedHtmlSelection = `<${style}>${clonedHtmlSelection}</${style}>`
      clonedHtmlSelection.forEach(element => formatHtmlElement.textContent += element);
      range.deleteContents(); //It delete also parent html element
      range.insertNode(formatHtmlElement)
      console.log(formatHtmlElement);    
    
    } catch(e) { console.log(e) }    
  
    selection.removeAllRanges();
    selection.addRange(range);
  
  console.log(`Someday I will ${style} this text... ${range.toString()}`) //I delete content of range
  } else {
    alert("There is no style match!")
  }
}
