PitchCloud.Cloud = (function() {
    function Cloud(args, out) {
        this.frequencies = args.frequencies;
        this.size = this.frequencies.length;
        this.grainLength = args.grainLength || 4.0;

        this._grains = [];

        for (var i = 0; i < this.size; i++) {
            this._grains.push(new PitchCloud.Grain({}, out));
        }

        this._currentGrainIndex = 0;
    };

    Cloud.prototype._schedule = function(immediate) {
        var self = this,
            delay = immediate ? 0 : self.grainLength * 1000,
            thisGrain = self._grains[self._currentGrainIndex];

        this._timeout = setTimeout(function() {
            var randomIndex = Math.floor(Math.random() * self.size),
                frequency = self.frequencies[randomIndex];

            thisGrain.vco.setFrequency(frequency);
            thisGrain.envelope.trigger();

            self._schedule();
        }, delay);

        self._currentGrainIndex++;
        self._currentGrainIndex %= self.size;
    }

    Cloud.prototype.start = function() {
        this._schedule(true);
    };

    Cloud.prototype.stop = function() {
        clearTimeout(this._timeout);
        setTimeout(function () {
            for (var i = 0; i < this.size; i++) {
                this._grains[i].envelope.cancel();
            }
        }, PitchCloud.masterLag);
    }

    return Cloud;
})();
