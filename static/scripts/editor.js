//document.getElementById("editarea").innerHTML = marked('# Marked in browser\n\nRendered by **marked**.');

var editArea = document.getElementById("editarea");
var previewArea = document.getElementById("previewarea");

function preview(){
  var preved = document.getElementById("previewedit");
  preved.innerText = "Edit";

  var markedText = editarea.value;
  var compiledMarkup = marked(markedText);

  previewArea.innerHTML = compiledMarkup;

  editarea.style.height = "0";
  previewArea.style.height = "80%";

  preved.setAttribute("onclick", "edit()");
}

function edit(){
  var preved = document.getElementById("previewedit");
  preved.innerText = "Preview";

  editarea.style.height = "80%";
  previewArea.style.height = "0";

  preved.setAttribute("onclick", "preview()");
}
