<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $email = $data['email'];
    $message = $data['message'];

    $to = "caleb@spacedashboard.com";
    $subject = "Contact Form - Space Dashboard";
    $body = "New message from: $name\nEmail: $email\n\nMessage: $message";

    $headers = "From: noreply@spacedashboard.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Email sent successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to send email"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
