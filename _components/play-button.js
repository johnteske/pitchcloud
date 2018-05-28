PitchCloud.PlayButton = (function() {
    function PlayButton(element) {
        this.element = element;
        addClickHandler(element);
    }

    function addClickHandler(element) {
        element.addEventListener('click', function() {
            if (PitchCloud.isPlaying) {
                element.innerHTML = 'play';
                cloud.stop();
            } else {
                element.innerHTML = 'stop';
                cloud.start();
            }
            
            PitchCloud.isPlaying = !PitchCloud.isPlaying;
        });
    }

    return PlayButton;
})();
