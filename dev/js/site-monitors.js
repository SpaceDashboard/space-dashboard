var siteStatusInterval = 1000 * 180; // 180,000 milliseconds, or 3 minutes
var statusMessage;
var downSites;

// Statuses:
// 0 - paused
// 1 - not checked yet
// 2 - up
// 8 - seems down
// 9 - down

// api keys for specific monitors
var ISSTracker_API       = "m778933372-05bb2c7333c04e4bd08b3959";
var DeepSpaceNetwork_API = "m778933374-e84a4fc81ff05ede5f44ebf6";
var JPLSSD_API           = "m778933363-ef6a1b05460d6e408d7dbcdd";
var PeopleInSpace_API    = "m778933376-b99856aef43a6fa669ec85c7";
var SWPCNOAA_API         = "m778933361-831c7def01778ea74ac34f95";
var NEO_API              = "m780201323-c0bcadf010be087dc8690384";
// var TEST_MONITOR         = "m779074434-17ba4a8c94cfe5b04e03f0f4";

function fetchSiteAssetStatuses(apiKey) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.uptimerobot.com/v2/getMonitors', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function (e) {
            if (xhr.status === 200) {
                if (xhr.response === "Request failed") {
                    console.log("Something went wrong.");
                } else {
                    try {
                        var siteMonitors = JSON.parse(xhr.response);
                        if (siteMonitors.monitors[0].status === 8 || siteMonitors.monitors[0].status === 9) {
                            downSites++;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            resolve();
        };
        xhr.onerror = function (e) {
            console.log("Error retrieving monitor");
            resolve();
        };
        xhr.send('api_key=' + apiKey + '&format=json&logs=1');
    });
}

function checkSiteAssetStatuses() {
    downSites = 0;

    try {
        // fetch statuses and you'll end up with a number
        Promise.all([
            fetchSiteAssetStatuses(ISSTracker_API),
            fetchSiteAssetStatuses(DeepSpaceNetwork_API),
            fetchSiteAssetStatuses(JPLSSD_API),
            fetchSiteAssetStatuses(PeopleInSpace_API),
            fetchSiteAssetStatuses(SWPCNOAA_API),
            fetchSiteAssetStatuses(NEO_API)
        ]).then(function() {
            if (downSites > 0) {
                if (downSites > 1) {
                    statusMessage = "I'm sorry for the inconvenience, but multiple sites providing data for Space Dashboard are down.";
                } else {
                    statusMessage = "I'm sorry for the inconvenience, but a site providing data for Space Dashboard is down.";
                }

                if ($('.site-alert.site-monitor').is(':hidden')) {
                    $('.site-alert.site-monitor').addClass('unread').show();
                }

                $('.site-alert.site-monitor .number').empty().append(downSites);
                $('.site-alert.site-monitor').show();
            } else {
                $('.site-alert.site-monitor').hide();
            }
        }).catch(function() {
            console.log("Something went wrong with the promises");
        });
    } catch (error) {
        console.log(error);
    }
}

// check for site messages every minute
window.setInterval(function(){
    checkSiteAssetStatuses();
}, siteStatusInterval);

$(function() {
    checkSiteAssetStatuses();

    $('.site-alert.site-monitor').on('click', function(){
        $(this).removeClass('unread');
        Swal.fire({
            title: "Site Data",
            text: statusMessage,
            showCancelButton: true,
            confirmButtonText: "Status Page",
            confirmButtonColor: '#222',
            padding: '0.5em'
        }).then(function(result) {
            if (result.value) {
                window.open("https://status.spacedashboard.com/");
            }
        });
    });
});
