let timerObj = {
  minutes: 0,
  seconds: 0,
  timerId: 0,
};

function soundAlarm() {
  let amount = 3;
  let audio = new Audio("Timer_Sound_Effect.mp3");
  function playSound() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  for (let i = 1; i < amount; i++) {
    setTimeout(playSound, 1200 * i);
  }
}

function updateValue(key, value) {
  if (value < 0) {
    value = 0;
    console.log("Positive Numbers Only");
  }
  if (key == "seconds") {
    if (value < 10) {
      value = "0" + value;
    }
    if (value > 59) {
      value = 59;
    }
  }

  $("#" + key).html(value || 0);
  timerObj[key] = value;

  console.log("Min", timerObj.minutes);
  console.log("Sec", timerObj.seconds);
}

(function detectChanges(key) {
  console.log("Detect Changes");
  let input = "#" + key + "-input";

  $(input).change(function () {
    updateValue(key, $(input).val());
  });
  $(input).keyup(function () {
    updateValue(key, $(input).val());
  });

  return arguments.callee;
})("minutes")("seconds");


function startTimer(){
    buttonManager(["start", false], ["pause", true], ["stop", true]);
}


function stopTimer(){
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    
}


function pauseTimer(){
    buttonManager(["start", true], ["pause", false], ["stop", true]);
    
}

['start', true], ['stop', ]

//this is rest operator
function buttonManager(...buttonsArray){
  for(let i = 0; i<buttonsArray.length; i++){
      let button = "#" + buttonsArray[i][0] + "-button";
      if(buttonsArray[i][1]){
          $(button).removeAttr("disabled");
      }else{
          $(button).attr("disabled", "disabled");
      }
  }
}