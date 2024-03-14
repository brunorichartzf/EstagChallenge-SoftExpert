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

function insert($categoryName, $taxCategory){
    global $connection;
    $insert = $connection->prepare("INSERT INTO categories (NAME, TAX) VALUES (?,?)");
    $insert->execute([$categoryName,$taxCategory]);
};

function select(){
    global $connection;

    $sql = "SELECT * FROM categories";
    $result = $connection->query($sql);
 
    $data = [];
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
 
    echo json_encode($data);
};

function delete($id){
    global $connection;

    $sql = "DELETE FROM categories WHERE code = $id ";
    $connection->query($sql);

};

?>