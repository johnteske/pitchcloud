PitchCloud.Grain = (function(context) {
  function Grain(out) {
      this.vco = new PitchCloud.VCO();
      this.vca = new PitchCloud.VCA();
      this.envelope = new PitchCloud.EnvelopeGenerator();

      this.vco.connect(this.vca);
      this.envelope.connect(this.vca.amplitude);
      this.vca.connect(out);
  };

  return Grain;
})(PitchCloud.context);
