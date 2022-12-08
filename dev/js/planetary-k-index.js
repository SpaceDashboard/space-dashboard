/* @flow */

/**
 * Planetary K index for Space Dashboard
 */


function fetchCurrentKindex() {
    // show spinner
    $('.current-k-index i').show();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/json/planetary-k-index-dst.json');
    xhr.onload = function (e) {
        if (xhr.status === 200) {
            try {
                var response = JSON.parse(xhr.response);
                var latestKindex = response[response.length - 1];
                var utcTime = moment(latestKindex['time_tag']).format('HH:mm');
                var localTime = moment(moment.tz(latestKindex['time_tag'], "UTC")).tz(moment.tz.guess()).format('HH:mm');
                var localTimezone = moment.tz(moment.tz.guess()).zoneAbbr();

                var stormByIndex = {
                    0: "G0",
                    1: "G0",
                    2: "G0",
                    3: "G0",
                    4: "G0",
                    5: "G1",
                    6: "G2",
                    7: "G3",
                    8: "G4",
                    9: "G5"
                };

                var colorByStorm = {
                    "G0": "#92D050",
                    "G1": "#F6EB14",
                    "G2": "#FFC800",
                    "G3": "#FF9600",
                    "G4": "#FF0000",
                    "G5": "#C80000"
                };

                if (!latestKindex) {
                    $('.k-index-value').empty().append('-.--'); // display nothing
                    $('.kindex-local-timestamp').empty().append('--:-- ' + localTimezone);
                    $('.kindex-utc-timestamp').empty().append('--:-- UTC');
                    $('.geo-storm').empty().hide().css('color', '#92D050');
                    $('.current-k-index i').hide();
                    return;
                }

                var storm = stormByIndex[Math.floor(latestKindex['estimated_kp'])];
                var stormColor = colorByStorm[storm];

                $('.geo-storm').empty().hide().css('color', stormColor);

                // populate kp index and geo storm value if applicable
                $('.k-index-value').empty().append(latestKindex['estimated_kp'].toFixed(2));
                $('.kindex-local-timestamp').empty().append(localTime + ' ' + localTimezone);
                $('.kindex-utc-timestamp').empty().append(utcTime + ' UTC');
                if (storm !== "G0") { $('.geo-storm').append(storm).show(); }

                // hide spinner
                $('.current-k-index i').hide();
            } catch (error) {
                console.log(error);
                $('.k-index-value').empty().append('-.--'); // display nothing
                $('.kindex-local-timestamp').empty().append('--:-- ' + localTimezone);
                $('.kindex-utc-timestamp').empty().append('--:-- UTC');
                $('.geo-storm').empty().hide().css('color', '#92D050');
                $('.current-k-index i').hide();
            }
        } else {
            console.log('planetary-k-index-dst.json: ' + xhr.status);
            $('.k-index-value').empty().append('-.--'); // display nothing
            $('.geo-storm').empty().hide().css('color', '#92D050');
            $('.current-k-index i').hide();
        }
    };
    xhr.onerror = function (e) {
        console.log("Error");
    };
    xhr.send();
}


