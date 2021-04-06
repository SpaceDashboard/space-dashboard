/* @flow */

/**
 * Space Dashboard site messages
 */


var siteMessageObj,
    webcastMessageObj;

function checkSiteMessages() {
    var messagesURL = './site-message.json?lastrefresh=' + seconds_since_epoch();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', messagesURL);
    xhr.onload = function (e) {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.response),
                hasSiteMessage = response.has_site_message,
                hasWebcastMessage = response.has_webcast_message;

            siteMessageObj = response.site_message;
            webcastMessageObj = response.webcast_message;

            var webcastStartTime = response.webcast_publish_time_start;
            var webcastEndTime = response.webcast_publish_time_end;
            var timeNowRoundedNearestMinute = moment().utc().startOf('minute').format('YYYY-MM-DD HH:mm');
            var showWebcast = true;

            // if there are times set for the range, set showWebcast to false
            // to conditionally set based on current time and the time ranges
            if ((webcastStartTime !== "") && (webcastEndTime !== "")) {
                showWebcast = false;
                // if current time UTC is in range, set to true otherwise make sure it's false
                if ((timeNowRoundedNearestMinute >= webcastStartTime) && (timeNowRoundedNearestMinute < webcastEndTime)) {
                    showWebcast = true;
                }
            }

            // instead of finding the embed code everytime for NASA TV,
            // just write it in and let the code take care of the heavy lifting
            if (webcastMessageObj.webcast_embed === "NASA_TV") {
                webcastMessageObj.webcast_embed = webcastMessageObj.NASA_TV;
            }

            // handle site message
            if (hasSiteMessage) {
                if ($('.site-alert.message').is(':hidden')) {
                    $('.site-alert.message').addClass('unread').show();
                    $('.header-toggle').addClass('unread alert');
                    $('.header-toggle .number').show();
                }

                // add error class if message is an error of sorts
                if (siteMessageObj.type.error) {
                    $('.site-alert.message').addClass('error');
                } else {
                    $('.site-alert.message').removeClass('error');
                }
            } else {
                $('.site-alert.message').hide().removeClass('unread error');

                if (!hasWebcastMessage) {
                    $('.header-toggle').removeClass('unread alert');
                    $('.header-toggle .number').hide();
                }
            }

            // handle whether or not there's a webcast
            if (hasWebcastMessage && showWebcast) {
                if ($('.site-alert.webcast').is(':hidden')) {
                    $('.site-alert.webcast').addClass('unread').show();
                    $('.header-toggle').addClass('unread alert');
                    $('.header-toggle .number').show();
                }
            } else {
                $('.site-alert.webcast').hide().removeClass('unread');

                if (!hasSiteMessage) {
                    $('.header-toggle').removeClass('unread alert');
                    $('.header-toggle .number').hide();
                }
            }
        }
    };
    xhr.onerror = function (e) {
        console.log("Error getting site message JSON.");
    };
    xhr.send();

    // abort request after 10 seconds
    setTimeout(function(){
        xhr.abort();
    }, 10000);
}


if (window.location.hostname === "localhost") { // dev variables - 30 seconds for local testing
    var messageInterval = 5000; // 5 seconds for local testing
} else { // Production variables
    var messageInterval = 1000 * 60; // 60,000 milliseconds, or 1 minute
}


// check for site messages every minute
window.setInterval(function(){
    checkSiteMessages();
}, messageInterval);


// $(document).on('keyup', function(e) {
//     if (e.keyCode === 27) {
//         $('.menu.visible').hide().removeClass('visible');
//         $('body.no-scroll').removeClass('no-scroll');
//     }
// });


$(function() {
    checkSiteMessages();
    $('#webcast-wrapper').empty();

    $(document).on('click', '.header-toggle.alert', function(e){
        $(this).removeClass('unread');
        $('.header-toggle').removeClass('unread');
    });

    $(document).on('click', '.site-alert.message', function(e){
        if ($(this).not('.webcast')) {
            $(this).removeClass('unread');
            Swal.fire({
                 title: siteMessageObj.title,
                 html: siteMessageObj.message,
                 confirmButtonColor: '#222',
                 padding: '0.5em'
            });
        }
    });

    $(document).on('click', '.site-alert.webcast', function(e){
        $(this).removeClass('unread');
        $('.header-toggle').removeClass('unread');
        Swal.fire({
            title: webcastMessageObj.title,
            html: webcastMessageObj.message,
            showCancelButton: true,
            confirmButtonText: "Watch now",
            confirmButtonColor: '#222',
            padding: '0.5em'
        }).then(function(result) {
            if (result.value) {
                var templateSource = $('#webcast-template').html();
                var template = Handlebars.compile(templateSource);
                var html = template(webcastMessageObj);
                $('#webcast-wrapper').empty().append(html);

                issFeed1UstreamObj.callMethod('pause');

                if (issFeed2UstreamObj) {
                    issFeed2UstreamObj.callMethod('pause');
                }

                if (nasaTVUstreamObj) {
                    nasaTVUstreamObj.callMethod('pause');
                }

                $('.webcast').show().addClass('visible');
                $('body').addClass('no-scroll');
            }
        });
    });

    $(document).on('click', '.close-webcast', function(e){
        $('#webcast-wrapper').empty();
        issFeed1UstreamObj.callMethod('play');

        if (issFeed2UstreamObj) {
            issFeed2UstreamObj.callMethod('play');
        }

        if (nasaTVUstreamObj) {
            nasaTVUstreamObj.callMethod('play');
        }
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode === 27 && $('#webcast-wrapper').html() !== '') {
            $('.menu.visible').hide().removeClass('visible');
            $('body.no-scroll').removeClass('no-scroll');
            $('#webcast-wrapper').empty();
            issFeed1UstreamObj.callMethod('play');

            if (issFeed2UstreamObj) {
                issFeed2UstreamObj.callMethod('play');
            }

            if (nasaTVUstreamObj) {
                nasaTVUstreamObj.callMethod('play');
            }
        }
    });
});
