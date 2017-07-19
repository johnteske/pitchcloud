PitchCloud.Grain = (function(context) {
    function Grain(args, out) {
        this.vco = new PitchCloud.VCO({ frequency: args.frequency });
        this.vca = new PitchCloud.VCA();
        this.envelope = new PitchCloud.EnvelopeGenerator({ length: args.grainLength });

        this.vco.connect(this.vca);
        this.envelope.connect(this.vca.amplitude);
        this.vca.connect(out);
    };

    return Grain;
})(PitchCloud.context);
