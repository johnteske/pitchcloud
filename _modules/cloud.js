PitchCloud.Cloud = (function() {
    function Cloud(args, out) {
        var self = this;

        this.frequencies = args.frequencies;
        this.size = this.frequencies.length; // TODO size based on overlaps, not freqs
        this.grainLength = args.grainLength || 4.0;
        this.grainPeriod = args.grainPeriod || 2.0;

        /**
         * Initialize Grains
         */

        this._grains = [];

        for (var i = 0; i < this.size; i++) {
            this._grains.push(new PitchCloud.Grain({
                grainLength: this.grainLength
            }, out));
        }

        this._currentGrainIndex = 0;

        /**
         * Create controls
         */

        var controls = this.controls = {}

        var template = document.getElementById('cloud-template');
        var templateHTML = template.innerHTML;

        controls.container = document.createElement('div');
        controls.container.className = 'cloud';
        controls.container.innerHTML = templateHTML;

        controls.frequency = controls.container.getElementsByClassName('frequencies')[0];
        controls.frequency.value = this.frequencies;
        controls.frequency.addEventListener('change', function() {
            var frequencies = this.value.split(',')
                .map(function(f) {
                    return +f;
                });
            self.frequencies = frequencies;
        });

        controls.period = controls.container.getElementsByClassName('period')[0];
        controls.period.value = this.grainPeriod;
        controls.period.addEventListener('change', function() {
            self.grainPeriod = this.value;
        });

        controls.duration = controls.container.getElementsByClassName('duration')[0];
        controls.duration.value = this.grainLength;
        controls.duration.addEventListener('change', function() {
            self.grainLength = this.value;
        });

        document.getElementsByClassName('clouds')[0]
            .appendChild(controls.container);
    };

    Cloud.prototype._schedule = function(immediate) {
        var self = this,
            delay = immediate ? 0 : self.grainPeriod * 1000,
            thisGrain = self._grains[self._currentGrainIndex];

        this._timeout = setTimeout(function() {
            var randomIndex = Math.floor(Math.random() * self.frequencies.length),
                frequency = self.frequencies[randomIndex];

            thisGrain.vco.setFrequency(frequency);
            thisGrain.envelope.setLength(self.grainLength);
            thisGrain.envelope.trigger();

            self._schedule();
        }, delay);

        self._currentGrainIndex++;
        self._currentGrainIndex %= self.size;
    }

    Cloud.prototype.start = function() {
        this._schedule(true);
        PitchCloud.masterGainNode.gain.linearRampToValueAtTime(PitchCloud.masterLevel, PitchCloud.context.currentTime + (PitchCloud.masterLag / 1000));
    };

    Cloud.prototype.stop = function() {
        clearTimeout(this._timeout);
        setTimeout(function () {
            for (var i = 0; i < this.size; i++) {
                this._grains[i].envelope.cancel();
            }
        }, PitchCloud.masterLag);
        PitchCloud.masterGainNode.gain.linearRampToValueAtTime(0, PitchCloud.context.currentTime + (PitchCloud.masterLag / 1000));
    }

    return Cloud;
})();
