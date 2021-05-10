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
  
    let range = new Range();
    
    range.setStart(firstTextNode, startOfSelectedText);
    range.setEnd(lastTextNode, endOfSelectedText)
    
    let formatHtmlElement= document.createElement(style);
    try {
      range.surroundContents(formatHtmlElement); //Works, but... dosn't work on selection like "<b>sfsfa" with no clossing tag
    } catch(e) { console.log(e) }    
  
    selection.removeAllRanges();
    selection.addRange(range);
  
  console.log(`Someday I will ${style} this text... ${range.toString()}`)
  } else {
    alert("There is no style match!")
  }
}
