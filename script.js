---
---
var PitchCloud = {
    playing: false,
    masterLevel: 0.125
};

PitchCloud.context = (function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
})();

{% include_relative _modules/vco.js %}
{% include_relative _modules/vca.js %}
{% include_relative _modules/env.js %}
{% include_relative _modules/grain.js %}
{% include_relative _modules/cloud.js %}

var gainNode = PitchCloud.context.createGain();
gainNode.gain.value = 0;
gainNode.connect(PitchCloud.context.destination);

var cloud = new PitchCloud.Cloud({
    frequencies: [440, 550, 660],
    grainLength: 2.0
}, gainNode);

var playButton = document.getElementsByClassName('play')[0];

playButton.addEventListener('click', function() {
    if (PitchCloud.isPlaying) {
        playButton.innerHTML = 'play';
        cloud.stop();
        gainNode.gain.value = 0;
    } else {
        playButton.innerHTML = 'stop';
        cloud.start();
        gainNode.gain.value = PitchCloud.masterLevel;
    }
    PitchCloud.isPlaying = !PitchCloud.isPlaying;
});
