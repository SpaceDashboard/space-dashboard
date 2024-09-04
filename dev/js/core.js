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

    var $iss1 = '<iframe class="iss-feed-1" id="iss-feed-1" width="560" height="315" src="https://www.youtube.com/embed/DfEr5XCFNWM?&autoplay=1" title="YouTube video player - ISS Live View" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    $('.iss-feed-1-wrapper').find('.col-content').empty().append($iss1);

    $('#iss-feed-1').load(function(){
        issFeed1UstreamObj = UstreamEmbed('iss-feed-1');

        if (autoPlayFeeds) {
            issFeed1UstreamObj.callMethod('play');
        }
    });
}

function loadIssFeed2(html5, autoplay) {
    nasaTVUstreamObj = null;

    if (issFeed2UstreamObj) {
        issFeed2UstreamObj = null;
    }

    var $iss2 = '<iframe class="iss-feed-2" id="iss-feed-2" src="https://www.youtube.com/embed/O9mYwRlucZY?&autoplay=1" title="YouTube video player - Live High-Definition Views from ISS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    $('.iss-feed-2-wrapper').find('.col-content').empty().append($iss2);

    $('#iss-feed-2').load(function(){
        issFeed2UstreamObj = UstreamEmbed('iss-feed-2');

        if (autoPlayFeeds) {
            issFeed2UstreamObj.callMethod('play');
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
                    var source = '<source src="https://api.spacedashboard.com/vid/current-corona.mp4?lastrefresh=' + seconds_since_epoch() + '" type="video/mp4">';
                    $(this).html(source);
                } else {
                    var elementSrcReference = $(this).attr('src').replace(/\?lastrefresh=.*/,'');
                    $(this).attr('src', ''); // clear src
                    $(this).attr('src', '' + elementSrcReference + '?lastrefresh=' + seconds_since_epoch() + ''); // new src using remembered src
                }
            }
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
    xhr.open('GET', 'https://api.spacedashboard.com/txt/3-day-forecast.txt');
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


// DEPRECATED
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

let resizeIssFrameTimeout;
function resizeIssTrackerFrame() {
    const issTrackerWrapper = document.querySelector('.iss-track-col-wrapper');
    const issTrackerFrame = document.querySelector('iframe.iss-tracker');
    const scaleForWidth = issTrackerWrapper.clientWidth / issTrackerFrame.clientWidth;
    const scaleForHeight = issTrackerWrapper.clientHeight / issTrackerFrame.clientHeight

    clearTimeout(resizeIssFrameTimeout);
    resizeIssFrameTimeout = setTimeout(() => {
        issTrackerFrame.style.transform = `scale(${scaleForWidth})`;

        if ((issTrackerFrame.clientHeight * scaleForWidth) - issTrackerWrapper.clientHeight >= 0) {
            issTrackerFrame.style.transform = `scale(${scaleForHeight})`;
        }
    }, 500);
}

$(function() {
    FastClick.attach(document.body);

    Swal.mixin({
        confirmButtonColor: '#222',
        padding: '0'
    });

    checkSiteMessages();
    fetchNEOs();
    fetchAuroraForecast();
    loadIssFeed1(autoPlayFeeds);
    loadIssFeed2(1, autoPlayFeeds);
    resizeIssTrackerFrame();

    $('.iss1-player-type').on('click', function(){
        var playerType = $(this).data('type');
        localStorage.iss1Type = playerType;
        loadIssFeed1(autoPlayFeeds);
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
            var source = '<source src="https://api.spacedashboard.com/vid/current-corona.mp4" type="video/mp4">';
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
        const formDataArray = $('#contact-form').serialize();
        const userName = formDataArray.find(obj => obj.name === 'name').value || new Date().toISOString();
        const userEmail = formDataArray.find(obj => obj.name === 'email').value || "";

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
                    try {
                        posthog.identify(userEmail !== "" ? userEmail : userName, {
                            name: userName,
                            email: userEmail
                        });
                    } catch (error) {
                        console.log(error);
                    }
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

    // Force reload aurora forecast image
    setTimeout(function() {
        $('#refresh-img-aurora-forecast').trigger('click');
    }, 1500);

    // Force reload solar activity
    setTimeout(function() {
        $('#refresh-solar-activity').trigger('click');
    }, 2000);
});

window.addEventListener('resize', function() {
    console.log('Window resized');
    if (window.outerWidth > 1024) {
        document.querySelector('.header-nav').classList.remove('visible');
        document.querySelector('.header-toggle .toggle-text').innerHTML = 'Menu';
    }
    resizeIssTrackerFrame()
});
