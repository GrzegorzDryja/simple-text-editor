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
  let selectedText;
  if (startOfSelectedText <= endOfSelectedText){
    selectedText = selection.anchorNode.data.slice(startOfSelectedText, endOfSelectedText)
  } else {
    selectedText = selection.anchorNode.data.slice(endOfSelectedText, startOfSelectedText)
  }
  console.log(selectedText)  
}
