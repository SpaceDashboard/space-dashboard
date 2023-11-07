<?php
    $lunarDistance = 389.5776885259;

    function file_get_contents_curl($url) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }

    function emailMe() {
        $to = "caleb.dudley@gmail.com";
        $from = "caleb@spacedashboard.com";
        $subject = "No NEOs today";
        $message = "Just wanted to let you know there are 0 NEOs today, so there will not be a tweet today. \n\n\nThank you,\nAutoCaleb";

        $headers = "From:" . $from;

        mail($to, $subject, $message, $headers);
    }

    // $config = parse_ini_file('vars-config.ini', true);
    // $api_key = $config['NASA_API_KEY'];

    // $json = file_get_contents_curl('https://api.nasa.gov/neo/rest/v1/feed/today?&api_key='.$api_key);

    date_default_timezone_set('America/New_York');

    $today = date("Y-m-d");
    $tomorrow = date("Y-m-d", strtotime("+1 days"));
    $json = file_get_contents_curl('https://ssd-api.jpl.nasa.gov/cad.api?dist-max=100LD&date-min=' . $today . '&date-max=' . $tomorrow . '&sort=dist');
    // $json = file_get_contents_curl('https://ssd-api.jpl.nasa.gov/cad.api?dist-max=100LD&date-min=2017-03-28&date-max=2017-03-29&sort=dist');

    $neosJSON = json_decode($json);

    $neoTweet1 = "";
    $neoTweet2 = "";
    $neoTweet3 = "";

    $tempTweetStr = "";

    $secondTweet = false;
    $thirdTweet = false;
    $noMoreTweeting = false;

    if ($neosJSON->count > 0) {
        if (isset($neosJSON->error) || !$neosJSON) {
            die("Request failed");
        } else {
            // grab near_earth_objects and iterate through,
            // clearing links that had the API key
            $neoClean = $neosJSON->data;
            $neoArray = array();
            $count = 0;

            foreach ($neoClean as $neo) {
                $neoName = $neo[0];
                $neoDistanceAU = $neo[4];
                $neoDistanceClean = round(($neoDistanceAU * $lunarDistance), 2);

                $prefix = '(';
                if (substr($neoName, 0, strlen($prefix)) == $prefix) {
                    $neoName = substr($neoName, strlen($prefix));
                    $neoName = substr($neoName, 0, -1);
                }

                if ($neoDistanceClean < 100) {
                    $neoArray[$count++] = array('name' => $neoName, 'distance' => $neoDistanceClean);
                }
                // foreach ($neo as $obj) {
                    // $obj->links->self = "";

                    // $neoName = $obj->name;
                    // $neoDistance = $obj->close_approach_data[0]->miss_distance->lunar;
                    // $neoDistanceClean = round($neoDistance, 1);

                    // $prefix = '(';
                    // if (substr($neoName, 0, strlen($prefix)) == $prefix) {
                    //     $neoName = substr($neoName, strlen($prefix));
                    //     $neoName = substr($neoName, 0, -1);
                    // }

                    // if ($neoDistanceClean < 100) {
                    //     $neoArray[$count++] = array('name' => $neoName, 'distance' => $neoDistanceClean);
                    // }
                // }
            }

            // large test array
            //
            // $neoArray[0] = array('name' => '2017 FC1', 'distance' => '15.62');
            // $neoArray[1] = array('name' => '2017 DA109', 'distance' => '76.51');
            // $neoArray[2] = array('name' => '2018 FC1', 'distance' => '47.62');
            // $neoArray[3] = array('name' => '2019 DA109', 'distance' => '6.51');
            // $neoArray[4] = array('name' => '2020 FC1', 'distance' => '5.62');
            // $neoArray[5] = array('name' => '2021 DA109', 'distance' => '26.51');
            // $neoArray[6] = array('name' => '2022 FC1', 'distance' => '1.62');
            // $neoArray[7] = array('name' => '2023 DA109', 'distance' => '14.51');
            // $neoArray[8] = array('name' => '2024 FC1', 'distance' => '15.72');
            // $neoArray[9] = array('name' => '2025 DA109', 'distance' => '56.31');
            // $neoArray[10] = array('name' => '2026 FC1', 'distance' => '65.62');
            // $neoArray[11] = array('name' => '2027 DA109', 'distance' => '73.51');
            // $neoArray[12] = array('name' => '2028 FC1', 'distance' => '12.62');
            // $neoArray[13] = array('name' => '2029 DA109', 'distance' => '71.51');
            // $neoArray[14] = array('name' => '2030 FC1', 'distance' => '31.62');
            // $neoArray[15] = array('name' => '2031 DA109', 'distance' => '72.51');
            // $neoArray[16] = array('name' => '2032 FC1', 'distance' => '32.62');
            // $neoArray[17] = array('name' => '2033 DA109', 'distance' => '58.51');
            // $neoArray[18] = array('name' => '2034 FC1', 'distance' => '35.62');
            // $neoArray[19] = array('name' => '2035 DA109', 'distance' => '36.51');

            function sortNEOs($a, $b) {
                return ($a['distance'] < $b['distance']) ? -1 : (($a['distance'] > $b['distance']) ? 1 : 0);
            }
            usort($neoArray, "sortNEOs");

            // echo json_encode($neoArray); // to debug the array

            foreach ($neoArray as $neo) {
                $name = $neo['name'];
                $distance = $neo['distance'];

                if (strlen($neoTweet1) <= 280 && $secondTweet === false) {
                    $tempTweetStr = "\n$name :: $distance LD ";

                    if ((strlen($neoTweet1) + strlen($tempTweetStr)) <= 280) {
                        $neoTweet1 .= $tempTweetStr;
                    } else {
                        $secondTweet = true;
                        $tempTweetStr = "";
                    }
                }

                if (strlen($neoTweet2) <= 280 && $secondTweet === true && $thirdTweet === false) {
                    $tempTweetStr = "\n$name :: $distance LD ";

                    if ((strlen($neoTweet2) + strlen($tempTweetStr)) <= 280) {
                        $neoTweet2 .= $tempTweetStr;
                    } else {
                        $thirdTweet = true;
                        $tempTweetStr = "";
                    }
                }

                if (strlen($neoTweet3) <= 280 && $thirdTweet === true && $noMoreTweeting === false) {
                    $tempTweetStr = "\n$name :: $distance LD ";

                    if ((strlen($neoTweet3) + strlen($tempTweetStr)) <= 280) {
                        $neoTweet3 .= $tempTweetStr;
                    } else {
                        $noMoreTweeting = true;
                    }
                }
            }
        }

        // -----------------
        // Auth into Twitter
        // -----------------

        // Include twitteroauth
        require_once('twitteroauth.php');

        // Set keys
        $consumerKey = 'SQ78Utjj5Uta8qLZRMOjwQRoV';
        $consumerSecret = 'mPPd4l3DInD4yWXiu56Y2z6IJJwRBYOfloAzuvxJFhMuD8sjxL';
        $accessToken = '3059683066-pNRaaMS0u5GEcHTJh8jAt8RlcjmdRa9ZtRKhYOB';
        $accessTokenSecret = 'CRuAoUP33KsMwn7rfktkTdNxwyM0AeOx7wKpU34RXCBM6';

        // Create object
        $tweet = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);

        if ($thirdTweet === true) {
            $neoTweet3 = ltrim($neoTweet3);
            $tweet->post('statuses/update', array('status' => $neoTweet3));
        }

        if ($secondTweet === true) {
            $neoTweet2 = ltrim($neoTweet2);
            $tweet->post('statuses/update', array('status' => $neoTweet2));
        }

        $neoTweet1 = ltrim($neoTweet1);
        if ($neoTweet1 !== "") {
            $tweet->post('statuses/update', array('status' => $neoTweet1));
        } else {
            emailMe();
        }
    } else {
        emailMe();
    }
    // end if $neosJSON->count > 0
?>