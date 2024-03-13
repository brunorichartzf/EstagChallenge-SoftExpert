<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE, INSERT_ITEMS");
header('Content-Type: application/json; charset=utf-8');

include '../services/home.php';

function runRequestMethod()
{
    $method = $_SERVER['REQUEST_METHOD'];
 
    switch ($method) {
        case "POST":
            $orderCode = orderId();
            $items = json_decode(file_get_contents('php://input'));
            $productCode = $items -> productCode;
            $itemAmount = $items -> itemAmount;
            $price = $items -> price;
            $itemTax = $items -> itemTax;

            insertItems($orderCode, $productCode, $itemAmount, $price, $itemTax);
            break;
    }
}
 
runRequestMethod();

?>