let editor = document.getElementById("editor");
let selection;
let bold = false;
let italic = false;
let unorderedList = false;

//Activate caret on start (works on FF)
(() => {
  const ran = document.createRange();
  selection = document.getSelection();

  ran.setStart(editor.childNodes[0], 0)
  ran.collapse(true)
  
  selection.removeAllRanges()
  selection.addRange(ran)
})()

document.addEventListener("click", () => {
  if(editor.textContent === "SIMPLE TEXT EDITOR"){
    editor.innerHTML = "";
  }
})

document.addEventListener("selectionchange", () => {
  selection = document.getSelection();
  //checkSelectionStyle(); this occures an error during caret flow formating
})

document.getElementById("save").addEventListener("click", () => {
  const editorted =
    {innerHTML: `${editor.innerHTML}`};
  const a = document.createElement("a");
  const file =
    new Blob([JSON.stringify(editorted)], {type: "text/plain"});
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
    editor.innerHTML = loadedFile.innerHTML;
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
//It could be working not only on selection, but also on curent caret position
function checkSelectionStyle(){
  const anchorParentParentNodeName = selection.anchorNode.parentNode.parentNode.nodeName;
  const anchorParentNodeName = selection.anchorNode.parentNode.nodeName;
  const focusParentNodeName = selection.focusNode.parentNode.nodeName;

  if (anchorParentParentNodeName === "B"
    || anchorParentNodeName === "B" && focusParentNodeName === "B"){
    bold = true;
  } else {
      bold = false;
  }
  if (anchorParentParentNodeName === "I"
    || anchorParentNodeName === "I" && focusParentNodeName === "I"){
      italic = true;
  } else {
      italic = false;
  }

  addClassToMenuStyle();
}

function addClassToMenuStyle(){
  const boldMenuElement = document.getElementById("bold");
  const italicMenuElement = document.getElementById("italic");

  bold ?
  boldMenuElement.classList.add("activeBold")
  : boldMenuElement.classList.remove("activeBold");
  
  italic ?
  italicMenuElement.classList.add("activeItalic")
  : italicMenuElement.classList.remove("activeItalic");
}

function compareStyleType(style, type){
  return style === type;
}

function format(style){
  const range = getSelection();  
  const clonedRange = range.cloneContents();
  const formatHtmlElement = document.createElement(style);
  //Doesn't works on two elements in the same time
  bold = compareStyleType(style, "b");
  italic = compareStyleType(style, "i");
  addClassToMenuStyle();
  
  //This should be splited for inserting by caret or inserting by selecetion
  //and deleteing format of selection or stop formating writen text on caret postion
  try {
    //Insert style in caret position works nice on Firefox
    //Style is added only on selecetionchange
    if(range.collapsed){
      range.surroundContents(formatHtmlElement);
      range.setStart(formatHtmlElement, 0);
      range.collapse(true);
      //Activate menu status
      // if(style === "b"){
      //   bold = true;
      // }
      // if(style === "i"){
      //   italic = true;
      // }
      // addClassToMenuStyle();

    } else if(style === "b" && bold === false
      || style === "i" && italic === false){

      function styleTextElement(elementToStyle) {
            if(elementToStyle.textContent === ""){
              formatHtmlElement.innerHTML = "&#8203;"
            } else {
              formatHtmlElement.appendChild(elementToStyle);
            }
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

    //Removing style
    } else if( style === "b" && bold === true
        || style === "i" && italic === true){
          //Deactivate buttons
          style === "b" ? bold = false : italic = false;
          //Create new Node from selection parts and replace old one without his parent <b>
          let dady = range.commonAncestorContainer.parentNode;
          let selectedText = range.cloneContents();    
          
          let dadysText = document.createTextNode(dady.textContent);
          let dadysTextContentArray = [];
          let dadToInsert = document.createDocumentFragment();
          //There is no check if childs have any parent node!
          if(dadysText.textContent.substring(0, selection.anchorOffset)){
            dadysTextContentArray
            .push(dadysText.textContent.substring(0, selection.anchorOffset))
          }
          if(dadysText.textContent
              .substring(selection.anchorOffset, selection.focusOffset)){
            dadysTextContentArray
              .push(dadysText.textContent
                .substring(selection.anchorOffset, selection.focusOffset));
          }
          if(dadysText.textContent
              .substring(selection.focusOffset, dadysText.length)){
            dadysTextContentArray
              .push(dadysText.textContent
                .substring(selection.focusOffset, dadysText.length));
          }
          dadysTextContentArray.forEach(dad => {
            if(dad != selectedText.textContent){
              let formated = document.createElement(style);
              formated.appendChild(document.createTextNode(dad));
              dadToInsert.appendChild(formated);
            } else {
              dadysText.textContent = dad;
              dadToInsert.appendChild(dadysText);         
            }
          })
          range.deleteContents();          
          range.commonAncestorContainer.parentNode.parentNode
            .removeChild(dady);          
          range.insertNode(dadToInsert.cloneNode(true));
          range.collapse(dady);
        }    
      } catch(e) { console.log(e) }   
    //To keep selection motionless 
    selection.removeAllRanges();
    selection.addRange(range);  
}

function makeUnorderedList(){
  const range = getSelection();
  const content = range.extractContents()
  const listItem = document.createElement("li");
  let unorderedList = document.createElement("ul");

  listItem.appendChild(content);
  unorderedList.appendChild(listItem)
  range.insertNode(unorderedList);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);  
}
