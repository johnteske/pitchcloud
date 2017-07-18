PitchCloud.VCA = (function(context) {
    function VCA() {
        this.gain = context.createGain();
        this.gain.gain.value = 0;
        this.input = this.gain;
        this.output = this.gain;
        this.amplitude = this.gain.gain;
    };

    VCA.prototype.connect = function(node) {
        if (node.hasOwnProperty('input')) {
            this.output.connect(node.input);
        } else {
            this.output.connect(node);
        };
    }

    return VCA;
})(PitchCloud.context);
