<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE, GET_PRODUCTS");
header('Content-Type: application/json; charset=utf-8');

function select(){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $sql = "SELECT * FROM orders";
    $result = $connection->query($sql);
 
    $data = [];
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
 
    echo json_encode($data);
};

function selectProducts($code){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $sql = "SELECT * FROM order_item WHERE ORDER_CODE = $code";
    $result = $connection->query($sql);

    $data = [];
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
 
    echo json_encode($data);
}

function selectAllProducts(){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $sql = "SELECT * FROM order_item";
    $result = $connection->query($sql);

    $data = [];
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
 
    echo json_encode($data);
}

?>