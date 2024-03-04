<?php

// error_log('Sou um log');
// echo "Hello World";


$host = "pgsql_desafio";
$db = "applicationphp";
$user = "root";
$pw = "root";

$connection = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

// exemplo de insert
$statement = $connection->prepare("INSERT INTO categories (NAME, TAX) VALUES ('Teste', 10)");
//$statement->execute();

// exemplo de fetch
$statement1 = $connection->query("SELECT * FROM categories");
$data = $statement1->fetch();

print_r($data)

// echo "<br>";
//print_r($data);

// exemplo de fetch2
// $statement2 = $connection->query("SELECT * FROM mytable");
// $data2 = $statement2->fetchALL();

// echo "<br>";
//print_r($data2);

// $name = $_GET["name"];
// $age = $_GET["age"];

//error_log(print_r($_POST, true));


// $_SERVER['REQUEST_METHOD'];
// $_SERVER['QUERY_STRING'];
// $_GET
// $_POST
//print_r($_POST);

// echo $name;
// echo $age;

// console_error("Nome: $name, Idade: $age");

// return JSON_encode([
//     "name" => $name,
//     "age" => $age
// ])

?>