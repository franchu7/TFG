<?php

include '../database/cors.php';
include '../database/Database.php';
include '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$obj = new Database();

if($_SERVER["REQUEST_METHOD"] == "GET"){
    
   try{
    $allheaders=getallheaders();
    $auth=explode(' ', $allheaders['Authorization']);
    $jwt = $auth[1];

    $secret_key = "Prueba";
    $user_data=JWT::decode($jwt, new Key($secret_key,'HS256'));
    
    $data=$user_data;
    echo json_encode([
        'data' => $data
    ]);
   }catch(Exception $e){
    echo json_encode([
        'status' => 0,
        'message' => $e->getMessage(),
    ]);
   }
}else {
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
