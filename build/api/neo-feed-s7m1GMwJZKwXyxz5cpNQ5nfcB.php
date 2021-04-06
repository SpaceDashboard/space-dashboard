<?php
    $file_name_location = '/json/neo-feed.json';

    if (file_exists($file_name_location)) { 
        unlink($file_name_location);
    }

    function file_get_contents_curl($url) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);

        $data = curl_exec($ch);
        $error_info = curl_error($ch)."<br>".curl_getinfo($ch);
        curl_close($ch);

        return $data;
    }

    date_default_timezone_set('UTC');

    $today = date('Y-m-d');
    $date_as_string = strtotime($date);
    $future_as_string = strtotime('+7 day');
    $future = date('Y-m-d', $future_as_string);

    // echo "Today: ".$today." and future date: ".$future;

    $url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='.$today.'&end_date='.$future;
    $json = file_get_contents_curl($url.'&api_key=AR8IbQHg2MkfgTOyLGUeaR7wxSlwRfpjokUF4RjE');

    if (!$json) {
        echo "Request failed";
    } else {
        //open or create the file
        $handle = fopen(dirname(__FILE__).$file_name_location,'w+');

        //write the data into the file
        fwrite($handle,$json);

        //close the file
        fclose($handle);
    }
?>
