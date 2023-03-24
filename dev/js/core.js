/**
 * Core JavaScript for Space Dashboard
 */
var autoReload = true;
var autoReloadDataDelay;
var threeHourKindexInterval;
var auroraInterval;
var autoPlayFeeds;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var rootDoc = document.documentElement;
var issFeed1UstreamObj;
var issFeed2UstreamObj;
var nasaTVUstreamObj;
var urlParams;

if (!localStorage.iss1Type) {
    localStorage.iss1Type = 'html5';
}

if (!localStorage.iss2Type) {
    localStorage.iss2Type = 'html5';
}

if (iOS) { rootDoc.className += ' ios'; }

if (window.location.hostname === "localhost") { // dev variables - 30 seconds for local testing
    autoReload = false;
    autoReloadDataDelay = 30000;
    threeHourKindexInterval = 30000;
    auroraInterval = 30000;
    autoPlayFeeds = false;
} else { // Production variables
    autoReloadDataDelay = 1000 * 600; // 600,000 milliseconds, or 10 minutes
    threeHourKindexInterval = 1000 * 1800; // 1,800,000 milliseconds, or 30 minutes
    auroraInterval = 1000 * 600; // 600,000 milliseconds, or 10 minutes
    autoPlayFeeds = true;
}


(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

function seconds_since_epoch() {
    return Math.floor( Date.now() / 1000 );
}

function loadIssFeed1(autoplay) {
    var playerFormat = 1; // default to html5; 0 is flash

    if (issFeed1UstreamObj) {
        issFeed1UstreamObj = null;
    }

    if (localStorage.iss1Type === 'html5') {
        playerFormat = 1;
    } else {
        playerFormat = 0;
    }

    $('.iss1-player-type').removeClass('active');
    $('.iss1-player-type[data-type="' + localStorage.iss1Type + '"]').addClass('active');

    var $iss1 = '<iframe class="iss-feed-1" id="iss-feed-1" width="560" height="315" src="https://www.youtube.com/embed/xAieE-QtOeM?&autoplay=1" title="YouTube video player - ISS Live View" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    // var $iss1 = '<iframe class="iss-feed-1" id="iss-feed-1" ' +
    // 'src="https://www.ustream.tv/embed/9408562?html5ui=' + playerFormat + '&autoplay=' + autoplay + '&volume=0&muted=1&wmode" ' +
    // 'scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen" frameborder="0"></iframe>';

    $('.iss-feed-1-wrapper').find('.col-content').empty().append($iss1);

    $('#iss-feed-1').load(function(){
        issFeed1UstreamObj = UstreamEmbed('iss-feed-1');

        if (autoPlayFeeds) {
            issFeed1UstreamObj.callMethod('play');
        }
    });

    // Trying to play videos on render for Chrome

    // var checkISSframe1 = setInterval(function(){
    //    if ($('#iss-feed-1').contents().find('*')!='undefined') {
    //         issFeed1UstreamObj = UstreamEmbed('iss-feed-1');

    //         if (autoPlayFeeds) {
    //             issFeed1UstreamObj.callMethod('play');
    //         }

    //         clearInterval(checkISSframe1);
    //     }
    // }, 200);
}

function loadIssFeed2(html5, autoplay) {
    nasaTVUstreamObj = null;

    if (issFeed2UstreamObj) {
        issFeed2UstreamObj = null;
    }

    var $iss2 = '<iframe class="iss-feed-2" id="iss-feed-2" src="https://www.youtube.com/embed/itdpuGHAcpg?&autoplay=1" title="YouTube video player - Live High-Definition Views from ISS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    // var $iss2 = '<iframe class="iss-feed-2" id="iss-feed-2" ' +
    // 'src="https://www.ustream.tv/embed/17074538?html5ui=' + html5 + '&autoplay=' + autoplay + '&volume=0&muted=1" ' +
    // 'scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen" frameborder="0"></iframe>';

    $('.iss-feed-2-wrapper').find('.col-content').empty().append($iss2);

    $('#iss-feed-2').load(function(){
        issFeed2UstreamObj = UstreamEmbed('iss-feed-2');

        if (autoPlayFeeds) {
            issFeed2UstreamObj.callMethod('play');
        }
    });

    // var checkISSframe2 = setInterval(function(){
    //    if ($('#iss-feed-2').contents().find('*')!='undefined') {
    //         issFeed2UstreamObj = UstreamEmbed('iss-feed-2');

    //         if (autoPlayFeeds) {
    //             issFeed2UstreamObj.callMethod('play');
    //         }

    //         clearInterval(checkISSframe2);
    //     }
    // }, 200);
}

function loadNASATV(html5, autoplay) {
    issFeed2UstreamObj = null;

    if (nasaTVUstreamObj) {
        nasaTVUstreamObj = null;
    }

    var $NASATV = '<iframe class="iss-feed-2" id="iss-feed-2" src="https://www.youtube.com/embed/21X5lGlDOfg?&autoplay=1" title="YouTube video player - NASA TV" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    // var $NASATV = '<iframe class="iss-feed-2" id="iss-feed-2" ' +
    // 'src="https://www.ustream.tv/embed/6540154?html5ui=' + html5 + '&autoplay=' + autoPlayFeeds + '&volume=50" ' +
    // 'scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" frameborder="0"></iframe>';

    $('.iss-feed-2-wrapper').find('.col-content').empty().append($NASATV);

    $('#iss-feed-2').load(function(){
        nasaTVUstreamObj = UstreamEmbed('iss-feed-2');

        if (autoPlayFeeds) {
            nasaTVUstreamObj.callMethod('play');
        }
    });
}

function fetchNewData(targetClass, Callbacks) {
    var element = $('.' + targetClass);

    $.each(element, function(){
        if (!$(this).is(':hidden')) {
            var tagEl = $(this)[0].tagName;
            if ($(this)) {
                if (tagEl === 'VIDEO') {
                    $(this).find('source').remove();
                    var source = '<source src="./api/vid/current-corona.mp4?lastrefresh=' + seconds_since_epoch() + '" type="video/mp4">';
                    $(this).html(source);
                } else {
                    var elementSrcReference = $(this).attr('src').replace(/\?lastrefresh=.*/,'');
                    $(this).attr('src', ''); // clear src
                    $(this).attr('src', '' + elementSrcReference + '?lastrefresh=' + seconds_since_epoch() + ''); // new src using remembered src
                }
            }

            // var elementSrcReference = $(this).attr('src').replace(/\?lastrefresh=.*/,''),
            //     self = $(this);

            // var xhr = new XMLHttpRequest();
            // xhr.open('GET', elementSrcReference);
            // xhr.onload = function (e) {
            //     if (xhr.status === 200) {
            //         $(this).attr('src', ''); // clear src
            //         self.attr('src', '' + xhr.responseURL + '?lastrefresh=' + seconds_since_epoch() + ''); // new src using remembered src
            //     }
            // };
            // xhr.onerror = function (e) {
            //     self.parent().parent().find('.refresh-overlay').removeClass('visible');
            //     Swal.fire({
            //         title: "Oops",
            //         text: "Something went wrong, try again in a minute.",
            //         timer: 5000,
            //         type: 'error',
            //         confirmButtonColor: '#222',
            //         padding: '0.5em'
            //     });
            // };
            // xhr.send();

            // // abort request after 20 seconds
            // setTimeout(function(){
            //     xhr.abort();
            //     self.parent().parent().find('.refresh-overlay').removeClass('visible');
            // }, 20000);
        }

        if (Callbacks) {
            if (tagEl === 'VIDEO') {
                Callbacks();
            } else {
                $(this).load(function() {
                    Callbacks();
                });
            }
        }
    });
}


function fetchAuroraForecast(Callbacks) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/txt/3-day-forecast.txt');
    xhr.onload = function (e) {
        if (xhr.status === 200) {
            try {
                var response = xhr.response;
                document.getElementById('text-aurora-forecast').innerHTML = response;
                if (Callbacks) { Callbacks(); }
            } catch (error) {
                console.log(error);
                document.getElementById('neo-list').innerHTML = '<div class="error-text-fetching-data">Error retrieving near-Earth objects</div>';
            }
        }
    };
    xhr.onerror = function (e) {
        document.getElementById('text-aurora-forecast').innerHTML = '<div class="error-text-fetching-data">Error retrieving aurora forecast</div>';
        if (Callbacks) { Callbacks(); }
    };
    xhr.send();
}


