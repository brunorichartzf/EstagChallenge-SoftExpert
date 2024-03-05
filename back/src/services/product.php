<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header('Content-Type: application/json; charset=utf-8');

function insert($productName, $amount, $unitPrice, $category){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $insert = $connection->prepare("INSERT INTO products (NAME, AMOUNT, PRICE, CATEGORY_CODE) VALUES (?,?,?,?)");
    $insert->execute([$productName, $amount, $unitPrice, $category]);
};

function select(){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $sql = "SELECT * FROM products";
    $result = $connection->query($sql);
 
    $data = [];
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
 
    echo json_encode($data);
};

function delete($id){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $sql = "DELETE FROM products WHERE code = $id ";
    $connection->query($sql);

};
?>