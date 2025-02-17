<?php
require 'config.php';

$nomeCasal = $_POST['names'];
$valor = ($_POST['plan'] == '1ano') ? 14.99 : 29.99;

$url = "https://api.mercadopago.com/v1/payments";

$data = [
    "transaction_amount" => $valor,
    "payment_method_id" => "pix",
    "payer" => ["email" => "comprador@email.com"],
    "description" => "Pagamento para página: $nomeCasal"
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json\r\nAuthorization: Bearer " . ACCESS_TOKEN,
        "method" => "POST",
        "content" => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
$pix = json_decode($response, true);

if (isset($pix['point_of_interaction']['transaction_data']['qr_code'])) {
    echo json_encode([
        "qr_code" => $pix['point_of_interaction']['transaction_data']['qr_code'],
        "payment_id" => $pix['id'],
        "status" => "success"
    ]);
} else {
    echo json_encode(["status" => "error"]);
}
?>