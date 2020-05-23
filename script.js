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

