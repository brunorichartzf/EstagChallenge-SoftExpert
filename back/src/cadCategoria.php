<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");


function runRequestMethod()
{
    $method = $_SERVER['REQUEST_METHOD'];
    $host = "pgsql_desafio";
            $db = "applicationphp";
            $user = "root";
            $pw = "root";

            $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);
 
    switch ($method) {
        case "GET":
            $select = $connection->query("SELECT * FROM categories");
            return $select;
            break;
        case "POST":
            $categoryName = $_POST['categoryName'];
            $taxCategory= $_POST['taxCategory'];
            error_log("name: $categoryName tax: $taxCategory");

            //insert
            $insert = $connection->prepare("INSERT INTO categories (NAME, TAX) VALUES (?,?)");
            $insert->execute([$categoryName,$taxCategory]);
            break;
        case "DELETE":
            
            break;
    }
}
 
runRequestMethod();

    

?>