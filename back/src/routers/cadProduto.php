<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header('Content-Type: application/json; charset=utf-8');

include '../services/product.php';

function runRequestMethod()
{
    $method = $_SERVER['REQUEST_METHOD'];
 
    switch ($method) {
        case "GET":
            return select();
            break;
        case "POST":
            $productName = $_POST['productName'];
            $amount= $_POST['amountProduct'];
            $unitPrice = $_POST['unitPriceProduct'];
            $category= $_POST['id'];
            
            insert($productName,$amount,$unitPrice,$category);
        case "DELETE":
            $id = $_GET['id'];
            delete($id);
            break;
    }
}
 
runRequestMethod();


?>