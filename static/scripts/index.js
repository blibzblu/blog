var launchDate = 1525824000000;

setInterval(function(){
  update();
}, 1000);

function update(){
  var currentDate = Date.now();
  var deltaMilis = launchDate - currentDate;

  if(deltaMilis <= 0){
    window.location = "?postid=000001";
  }

  var secondLength = 1000;
  var minuteLength = secondLength * 60;
  var hourLength = minuteLength * 60;
  var dayLength = hourLength * 24;

  var daysLeft = parseInt(deltaMilis / dayLength);
  deltaMilis -= daysLeft * dayLength;
  var hoursLeft = parseInt(deltaMilis / hourLength);
  deltaMilis -= hoursLeft * hourLength;
  var minutesLeft = parseInt(deltaMilis / minuteLength);
  deltaMilis -= minutesLeft * minuteLength;
  var secondsLeft = parseInt(deltaMilis / secondLength);

  document.getElementById("v1").innerText = daysLeft;
  document.getElementById("v2").innerText = hoursLeft;
  document.getElementById("v3").innerText = minutesLeft;
  document.getElementById("v4").innerText = secondsLeft;
}
