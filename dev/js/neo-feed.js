/* @flow */

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

function fetchNEOs() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/json/neo-feed.json');
    xhr.onload = function (e) {
        if (xhr.status === 200) {
            if (xhr.response === "Request failed") {
                console.log("Something went wrong.");
            } else {
                try {
                    var response = xhr.response;
                    var cleanResponse = JSON.parse(response.substring(response.indexOf("{")));
                    var neoObj = cleanResponse.near_earth_objects;
                    cleanNEOs(neoObj);
                } catch (error) {
                    console.log(error);
                    document.getElementById('neo-list').innerHTML = '<div class="error-text-fetching-data">Error retrieving near-Earth objects</div>';
                }
            }
        } else {
            console.log('neo-feed.php: ' + xhr.status);
            document.getElementById('neo-list').innerHTML = '<div class="error-text-fetching-data">Error retrieving near-Earth objects</div>';
        }
    };
    xhr.onerror = function (e) {
        document.getElementById('neo-list').innerHTML = '<div class="error-text-fetching-data">Error retrieving near-Earth objects</div>';
    };
    xhr.send();
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
        finalNeoInfo = '',
        neoObj;

    for (var key in sortedNEOs) {
        var neoDate = moment(key).format('D MMMM YYYY'),
            neoInfo = '',
            neoNumber = 0;

        sortedNEOsByDistance = _.sortBy(neoArray[key], 'distance');

        for (neoObj = 0; neoObj < sortedNEOsByDistance.length; neoObj++) {
            var neoName = neoArray[key][neoObj].name;
            var neoDistance = neoArray[key][neoObj].distance;
            neoInfo += '<div class="neo-list-item">' +
                            '<span class="neo-distance">' + neoDistance + ' LD - </span>' +
                            '<span class="neo-name">' + neoName + '</span>' +
                        '</div>';
            neoNumber++;
        }

        if (neoInfo === "") {
            neoInfo = '<p style="margin: 0;">No close approaches for this day</p>';
            neoNumber = 0;
        }

        finalNeoInfo += '<div class="collapsing-data">' +
                            '<span class="neo-date">' + neoDate + '<span class="additional-info">' + neoNumber + ' objects</span></span>' +
                            '<div class="data-details">' +
                                neoInfo +
                            '</div>' +
                        '</div>';
    }

    var neoInfoWithHeader = '<h2>Near Earth Objects <small>(in lunar distance)</small></h2>' + finalNeoInfo;
    $neoLocation.insertAdjacentHTML('beforeend', neoInfoWithHeader);
}
