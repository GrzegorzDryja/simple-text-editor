let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
    selection = document.getSelection();
  })

function makeItBold(){
  //Yep... crazy logic for handling left-right/right-left selection
  const startOfSelectedText = selection.anchorOffset <= selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
  const endOfSelectedText = startOfSelectedText == selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;
  const firstTextNode = startOfSelectedText == selection.anchorOffset ? selection.anchorNode : selection.focusNode;
  const lastTextNode = firstTextNode == selection.anchorNode ? selection.focusNode : selection.anchorNode;

  let range = new Range();
  
  range.setStart(firstTextNode, startOfSelectedText);
  range.setEnd(lastTextNode, endOfSelectedText)
  
  let b = document.createElement('b');
  try {
    range.surroundContents(b); //Works, but... dosn't work on selection like "<b>sfsfa" with no clossing tag
  } catch(e) { console.log(e) }    

  selection.removeAllRanges();
  selection.addRange(range);

  bold = true;
}

function makeItItalic(){
  italic = true;
  console.log(selection.toString()) 
}

function makeUnorderedList(){
  unorderedList = true;
  console.log(selection.toString())
}
