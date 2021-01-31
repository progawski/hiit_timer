document.addEventListener("DOMContentLoaded", function() {
    
    var trainTime = 90;
    var restTime = 30;
    var time = trainTime;

    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");
    var stopButton = document.getElementById("stop");
    var countdownContainer = document.getElementById("countdown-container");
    var countdownText = document.getElementById("countdown");
    var title = document.getElementById("title");
    var icons = document.getElementById("icons");
    var settingsTitles = document.getElementsByClassName("settings-title");
    var trainInputMin = document.getElementById("train-input-min");
    var trainInputSec = document.getElementById("train-input-sec");
    var restInputMin = document.getElementById("rest-input-min");
    var restInputSec = document.getElementById("rest-input-sec");

    var beep = document.getElementById("beep");
    var voiceOne = document.getElementById("voice-one");
    var voiceTwo = document.getElementById("voice-two");
    var voiceThree = document.getElementById("voice-three");
    
    var countdownInterval;

    var isPaused = false;
    var pausedActivity;

    displayTime(time);

    setInputFilter(trainInputMin, function(value) {
        return /^-?\d*$/.test(value); 
    });
    setInputFilter(trainInputSec, function(value) {
        return /^-?\d*$/.test(value); 
    });
    setInputFilter(restInputMin, function(value) {
        return /^-?\d*$/.test(value); 
    });
    setInputFilter(restInputSec, function(value) {
        return /^-?\d*$/.test(value); 
    });

    playButton.addEventListener('click', () => { 
        playButton.disabled = true;
        trainInputMin.disabled = true;
        trainInputSec.disabled = true;
        restInputMin.disabled = true;
        restInputSec.disabled = true;
        settingsTitles[0].style.cssText = "opacity: 0.2; transition: opacity 1s;";
        settingsTitles[1].style.cssText = "opacity: 0.2; transition: opacity 1s;";
        if(isPaused){
            isPaused = false;
            pauseButton.disabled = false;
            title.textContent = pausedActivity;
        } else {
            countdown(1);
        }
    });

    pauseButton.addEventListener('click', () => {
        if(!isPaused && playButton.disabled){
            isPaused = true;
            pauseButton.disabled = true;
            playButton.disabled = false;
            pausedActivity = title.textContent;
            title.textContent = 'PAUSED';
        } 
    })

    stopButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        isPaused = false;
        pauseButton.disabled = false;
        playButton.disabled = false;
        trainInputMin.disabled = false;
        trainInputSec.disabled = false;
        restInputMin.disabled = false;
        restInputSec.disabled = false;
        time = trainTime;
        displayTime(time);
        title.textContent = 'SETTINGS';

        document.body.className = 'body-bg-rest';
        icons.classList.remove("icons-color-train");
        icons.classList.add("icons-color-rest");
        title.className = 'title-bg-rest';
        countdownContainer.className = 'countdown-bg-rest';
        settingsTitles[0].style.cssText = "opacity: 1; transition: opacity 1s;";
        settingsTitles[1].style.cssText = "opacity: 1; transition: opacity 1s;";
    });


    function displayTime(actualTime){

        var minutes = parseInt(actualTime / 60, 10);
        var seconds = parseInt(actualTime % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10? '0' + seconds : seconds;

        countdownText.innerHTML = minutes + ':' + seconds;   
    }

    function countdown(activity){
        
        beep.play();

        if(activity){
            time = trainTime;
            title.textContent = 'TRAIN';

            document.body.className = 'body-bg-train';
            icons.classList.remove("icons-color-rest");
            icons.classList.add("icons-color-train");
            title.className = 'title-bg-train';
            countdownContainer.className = 'countdown-bg-train';
        } else{
            time = restTime;
            title.textContent = 'REST';

            document.body.className = 'body-bg-rest';
            icons.classList.remove("icons-color-train");
            icons.classList.add("icons-color-rest");
            title.className = 'title-bg-rest';
            countdownContainer.className = 'countdown-bg-rest';
        }

        displayTime(time);

        countdownInterval = setInterval(() => {
       
            if(!isPaused){   
                time--;
                displayTime(time); 

                switch(time){
                    case 3: voiceThree.play(); break;
                    case 2: voiceTwo.play(); break;
                    case 1: voiceOne.play(); break;
                }

                if(time == 0){
            
                    clearInterval(countdownInterval);
                    if(activity){
                        countdown(0);                 
                    } else {
                        countdown(1);
                    }            
                }
            }
        }, 1000);
    }

    // Restricts input for the given textbox to the given inputFilter.
    function setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
            this.value = "";
            }
        });
        });
    }

});
