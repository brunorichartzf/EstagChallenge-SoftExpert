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
        case "GET":
            return select();
            break;
        case "POST":
            $total= $_POST['total'];
            $tax= $_POST['tax'];
            $date= $_POST['date'];
            
            insert($total,$tax,$date);
        case "DELETE":
            $id = $_GET['id'];
            delete($id);
            break;
        case "UPDATE":
            $id = $_GET['id'];
            $amount = $_GET['amount'];
            update($id,$amount);
            break;
        case "INSERT_ITEMS":
            $orderCode = orderId();
            $productCode = $_GET['productCode'];
            $itemAmount = $_GET['itemAmount'];
            $price = $_GET['price'];
            $itemTax = $_GET['itemTax'];

            insertItems($orderCode, $productCode, $itemAmount, $price, $itemTax);
            break;
    }
}
 
runRequestMethod();

?>