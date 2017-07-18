var PitchCloud = {
    playing: false,
    masterLevel: 0.125
};

PitchCloud.context = (function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
})();

var gainNode = PitchCloud.context.createGain();
gainNode.gain.value = 0;
gainNode.connect(PitchCloud.context.destination);

var osc = PitchCloud.context.createOscillator();
osc.type = 'sine';
osc.frequency.value = 440;
osc.connect(gainNode);
osc.start();

var playButton = document.getElementsByClassName('play')[0];

playButton.addEventListener('click', function() {
    if (PitchCloud.isPlaying) {
        playButton.innerHTML = 'play';
        gainNode.gain.value = 0;
    } else {
        playButton.innerHTML = 'stop';
        gainNode.gain.value = PitchCloud.masterLevel;
    }
    PitchCloud.isPlaying = !PitchCloud.isPlaying;
});
