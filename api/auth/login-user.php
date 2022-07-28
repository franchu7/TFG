<?php

include '../database/cors.php';
include '../database/Database.php';
include '../vendor/autoload.php';

use \Firebase\JWT\JWT;

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input", true));
    $email = htmlentities($data->email);
    $password = htmlentities($data->password);
    
    $obj->select('users', '*', null, "email='{$email}'", null, null);
    $datas = $obj->getResult();
    if(!empty($datas)) {
        foreach ($datas as $data) {
            $id = $data['id'];
            $email = $data['email'];
            $role = $data['role'];
            
            if (!password_verify($password, $data['password'])) {
                echo json_encode([
                    'status' => 0,
                    'message' => 'Contraseña incorrecta',
                ]);
            } else {
                $payload = [
                    'iss' => "localhost",
                    //'aud' => 'localhost',
                    'exp' => time() + 2000, //10 minutes
                    'id' => $id,
                    'email' => $email,
                    'role' => $role             
                ];
                $secret_key = "Prueba";
                $jwt = JWT::encode($payload, $secret_key, 'HS256');

                echo json_encode([
                    'status' => 1,
                    'token' => $jwt,
                    'message' => 'Inicio de sesión correcto',
                ]);
            }
        }
    } else {
        echo json_encode([
            'status' => 0,
            'message' => 'Correo o contraseña incorrectos',
        ]); 
    }
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Acceso denegado',
    ]);
}
