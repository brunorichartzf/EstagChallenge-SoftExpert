<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE, GET_PRODUCTS");
header('Content-Type: application/json; charset=utf-8');

include '../services/history.php';

function runRequestMethod()
{
    $method = $_SERVER['REQUEST_METHOD'];
 
    switch ($method) {
        case "GET":
            return select();
            break;
        case "POST":
            break;
        case "DELETE":
            break;
        case "UPDATE":
            break;
        case "GET_PRODUCTS":
            $code = $_GET['code'];
            error_log($code);
            selectProducts($code);
            break;
    }
}
 
runRequestMethod();


?>