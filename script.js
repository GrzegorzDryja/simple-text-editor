document.getElementById("editor").addEventListener("click", () => {
  const selection = document.getSelection();
  calculateSelectedText(selection)
})

document.getElementById("editor").addEventListener("keyup", (event) => {
  if(event.shiftKey && event.keyCode == 39 || event.keyCode == 37){
    const selection = document.getSelection();  
    calculateSelectedText(selection)
  }
})

function calculateSelectedText(selection){
  let startOfSelectedText = selection.anchorOffset;
  let endOfSelectedText = selection.focusOffset;
  const firstTextNode = selection.anchorNode;
  const lastTextNode = selection.focusNode;

  console.log(selection.toString()); //This works on both direction
  
  let range = new Range();

  range.setStart(firstTextNode, startOfSelectedText);
  range.setEnd(lastTextNode, endOfSelectedText)

  document.getSelection().removeAllRanges();
  document.getSelection().addRange(range);
  console.log(range.toString()); //This dosn't work form left to right, selection is reset

}
