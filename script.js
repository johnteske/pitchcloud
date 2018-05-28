---
---
var PitchCloud = {
    playing: false,
    masterLevel: 0.125,
    masterLag: 500
};

PitchCloud.init = function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    PitchCloud.context = new AudioContext();

    // TODO use VCA module
    PitchCloud.masterGainNode = PitchCloud.context.createGain();
    PitchCloud.masterGainNode.gain.value = 0;
    PitchCloud.masterGainNode.connect(PitchCloud.context.destination);
};

// TODO call this on first button press (will need to refactor modules to be initialized)
PitchCloud.init();

{% include_relative _modules/vco.js %}
{% include_relative _modules/vca.js %}
{% include_relative _modules/env.js %}
{% include_relative _modules/grain.js %}
{% include_relative _modules/cloud.js %}

{% include_relative _components/play-button.js %}

var cloud = new PitchCloud.Cloud({
    frequencies: [330, 440, 550, 660, 808],
    grainLength: 2.0,
    grainPeriod: 1.0
}, PitchCloud.masterGainNode);

new PitchCloud.PlayButton(document.getElementsByClassName('play')[0]);
