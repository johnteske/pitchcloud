//import VCO from "./modules/vco"
//import VCA from "./modules/vca"
//import EnvelopeGenerator from "./modules/env"
//import Grain from "./modules/grain"
//import Cloud from "./modules/cloud"
//import PlayButton from "./components/play-button"
var PitchCloud = {
    playing: false,
    masterLevel: 0.125,
    masterLag: 500,
    // TODO
    init: null,
    context: null,
    masterGainNode: null
};
PitchCloud.init = function () {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    PitchCloud.context = new AudioContext();
    // TODO use VCA module
    PitchCloud.masterGainNode = PitchCloud.context.createGain();
    PitchCloud.masterGainNode.gain.value = 0;
    PitchCloud.masterGainNode.connect(PitchCloud.context.destination);
};
// TODO call this on first button press (will need to refactor modules to be initialized)
//PitchCloud.init();
// TODO
//var cloud = new Cloud(
//  {
//    frequencies: [330, 440, 550, 660, 808],
//    grainLength: 2.0,
//    grainPeriod: 1.0,
//  },
//  PitchCloud.masterGainNode
//);
// TODO
//new PlayButton(document.getElementsByClassName("play")[0]);