function fetchPeopleInSpace() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/json/peopleinspace.json');
    xhr.onload = function (e) {
        if (xhr.status === 200) {
            try {
                var response = JSON.parse(xhr.response);
                renderPeopleInSpace(response);
            } catch (error) {
                console.log(error);
                document.getElementById('people-in-space').innerHTML = '<div class="error-text-fetching-data">Error retrieving people in space</div>';
            }
        } else {
            console.log('peopleinspace.json: ' + xhr.status);
            document.getElementById('people-in-space').innerHTML = '<div class="error-text-fetching-data">Error retrieving people in space</div>';
        }
    };
    xhr.onerror = function (e) {
        document.getElementById('people-in-space').innerHTML = '<div class="error-text-fetching-data">Error retrieving people in space</div>';
    };
    xhr.send();
}


function renderPeopleInSpace(people) {
    var peopleInSpace = '';
    var astronautsArray = [];
    var templateSource;
    var template;
    var html;

    _.each(people, function(val, key) {
        if (key === "number") {
            astronautsArray.number = val;
        }

        if (key === "people") {
            _.each(people.people, function(obj) {
                const countryName = (obj.country !== '') ? obj.country : obj.countryflag.slice(58, -4);
                const firstLetterCountry = countryName.charAt(0);
                const firstLetterCountryUpperCase = firstLetterCountry.toUpperCase();
                const remainingCountryName = countryName.slice(1);
                const capitalizedCountryName = firstLetterCountryUpperCase + remainingCountryName;
                astronautsArray.push({
                    name: obj.name,
                    title: obj.title,
                    country: (countryName === 'usa') ? 'USA' : capitalizedCountryName,
                    flag: countryName,
                    bio: obj.bio
                });
            });
        }
    });

    templateSource = $('#people-in-space-astronaut-template').html();
    template = Handlebars.compile(templateSource);
    html = template(astronautsArray);
    $('#people-in-space').empty().append(html);
}


