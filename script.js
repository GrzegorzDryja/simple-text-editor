document.getElementById("editor").addEventListener("click", () => {
    const selection = window.getSelection();
    const startOfSelectedText = selection.anchorOffset;
    const endOfSelectedText = selection.focusOffset;
    const selectedText = selection.anchorNode.data.slice(startOfSelectedText, endOfSelectedText)
    console.log(selectedText)
})
