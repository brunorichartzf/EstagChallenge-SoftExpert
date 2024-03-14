<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, PATCH, INSERT_ITEMS");
header('Content-Type: application/json; charset=utf-8');

include '../services/home.php';

function runRequestMethod()
{
    $method = $_SERVER['REQUEST_METHOD'];
 
    switch ($method) {
        case "GET":
            return select();
            break;
        case "POST":
            $purchase = json_decode(file_get_contents('php://input'));
            $total= $purchase -> total;
            $tax= $purchase -> tax;
            $date= $purchase -> date;
            
            insert($total,$tax,$date);
        case "DELETE":
            $id = $_GET['id'];
            delete($id);
            break;
        case "PATCH":
            $id = $_GET['id'];
            $amount = $_GET['amount'];
            update($id,$amount);
            break;
        case "INSERT_ITEMS":
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