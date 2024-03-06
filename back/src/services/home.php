<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE, INSERT_ITEMS");
header('Content-Type: application/json; charset=utf-8');

function insert($total, $tax, $date){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $insert = $connection->prepare("INSERT INTO orders (TOTAL, TAX, ORDER_DATE) VALUES (?,?,?)");
    $insert->execute([$total, $tax, $date]);
};

function orderId(){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $sql = "SELECT CODE FROM ORDERS ORDER BY ORDERS DESC LIMIT 1";
    $result = $connection->query($sql);
    $result = $result->fetch(PDO::FETCH_ASSOC);
    return $result['code'];
}

function insertItems($orderCode,$productCode,$amount,$price,$tax){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $insert = $connection->prepare("INSERT INTO order_item (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX) VALUES (?,?,?,?,?)");
    $insert->execute([$orderCode,$productCode,$amount,$price,$tax]);
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

function update($id,$amount){
    $host = "pgsql_desafio";
    $db = "applicationphp";
    $user = "root";
    $pw = "root";

    $connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

    $update = "UPDATE products SET amount = $amount WHERE code = $id";
    $connection->query($update);
}

?>