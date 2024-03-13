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
            $category = json_decode(file_get_contents('php://input'));
            $categoryName = $category->categoryName;
            $taxCategory= $category->taxCategory;
            insert($categoryName,$taxCategory);
            break;
        case "DELETE":
            $id = $_GET['id'];
            delete($id);
            break;
    }
}
 
runRequestMethod();

    

?>