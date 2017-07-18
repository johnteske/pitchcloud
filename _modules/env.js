PitchCloud.EnvelopeGenerator = (function(context) {
  function EnvelopeGenerator() {
    this.attackTime = 2.0;
    this.releaseTime = 2.0;
  };

  EnvelopeGenerator.prototype.trigger = function() {
    now = context.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.setValueAtTime(0, now);
    this.param.linearRampToValueAtTime(1, now + this.attackTime);
    this.param.linearRampToValueAtTime(0, now + this.attackTime + this.releaseTime);
  };

  EnvelopeGenerator.prototype.connect = function(param) {
    this.param = param;
  };

  return EnvelopeGenerator;
})(PitchCloud.context);
