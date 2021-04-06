<?php
    set_time_limit(0);

    function fetchFile($url, $file_name_location) {
        if (file_exists($file_name_location)) { 
            unlink($file_name_location);
        }

        $file = fopen(dirname(__FILE__) . $file_name_location, 'w+');

        $curl = curl_init();

        // Update as of PHP 5.4 array() can be written []
        curl_setopt_array($curl, [
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_FILE           => $file,
            CURLOPT_TIMEOUT        => 60, // 60 second timeout
            CURLOPT_USERAGENT      => 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)'
        ]);

        $response = curl_exec($curl);

        if($response === false) {
            // Update as of PHP 5.3 use of Namespaces Exception() becomes \Exception()
            throw new \Exception('Curl error: ' . curl_error($curl));
        }

        $response;
    }

    // Aurora forecast - Northern Hemisphere
    fetchFile('https://services.swpc.noaa.gov/images/aurora-forecast-northern-hemisphere.jpg', '/img/aurora-forecast-northern-hemisphere.jpg');

    // Aurora forecast - Southern Hemisphere
    fetchFile('https://services.swpc.noaa.gov/images/aurora-forecast-southern-hemisphere.jpg', '/img/aurora-forecast-southern-hemisphere.jpg');

    // Aurora forecast - 3 day text
    fetchFile('https://services.swpc.noaa.gov/text/3-day-forecast.txt', '/txt/3-day-forecast.txt');

    // People In Space
    fetchFile('https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json', '/json/peopleinspace.json');

    // Three hour K index results
    fetchFile('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json', '/json/noaa-planetary-k-index.json');

    // Fetch current solar activity in img and 48 hour video format
    fetchFile('https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0193.jpg', '/img/current-corona.jpg');
    fetchFile('https://sdo.gsfc.nasa.gov/assets/img/latest/mpeg/latest_512_0193.mp4', '/vid/current-corona.mp4');
?>
