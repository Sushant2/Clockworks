let timerObj = {
  minutes: 0,
  seconds: 0,
  timerId: 0,
};

function soundAlarm() {
  let amount = 3;
  let audio = new Audio("13767_morning_alarm.mp3");
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

function startTimer() {
  let $ = (x) => document.querySelector(x);

  if ($("#minutes-input").value === "" && $("#seconds-input").value === "")
    return alert("Please, the value cannot be zero!");

  buttonManager(["start", false], ["pause", true], ["stop", true]);
  freezeInputs();
  timerObj.timerId = setInterval(function () {
    timerObj.seconds--;
    if (timerObj.seconds < 0) {
      if (timerObj.minutes == 0) {
        soundAlarm();
        return stopTimer;
      }
      timerObj.seconds = 59;
      timerObj.minutes--;
    }
    updateValue("minutes", timerObj.minutes);
    updateValue("seconds", timerObj.seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerObj.timerId);
  buttonManager(["start", true], ["pause", false], ["stop", false]);
  unfreezeInputs();
  updateValue("minutes", $("#minutes-input").val());
  updateValue("seconds", $("#seconds-input").val());
  // If the seconds is falsy, or undefined, set seconds to "0". Just 1 zero because line 29 checks if the value is less than 10, and if it is it will add an extra zero for you.
  // The seconds will by default be undefined.  Expliclty setting the seconds to 0 will prevent formats such as 1:0 or 2:0 when the timer expires, where the correct format should be 1:00 or 2:00.
  let seconds = $("#seconds-input").val() || "0";
  updateValue("seconds", seconds);
}

function pauseTimer() {
  buttonManager(["start", true], ["pause", false], ["stop", true]);
  clearInterval(timerObj.timerId);
}

["start", true], ["stop"];

//this is rest operator
function buttonManager(...buttonsArray) {
  for (let i = 0; i < buttonsArray.length; i++) {
    let button = "#" + buttonsArray[i][0] + "-button";
    if (buttonsArray[i][1]) {
      $(button).removeAttr("disabled");
    } else {
      $(button).attr("disabled", "disabled");
    }
  }
}

function freezeInputs() {
  $("#minutes-input").attr("disabled", "disabled");
  $("#seconds-input").attr("disabled", "disabled");
}
function unfreezeInputs() {
  $("#minutes-input").removeAttr("disabled");
  $("#seconds-input").removeAttr("disabled");
}
