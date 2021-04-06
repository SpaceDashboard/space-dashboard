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

    // Solar system orbit plots - inner
    fetchFile('https://ssd.jpl.nasa.gov/images/orbit_plot_inner.png', '/img/orbit_plot_inner.png');

    // Solar system orbit plots - outer
    fetchFile('https://ssd.jpl.nasa.gov/images/orbit_plot_outer.png', '/img/orbit_plot_outer.png');

    // Solar system orbit plots - distant
    fetchFile('https://ssd.jpl.nasa.gov/images/orbit_plot_distant.png', '/img/orbit_plot_distant.png');
?>
