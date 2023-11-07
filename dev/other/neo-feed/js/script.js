// from GitHub Gist: https://gist.github.com/colingourlay/82506396503c05e2bb94
_.mixin({
    'sortKeysBy': function (obj, comparator) {
        var keys = _.sortBy(_.keys(obj), function (key) {
            return comparator ? comparator(obj[key], key) : key;
        });

        return _.object(keys, _.map(keys, function (key) {
            return obj[key];
        }));
    }
});

(function() {
    var clipboard;

    this.FetchNEOs = function() {
        function fetchNEOs() {
            var today = moment().format("YYYY-MM-DD"),
                future = moment(today).add(7, 'day').format("YYYY-MM-DD");

            var neoURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + today + '&end_date=' + future;
            // var neoURL = 'https://ssd-api.jpl.nasa.gov/cad.api?dist-max=100LD&date-min=' + today + '&date-max=' + future + '&sort=date';

            var xhr = new XMLHttpRequest();
            xhr.open('POST', './neo-feed.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function (e) {
                if (xhr.status === 200) {
                    if (xhr.response === "Request failed") {
                        console.log("Something went wrong.");
                    } else {
                        var neoObj = JSON.parse(xhr.response);
                        cleanNEOs(neoObj);
                    }
                }
            };
            xhr.onerror = function (e) {
                alert("Error retrieving NEOs.");
            };
            xhr.send("neoURL=" + neoURL);
        }


        function cleanNEOs(neoObj) {
            this.neoArray = {};

            _.each(neoObj, function(obj, key) {
                var tempArray = [];
                this.date = key;
                this.neoArray[this.date] = [];

                _.each(obj, function(neo) {
                    var neoName = neo.name,
                        neoDistance = Number(neo.close_approach_data[0].miss_distance.lunar);

                    if (neoName.indexOf('(') === 0) {
                        neoName = neoName.replace(/[()]/g, '');
                    }

                    // only add NEO is under 100 lunar distance
                    if (neoDistance < 100) {
                        tempArray.push({
                            name: neoName,
                            distance: Number(neoDistance.toFixed(1))
                        });
                    }
                });

                var tempArraySorted = _.sortBy(tempArray, 'distance');

                _.each(tempArraySorted, function(obj) {
                    this.neoArray[this.date].push(obj);
                });
            });

            renderNEOs(this.neoArray);
        }

        function renderNEOs(neoArray) {
            var $neoLocation = document.getElementById('neo-list'),
                sortedNEOs = _.sortKeysBy(neoArray),
                sortedNEOsByDistance,
                neoObj;

            for (var key in sortedNEOs) {
                var neoDate = '<br><br><strong>' + key + '</strong><br>',
                    neoInfo = '';

                sortedNEOsByDistance = _.sortBy(neoArray[key], 'distance');

                for (neoObj = 0; neoObj < sortedNEOsByDistance.length; neoObj++) {
                    var neoName = neoArray[key][neoObj].name;
                    var neoDistance = neoArray[key][neoObj].distance;
                    neoInfo += neoName + ' :: ' + neoDistance + ' LD&nbsp;' + '<br>';
                }

                if (neoInfo === "") { neoInfo = "<em>No close approaches</em>"; }

                var finalNeoInfo = neoDate + '<div id="select-text-' + key + '">' + neoInfo +
                '</div><button type="button" data-clipboard-target="#select-text-' + key + '" class="btn copy-text-' + key + '">Copy</button>';

                $neoLocation.insertAdjacentHTML('beforeend', finalNeoInfo);
            }

            clipboard = new Clipboard('.btn');

            clipboard.on('success', function(e) {
                e.trigger.innerText = "Copied!";
                e.trigger.setAttribute('style', 'background: #56a056; color: #FFF; border-color: #3a793a;');
                e.clearSelection();

                setTimeout(function(){
                    e.trigger.innerText = "Copy";
                    e.trigger.removeAttribute('style');
                }.bind(e), 2000);
            });

            clipboard.on('error', function(e) {
                e.trigger.innerText = "Error Copying";
                e.trigger.setAttribute('style', 'background: #c11616; color: #FFF; border-color: #960000;');
            });
        }


        var neoFetchBtn = document.getElementById('fetch-neo-feed');
        neoFetchBtn.addEventListener('click', function(){
            // clear list
            var $neoLocation = document.getElementById('neo-list');
            $neoLocation.innerHTML = '';

            if (clipboard) {
                clipboard.destroy();
            }

            fetchNEOs();
        });
    };
}());
