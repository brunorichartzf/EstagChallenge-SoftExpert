<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header('Content-Type: application/json; charset=utf-8');


$host = "pgsql_desafio";
$db = "applicationphp";
$user = "root";
$pw = "root";

global $connection;
$connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);



function insert($productName, $amount, $unitPrice, $category){
    global $connection;

    $insert = $connection->prepare("INSERT INTO products (NAME, AMOUNT, PRICE, CATEGORY_CODE) VALUES (?,?,?,?)");
    $insert->execute([$productName, $amount, $unitPrice, $category]);
};

function select(){
    global $connection;

    $sql = "SELECT * FROM products ORDER BY CODE ASC";
    $result = $connection->query($sql);
 
    $data = [];
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
 
    echo json_encode($data);
};

function delete($id){
    global $connection;

    $sql = "DELETE FROM products WHERE code = $id ";
    $connection->query($sql);

};
?>