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

var gainNode = PitchCloud.context.createGain();
gainNode.gain.value = 0;
gainNode.connect(PitchCloud.context.destination);

var grain = new PitchCloud.Grain(gainNode);

var playButton = document.getElementsByClassName('play')[0];

playButton.addEventListener('click', function() {
    if (PitchCloud.isPlaying) {
        playButton.innerHTML = 'play';
        gainNode.gain.value = 0;
    } else {
        playButton.innerHTML = 'stop';
        grain.envelope.trigger();
        gainNode.gain.value = PitchCloud.masterLevel;
    }
    PitchCloud.isPlaying = !PitchCloud.isPlaying;
});
