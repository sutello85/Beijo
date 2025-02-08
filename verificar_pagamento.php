<?php
require 'config.php';

$payment_id = $_GET['id'];

$url = "https://api.mercadopago.com/v1/payments/$payment_id";
$options = [
    "http" => [
        "header" => "Authorization: Bearer " . ACCESS_TOKEN,
        "method" => "GET"
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
$pagamento = json_decode($response, true);

if ($pagamento['status'] == "approved") {
    echo json_encode(["status" => "paid"]);
} else {
    echo json_encode(["status" => "pending"]);
}
?>