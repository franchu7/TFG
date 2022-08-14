<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data= json_decode(file_get_contents("php://input"));

    // Datos de inicio de sesión

    $email=$data->email;
    $password=$data->password;
    $new_password = password_hash($password, PASSWORD_DEFAULT);

    // Actualizar la contraseña dado un correo existente
    $obj->select('users', '*', null, "email='{$email}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {       
        $obj->update('users', ['password'=>$new_password],"email='{$email}'");
        $result=$obj->getResult();
        if ($result[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => "Contraseña actualizada correctamente",
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Problema en el servidor",
            ]);
        }
    } else {
        echo json_encode([
            'status' => 0,
            'message' => 'Correo incorrecto',
        ]); 
    }
    
}else{
    echo json_encode([
        'status' => 0,
        'message' => "Acceso denegado",
    ]);
}
