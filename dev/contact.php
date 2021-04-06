<?php
    $to = "caleb@spacedashboard.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $subject = "Contact Form - Space Dashboard";
    $message = $name . " sent you a message:" . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;

    if(empty($_POST['email'])) {
        die('Email is required');
    }

    if(!empty($_POST['sentient'])) {
        die('Sentient check failed');
    }

    mail($to, $subject, $message, $headers);
?>