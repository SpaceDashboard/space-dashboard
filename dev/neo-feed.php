<?php
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

    $config = parse_ini_file('vars-config.ini', true);
    $api_key = $config['NASA_API_KEY'];

    if (empty($_POST['neoURL'])) {
        $json = file_get_contents_curl('https://api.nasa.gov/neo/rest/v1/feed/today?&api_key='.$api_key);
    } else {
        $neoURL = $_POST['neoURL'];
        $json = file_get_contents_curl($neoURL.'&api_key='.$api_key);
    }

    // $neosJSON = json_decode($json);

    if (!$json) {
        echo "Request failed";
    } else {
        /*
        // grab near_earth_objects and iterate through,
        // clearing links that had the API key
        $neoClean = $neosJSON->near_earth_objects;
        foreach ($neoClean as $neo) {
            foreach ($neo as $obj) {
                $obj->links->self = "";
            }
        }

        // encode the JSON again so we can send it back
        $neos = json_encode($neoClean);
        echo $neos;
        */
        echo $json;
    }
?>
