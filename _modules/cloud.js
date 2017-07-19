PitchCloud.Cloud = (function() {
    function Cloud(args, out) {
        var self = this;

        this.frequencies = args.frequencies;
        this.size = this.frequencies.length; // TODO size based on overlaps, not freqs
        this.grainLength = args.grainLength || 4.0;

        /**
         * Initialize Grains
         */

        this._grains = [];

        for (var i = 0; i < this.size; i++) {
            this._grains.push(new PitchCloud.Grain({}, out));
        }

        this._currentGrainIndex = 0;

        /**
         * Create controls
         */

        var controls = this.controls = {
            container: document.createElement('div')
        };

        controls.frequencyInput = document.createElement('input');
        controls.frequencyInput.value = this.frequencies;
        controls.frequencyInput.addEventListener('change', function() {
            var frequencies = this.value.split(',')
                .map(function(f) {
                    return +f;
                });

            self.frequencies = frequencies;
            console.log(self.frequencies, frequencies);
        });
        controls.container.appendChild(controls.frequencyInput);

        document.getElementsByClassName('clouds')[0]
            .appendChild(controls.container);
    };

    Cloud.prototype._schedule = function(immediate) {
        var self = this,
            delay = immediate ? 0 : self.grainLength * 1000,
            thisGrain = self._grains[self._currentGrainIndex];

        this._timeout = setTimeout(function() {
            var randomIndex = Math.floor(Math.random() * self.frequencies.length),
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
