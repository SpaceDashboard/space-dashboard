var siteStatusInterval = 1000 * 180; // 180,000 milliseconds, or 3 minutes
var statusMessage;
var downSites;

var monitorNames = [
  'Space Dashboard',
  'ISS Tracker',
  'JPL Solar System Dynamics',
  'NASA NEO API',
  'People in Space',
  'SWPC NOAA - Services',
  'Deep Space Network',
];

const fetchSiteAssetStatuses = () => {
  return new Promise(function (resolve, reject) {
    var requestOptions = {
      method: 'GET',
    };

    fetch(
      'https://status.spacedashboard.com/json/status-monitors.json',
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        monitorNames.forEach((name, index) => {
          if (result.data[index].status === 'down') {
            downSites++;
          }
        });
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

function checkSiteAssetStatuses() {
  downSites = 0;

  try {
    // fetch statuses and you'll end up with a number
    Promise.all([fetchSiteAssetStatuses()])
      .then(function () {
        if (downSites > 0) {
          if (downSites > 1) {
            statusMessage =
              "I'm sorry for the inconvenience, but multiple sites providing data for Space Dashboard are down.";
          } else {
            statusMessage =
              "I'm sorry for the inconvenience, but a site providing data for Space Dashboard is down.";
          }

          if ($('.site-alert.site-monitor').is(':hidden')) {
            $('.site-alert.site-monitor').addClass('unread').show();
          }

          $('.site-alert.site-monitor .number').empty().append(downSites);
          $('.site-alert.site-monitor').show();
        } else {
          $('.site-alert.site-monitor').hide();
        }
      })
      .catch(function () {
        console.log('Something went wrong with the promises');
      });
  } catch (error) {
    console.log(error);
  }
}

// check for site messages every minute
window.setInterval(function () {
  checkSiteAssetStatuses();
}, siteStatusInterval);

$(function () {
  checkSiteAssetStatuses();

  $('.site-alert.site-monitor').on('click', function () {
    $(this).removeClass('unread');
    Swal.fire({
      title: 'Site Data',
      text: statusMessage,
      showCancelButton: true,
      confirmButtonText: 'Status Page',
      confirmButtonColor: '#222',
      padding: '0.5em',
    }).then(function (result) {
      if (result.value) {
        window.open('http://status.spacedashboard.com');
      }
    });
  });
});
