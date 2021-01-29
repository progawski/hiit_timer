document.addEventListener("DOMContentLoaded", function() {
    
    var trainTime = 10;
    var restTime = 5;
    var time = trainTime;

    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");
    var stopButton = document.getElementById("stop");
    var countdownText = document.getElementById("countdown");
    var title = document.getElementById("title");
    var icons = document.getElementById("icons");
    
    var countdownInterval;

    var isPaused = false;
    var pausedActivity;

    displayTime(time)

    playButton.addEventListener('click', () => { 
        playButton.disabled = true;
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
        time = trainTime;
        displayTime(time);
        title.textContent = 'START';

        document.body.className = 'body-bg-rest';
        icons.classList.remove("icons-color-train");
        icons.classList.add("icons-color-rest");
        title.className = 'title-bg-rest';
        countdownText.className = 'countdown-bg-rest';
    });


    function displayTime(actualTime){

        var minutes = parseInt(actualTime / 60, 10);
        var seconds = parseInt(actualTime % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10? '0' + seconds : seconds;

        countdownText.innerHTML = minutes + ':' + seconds;   
    }

    function countdown(activity){
        
        if(activity){
            time = trainTime;
            title.textContent = 'TRAIN';

            document.body.className = 'body-bg-train';
            icons.classList.remove("icons-color-rest");
            icons.classList.add("icons-color-train");
            title.className = 'title-bg-train';
            countdownText.className = 'countdown-bg-train';
        } else{
            time = restTime;
            title.textContent = 'REST';

            document.body.className = 'body-bg-rest';
            icons.classList.remove("icons-color-train");
            icons.classList.add("icons-color-rest");
            title.className = 'title-bg-rest';
            countdownText.className = 'countdown-bg-rest';
        }

        displayTime(time);

        countdownInterval = setInterval(() => {
       
            if(!isPaused){   
                time--;
                displayTime(time); 

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
});
