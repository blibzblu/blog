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

function save(){
  let request = new XMLHttpRequest();

  request.onerror = function(){
    console.log("Error Saving");
  }

  request.open("post", "/save-entry", true);
  //request.setRequestHeader('CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
  request.setRequestHeader('Content-Type', "Application/json");

  request.onload = function(){
    if(request.readyState === 4 && request.status === 200){
      console.log("Saved");
    }
  }

  request.send(JSON.stringify({
    "title": "title",
    "content": "content"
  }));
}
