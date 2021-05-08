let selection;
let bold = false;
let italic = false;
let unorderedList = false;

document.addEventListener("selectionchange", () => {
    selection = document.getSelection();
  })

function makeItBold(){
  const startOfSelectedText = selection.anchorOffset;
  const endOfSelectedText = selection.focusOffset;
  const firstTextNode = selection.anchorNode;
  const lastTextNode = selection.focusNode;

  let range = new Range();
  let bNode = document.createElement('b');

  range.setStart(firstTextNode, startOfSelectedText); //only left to right selection in this scenario
  range.setEnd(lastTextNode, endOfSelectedText)

  let b = document.createElement('b');
  try {
    range.surroundContents(b); //Works, but... user select is lost, and dosn't work on selection like "<b>sfsfa" with no clossing tag
  } catch(e) { console.log(e) }    

  // bNode.innerHTML = selection.toString(); //It lost all other html elements
  // bNode.innerHTML = range.cloneContents().childNodes[0].textContent;
  // console.log(range.cloneContents());
  // selection.removeAllRanges(); //It lost also user select
  // selection.addRange(range);    
  // range.insertNode(bNode);
  // range.deleteContents()
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
