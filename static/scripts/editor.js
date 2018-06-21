//document.getElementById("editarea").innerHTML = marked('# Marked in browser\n\nRendered by **marked**.');

var editArea = document.getElementById("editarea");
var previewArea = document.getElementById("previewarea");

function preview(){
  var preved = document.getElementById("previewedit");
  preved.innerText = "Edit";

  var markedText = editarea.value;
  var compiledMarkup = marked(markedText);

  previewArea.innerHTML = compiledMarkup;

  editarea.classList = "hidden-area";
  previewArea.classList = "shown-area";

  preved.setAttribute("onclick", "edit()");
}

function edit(){
  var preved = document.getElementById("previewedit");
  preved.innerText = "Preview";

  editarea.classList = "shown-area";
  previewArea.classList = "hidden-area";

  preved.setAttribute("onclick", "preview()");
}
