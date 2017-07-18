PitchCloud.Cloud = (function() {
    function Cloud(args, out) {
        this.frequencies = args.frequencies;
        this.size = this.frequencies.length;
        this.grainLength = args.grainLength || 4.0;

        this._grains = [];

        for (var i = 0; i < this.size; i++) {
            this._grains.push(new PitchCloud.Grain({
                frequency: this.frequencies[i]
            }, out));
        }
    };

    Cloud.prototype._schedule = function(immediate) {
        var self = this,
            delay = immediate ? 0 : self.grainLength * 1000;

        this._timeout = setTimeout(function() {
            var randomIndex = Math.floor(Math.random() * self.size);
            self._grains[randomIndex].envelope.trigger();
            self._schedule();
        }, delay);
    }

    Cloud.prototype.start = function() {
        this._schedule(true);
    };

    Cloud.prototype.stop = function() {
        clearTimeout(this._timeout);
        for (var i = 0; i < this.size; i++) {
            this._grains[i].envelope.cancel();
        }
    }

    return Cloud;
})();
