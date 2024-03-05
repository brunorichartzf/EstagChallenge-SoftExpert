<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header('Content-Type: application/json; charset=utf-8');

include '../services/category.php';


function runRequestMethod()
{
    $method = $_SERVER['REQUEST_METHOD'];
 
    switch ($method) {
        case "GET":
            return select();
            break;
        case "POST":
            $categoryName = $_POST['categoryName'];
            $taxCategory= $_POST['taxCategory'];
            insert($categoryName,$taxCategory);
        case "DELETE":
            $id = $_GET['id'];
            delete($id);
            break;
    }
}
 
runRequestMethod();

    

?>