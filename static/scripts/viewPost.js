var content = document.querySelector('meta[name="content"]').getAttribute('content');
content = marked(content);
document.getElementById("contentArea").innerHTML = content;
