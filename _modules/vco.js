PitchCloud.VCO = (function(context) {
  function VCO(args){
    this.oscillator = context.createOscillator();
    this.oscillator.type = 'sine';
    this.setFrequency(args.frequency || 440);
    this.oscillator.start(0);

    this.input = this.oscillator;
    this.output = this.oscillator;
  };

  VCO.prototype.setFrequency = function(frequency) {
    this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  };

  VCO.prototype.connect = function(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    };
  }

  return VCO;
})(PitchCloud.context);
