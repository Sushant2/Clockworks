let timerObj = {
    minuts = 0,
    seconds = 0,
    timerId = 0
}

function soundAlarm(){
    let amount = 3;
    let audio = new Audio("Timer_Sound_Effect.mp3");
    function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
    for(let i = 0; i< amount; i++){
        setTimeout(playSound, 1200 * i);
    }
}


function updateValue(key, value){
    if(value < 0){
        value = 0;
        console.log("Positive Numbers Only");
    }
    if(key == "seconds"){
        if(value < 10){
            value = "0" + value;
        }
    }    

    $("#" + key).html(value || 0);
    timerObj[key] = value;
}