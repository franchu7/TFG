<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    
    $obj->select('users', '*', null, "id='{$id}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
        $obj->delete("users", "id='{$id}'");
        $result = $obj->getResult();
        if ($result[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => "Usuario eliminado correctamente",
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
            'message' => "No existe un usuario con ese ID",
        ]);
    }
     
} else {
    echo json_encode([
        'status' => 0,
        'message' => "Acceso denegado",
    ]);
}