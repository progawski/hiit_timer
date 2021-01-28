document.addEventListener("DOMContentLoaded", function() {
    

    var playButton = document.getElementById("play");

    

    var startTime = 30; 

    var timer = setInterval(function(){

        
        if(startTime > 0){
            startTime--;
        }
        

        startTimeMin = parseInt(startTime / 60, 10);

        document.getElementById("countdown").innerHTML = startTimeMin + ':' + startTime;
    }, 1000);

});