function fetchThreeHourKindex(updateChart, Callbacks) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/json/noaa-planetary-k-index.json');
    xhr.onload = function (e) {
        if (xhr.status === 200) {
            try {
                if (document.querySelector('.historical-k-index-error')) {
                    document.querySelector('.historical-k-index-error').remove();
                }
                var response = JSON.parse(xhr.response);

                var kIndexData = {
                    kIndexArray: [],
                    kIndexColorArray: [],
                    kIndexLabelArray: [],
                    kIndexTooltipLabelArray: [],
                    kIndexTooltipDateArray: []
                };

                var green = '#1DFF00';
                var yellow = '#FFDD00';
                var red = '#FF381F';

                var colorByIndex = {
                    0: green,
                    1: green,
                    2: green,
                    3: green,
                    4: yellow,
                    5: red,
                    6: red,
                    7: red,
                    8: red,
                    9: red
                };

                _.each(response, function(val, key) {
                    if (val[0] !== "time_tag") {
                        kIndexData.kIndexArray.push(val[1]);
                        kIndexData.kIndexColorArray.push(colorByIndex[Math.floor(val[1])]);

                        var time = val[0].substr(-12, 5);
                        kIndexData.kIndexLabelArray.push(time);

                        var timeStart = val[0];
                        var timeEnd = moment(val[0]).add(3, 'hours').format('HH:mm');

                        timeStart = timeStart.substr(-12, 5);
                        timeEnd = timeEnd.substr(-12, 5);

                        var timeRange = timeStart + ' - ' + timeEnd;

                        kIndexData.kIndexTooltipLabelArray.push(timeRange);

                        var date = moment(val[0]).format("D MMM YYYY");

                        kIndexData.kIndexTooltipDateArray.push(date);
                    }
                });

                kIndexData.kIndexArray = kIndexData.kIndexArray.slice(-18);
                kIndexData.kIndexColorArray = kIndexData.kIndexColorArray.slice(-18);
                kIndexData.kIndexLabelArray = kIndexData.kIndexLabelArray.slice(-18);
                kIndexData.kIndexTooltipLabelArray = kIndexData.kIndexTooltipLabelArray.slice(-18);
                kIndexData.kIndexTooltipDateArray = kIndexData.kIndexTooltipDateArray.slice(-18);

                renderThreeHourKindex(kIndexData, updateChart);

                if (Callbacks) { Callbacks(); }
            } catch (error) {
                console.log(error);
                document.querySelector('.k-index-wrapper').innerHTML = '<div class="historical-k-index-error error-text-fetching-data">Error retrieving historical planetary K index</div>';
                if (Callbacks) { Callbacks(); }
            }
        } else {
            console.log('noaa-planetary-k-index.json: ' + xhr.status);
            document.querySelector('.k-index-wrapper').innerHTML = '<div class="historical-k-index-error error-text-fetching-data">Error retrieving historical planetary K index</div>';
            if (Callbacks) { Callbacks(); }
        }
    };
    xhr.onerror = function (e) {
        document.querySelector('.k-index-wrapper').innerHTML = '<div class="historical-k-index-error error-text-fetching-data">Error retrieving historical planetary K index</div>';
        if (Callbacks) { Callbacks(); }
    };
    xhr.send();
}

function renderThreeHourKindex(indexData, updateChart) {
    // clear section wrapper and render new canvas tag to help with extra iframes issue
    $('.k-index-wrapper').empty().append('<canvas id="planetary-k-index"></canvas>');

    var kIndexChart = $('#planetary-k-index');

    window.planetarykIndexChart = new Chart(kIndexChart, {
        type: 'bar',
        backgroundColor: '#222',
        data: {
            labels: indexData.kIndexLabelArray,
            datasets: [{
                label: 'Planetary K Index',
                data: indexData.kIndexArray,
                backgroundColor: indexData.kIndexColorArray,
                borderColor: indexData.kIndexColorArray,
                borderWidth: 1,
                tooltipLabels: indexData.kIndexTooltipLabelArray,
                tooltipDates: indexData.kIndexTooltipDateArray
            }]
        },
        options: {
            animation: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: '#333',
                    },
                    ticks: {
                        fontColor: '#CCC'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: '#333',
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#CCC',
                        max: 9,
                        stepSize: 1
                    }
                }]
            },
            title: {
                display: true,
                fontColor: '#CCC',
                text: "Planetary K Index (3 hour data - UTC)"
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleFontColor: '#111',
                bodyFontColor: '#111',
                xPadding: 10,
                yPadding: 10,
                callbacks: {
                    title: function (tooltipItem, data) {
                        return "K Index: " + tooltipItem[0].yLabel;
                    },
                    label: function (tooltipItem, data) {
                        var label = data.datasets[0].tooltipLabels[tooltipItem.index] +
                                    ", \n" +
                                    data.datasets[0].tooltipDates[tooltipItem.index];
                        return label;
                    }
                }
            },
            maintainAspectRatio: false
        },
    });

    // kIndexChart.style.backgroundColor = '#333';
}


$(function() {

    window.planetarykIndexChart = '';

    fetchThreeHourKindex(false, null);

    fetchCurrentKindex();

    $(window).resize(function() {
        if (window.planetarykIndexChart !== '') {
            window.planetarykIndexChart.resize();
        }
    });

    $('.refresh-k-index').on('click', function(e){
        var self = $(this);

        self.parent().parent().find('.refresh-overlay').addClass('visible');
        setTimeout(function(){
            fetchCurrentKindex();
            fetchThreeHourKindex(true, function(){
                self.parent().parent().find('.refresh-overlay').removeClass('visible');
            });
        }, 300);
    });

    // $(window).resize(_.debounce(function(){
    //     console.log("Resized");
    // }, 300));

});
