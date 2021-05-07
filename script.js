document.getElementById("editor").addEventListener("click", () => {
  const selection = window.getSelection();
  calculateSelectedText(selection)
})

document.getElementById("editor").addEventListener("keyup", (event) => {
  if(event.shiftKey && event.keyCode == 39 || event.keyCode == 37){
    const selection = window.getSelection();  
    calculateSelectedText(selection)
  }
})

function calculateSelectedText(selection){
  const startOfSelectedText = selection.anchorOffset;
  const endOfSelectedText = selection.focusOffset;
  let selectedText = "";
  if (startOfSelectedText <= endOfSelectedText && selection.anchorNode == selection.focusNode){
    selectedText = selection.anchorNode.textContent.slice(startOfSelectedText, endOfSelectedText)
  }
  if (startOfSelectedText >= endOfSelectedText && selection.anchorNode == selection.focusNode){
    selectedText = selection.anchorNode.textContent.slice(endOfSelectedText, startOfSelectedText)
  }
  if (selection.anchorNode !== selection.focusNode){
    selectedText += selection.anchorNode.textContent.substring(startOfSelectedText);
    selectedText += selection.focusNode.textContent.substring(0, endOfSelectedText)
    //First node cated from start... + next node + ... + last node cated to end...
  }
  console.log(selection)
  console.log(selectedText)
}
