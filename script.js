document.
  addEventListener("selectionchange", () => {
    const selection = document.getSelection();  
    console.log(selection.toString());
  })