function checkPlayerType() {
    if (localStorage.iss1Type) {
        if (localStorage.iss1Type === 'html5') {
            $('.iss1-player-type[data-type="html5"]').addClass('active');
        } else {
            $('.iss1-player-type[data-type="flash"]').addClass('active');
        }
    }
}


function autoReloadData() {
    window.setInterval(function(){
        $('.refresh-k-index').trigger('click');
    }, threeHourKindexInterval);

    window.setInterval(function(){
        fetchCurrentKindex();
    }, 60000); // 1 minute

    // cool to call after 10 minutes, then it won't happen for another 10 minutes
    $('#refresh-img-aurora-forecast').trigger('click');

    window.setInterval(function(){
        if (!$('#refresh-img-aurora-forecast').is(':hidden')) {
            $('#refresh-img-aurora-forecast').trigger('click');
        }

        if (!$('#refresh-text-aurora-forecast').is(':hidden')) {
            $('#refresh-text-aurora-forecast').trigger('click');
        }
    }, auroraInterval);
}


if (autoReload) {
    window.setTimeout(function() {
        autoReloadData();
    }, autoReloadDataDelay);
}


$(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
        $('.menu.visible').removeClass('visible');
        $('body.no-scroll').removeClass('no-scroll');
    }
});


$(function() {
    FastClick.attach(document.body);

    Swal.mixin({
        confirmButtonColor: '#222',
        padding: '0'
    });

    checkSiteMessages();

    fetchNEOs();
    fetchPeopleInSpace();
    fetchAuroraForecast();

    loadIssFeed1(autoPlayFeeds);

    if (window.INIT_FEED_2 === "ISS") {
        loadIssFeed2(1, autoPlayFeeds);
        $('.toggle-iss-feed-2[data-video-feed="nasa-tv"]').show();
    }

    if (window.INIT_FEED_2 === "NASA") {
        loadNASATV(1, autoPlayFeeds);
        $('.toggle-iss-feed-2[data-video-feed="iss-feed-2"]').show();
    }

    $('.iss1-player-type').on('click', function(){
        var playerType = $(this).data('type');
        localStorage.iss1Type = playerType;
        loadIssFeed1(autoPlayFeeds);
    });

    // toggle ISS feed 1 pane
    // $('.toggle-iss-feed-1').on('click', function(){
    //     var videoFeed = $(this).data('video-feed');

    //     if (videoFeed === "nasa-tv") {
    //         // NASA TV channel - 6540154
    //         issFeed1UstreamObj.callMethod('load', 'channel', 6540154);
    //         issFeed1UstreamObj.callMethod('volume', 50);
    //     } else {
    //         // ISS Live Stream - 9408562
    //         issFeed1UstreamObj.callMethod('load', 'channel', 9408562);
    //         issFeed1UstreamObj.callMethod('volume', 0);
    //     }

    //     $('.toggle-iss-feed-1[data-video-feed]').show();
    //     $('.toggle-iss-feed-1[data-video-feed="' + videoFeed + '"]').hide();
    // });


    // toggle ISS feed 2 pane
    $('.toggle-iss-feed-2').on('click', function(){
        var videoFeed = $(this).data('video-feed');

        if (videoFeed === "nasa-tv") {
            loadNASATV(1, autoPlayFeeds);
        } else {
            loadIssFeed2(1, autoPlayFeeds);
        }

        $('.toggle-iss-feed-2[data-video-feed]').show();
        $('.toggle-iss-feed-2[data-video-feed="' + videoFeed + '"]').hide();
    });


    // refresh button for images
    $('.refresh-btn').on('click', function(e){
        var self = $(this),
            targetClass = $(this).attr('id').substr(8);

        self.parent().parent().find('.refresh-overlay').addClass('visible');
        setTimeout(function(){
            fetchNewData(targetClass, function(){
                setTimeout(function(){
                    self.parent().parent().find('.refresh-overlay').removeClass('visible');
                }, 500);
            });
        }, 300);
    });


    // refresh button for aurora forecast
    $('.refresh-aurora-forecast').on('click', function(e){
        var self = $(this);

        self.parent().parent().find('.refresh-overlay').addClass('visible');
        setTimeout(function(){
            fetchAuroraForecast(function(){
                setTimeout(function(){
                    self.parent().parent().find('.refresh-overlay').removeClass('visible');
                }, 500);
            });
        }, 300);
    });


    // toggle solar system orbit images
    $('.toggle-aurora-forecast').on('click', function(){
        var auroraForecast = $(this).data('aurora-forecast');

        $('.grid-col[data-aurora-forecast]').hide();
        $('.grid-col[data-aurora-forecast="' + auroraForecast + '"]').show();
    });


    // toggle solar system orbit images
    $('.toggle-solar-visual').on('click', function(){
        var solarActivity = $(this).data('solar-activity');
        $('.toggle-solar-visual').removeClass('active');
        $(this).addClass('active');

        $('.solar-activity').hide();
        $('.solar-activity[data-solar-activity="' + solarActivity + '"]').show();

        if (solarActivity === 'video' && $('.solar-activity[data-solar-activity="video"] source').length === 0) {
            var source = '<source src="./api/vid/current-corona.mp4" type="video/mp4">';
            $('.solar-activity[data-solar-activity="video"]').html(source);
        }
    });


    // toggle hemisphere specific aurora forecast iamges
    $('.toggle-hemisphere').on('click', function(){
        var hemisphereForecast = $(this).data('hemisphere');

        $('.img-aurora-forecast').hide();
        $('.img-aurora-forecast[data-hemisphere="' + hemisphereForecast + '"]').show();

        $('.toggle-hemisphere').show();
        $('.toggle-hemisphere[data-hemisphere="' + hemisphereForecast + '"]').hide();
    });


    // astronaut bio expand/collapse
    $(document).on('click', '.collapsing-data', function(e){
        $(this).find('.data-details').stop().slideToggle(150);
    });


    // show site info overlay
    $('.site-info-menu').on('click', function(e){
        $('.menu.site-info').show().addClass('visible');
        $('body').addClass('no-scroll');
    });

    $(document).on('click', '.close-menu.full-screen', function(e){
        $('body').removeClass('no-scroll');
    });

    // toggle menu overlay for each section
    $('.toggle-menu').on('click', function(e){
        var $menu = $(this).parent().parent();
        $menu.find('.menu').show(0, function(){
            $(this).addClass('visible');
        });

        // if ($(this).hasClass('player-settings')) {
        //     checkPlayerType();
        // }
    });

    // toggle player type for live feeds
    $('.btn[class$="player-type"]').on('click', function(e){
        var $player = $(this).data('player');
        // TODO: move players into a function that is called when checking localStorage for player type, then insert and load player
    });

    $(document).on('click', '.close-menu', function(e){
        $(this).parent().removeClass('visible').hide();
    });

    $('input[type="text"], textarea').on('keyup input keydown', function(e){
        if ($(this).val() === "") {
            $(this).removeClass('not-empty');
        } else {
            $(this).addClass('not-empty');
        }
    });

    $('#submit-contact-form').on('click', function(){
        $('#contact-form .text-error').text("").hide();

        $.ajax({
            type: 'POST',
            url: '/contact.php',
            data: $('#contact-form').serialize(),
            success: function (data, xhr) {
                if (xhr === "success" && data === "Sentient check failed") {
                    $('#contact-form .text-error').text("Human check failed, please uncheck the checkbox.").show();
                } else if (xhr === "success" && data === "Email is required") {
                    $('#contact-form .text-error').text("Sorry, an email is required.").show();
                } else if (xhr === "success" && data === "") {
                    Swal.fire({
                        title: "Sent!",
                        text: "Thanks for writing!",
                        timer: 2000,
                        icon: 'success',
                        showConfirmButton: false,
                        confirmButtonColor: '#222',
                        padding: '0.5em'
                    });
                    $('#reset-contact-form').trigger('click');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Server error');
            }
        });
    });

    $('#reset-contact-form').on('click', function(){
        $('#contact-form').find('input[type="text"]').val("");
        $('#contact-form').find('textarea').val("");
        $('#contact-form').find('input[type="checkbox"]').prop('checked', true);
        $('input[type="text"], textarea').trigger('keyup');
        $('#contact-form .text-error').text("").hide();
    });

    // handle responsive header toggle
    $('.header-toggle').on('click', function() {
        $('.header-nav').toggleClass('visible');
        if ($('.header-nav').hasClass('visible')) {
            $('.header-toggle .toggle-text').empty().append('Close');
        } else {
            $('.header-toggle .toggle-text').empty().append('Menu');
        }
    });

    $(window).resize(function() {
        if (window.outerWidth > 1024) {
            $('.header-nav').removeClass('visible');
            $('.header-toggle .toggle-text').empty().append('Menu');
        }
    });

    // Force reload aurora forecast image
    setTimeout(function() {
        $('#refresh-img-aurora-forecast').trigger('click');
    }, 1500);

    // Force reload solar activity
    setTimeout(function() {
        $('#refresh-solar-activity').trigger('click');
    }, 2000);
});
